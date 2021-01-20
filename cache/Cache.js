const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  retry_strategy: function (options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      debug.danger("The server refused the connection");
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      debug.danger("Retry time exhausted");
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      debug.danger("Unable to reconnect.");
      return undefined;
    }
    // reconnect after
    debug.danger("Unable to connect, trying again.");
    return Math.min(options.attempt * 100, 3000);
  },
});

require('dotenv').config();

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const flush = promisify(client.flushall).bind(client);

if (process.env.REDIS_PASSWORD != null) client.auth(process.env.REDIS_PASSWORD);

class Cache {

  static parentNode = process.env.APP_NAME.split("-").join("");

  static parseKeys = (keys) => {
    if (!Array.isArray(keys)) keys = ['main', keys];
    return `@${Cache.parentNode}:${keys.join(':')}`;
  }

  static encodePayload = (payload) => {
    return typeof payload === "string" ? payload : JSON.stringify(payload);
  }

  static decodePayload = (payload) => {
    return typeof payload === "string" ? JSON.parse(payload) : payload;
  }

  static get = async (keys = ['main']) => {
    try {
      const keyNode = Cache.parseKeys(keys);
      return await get(keyNode);
    } catch (err) {
      debug.danger(err.message);
    }
  }

  static set = async (keys = ['main'], payload = {}) => {
    try {
      const keyNode = Cache.parseKeys(keys);
      const parsedPayload = Cache.encodePayload(payload);
      return await set(keyNode, parsedPayload);
    } catch (err) {
      debug.danger(err.message);
    }
  }

  static flush = async () => {
    try {
      await flush();
    } catch (err) {
      debug.danger(err.message);
    }
  }

  static Middleware = {
    // Get keys value from keys
    get(keys, options = { endReqIfKeyIsFound: false }) {
      return async (req, res, next = undefined) => {
        if (options.endReqIfKeyIsFound == undefined) options.endReqIfKeyIsFound = false;

        try {
          const find = await Cache.get(keys);

          if (find && options.endReqIfKeyIsFound) {
            return res.status(200).json({ ...Cache.decodePayload(find) });
          }

          if (find) {
            req.isCache = true;
            if (next) {
              req.body = { ...req.body, ...Cache.decodePayload(find) };
              return next();
            }
            return res.status(200).json({ ...Cache.decodePayload(find) });
          } else {
            req.isCache = false;
            if (next) {
              return next();
            }
            return res.status(200).json({ ...obj });
          }
        } catch (err) {
          debug.danger(err.message);
          if (next) {
            req.isCacheError = true;
            return next();
          }
          return res.status(200).json({ error: "Internal Server Error." });
        }
      }
    },
    set(keys) {
      return async (req, res, next = undefined) => {
        try {
          await Cache.set(keys, req.body);

          if (Array.isArray(keys)) await Cache.set(['private', 'timers', ...keys], { lastUpdate: Date.now() });
          else await Cache.set(['private', 'timers', keys], { lastUpdate: Date.now() });

          if (next) {
            return next();
          }
          return res.status(201).json({ ...req.body });
        } catch (err) {
          debug.danger(err.message);
          if (next) {
            req.isCacheError = true;
            return next();
          }
          return res.status(200).json({ error: "Internal Server Error." });
        }
      }
    },
    async flush(req, res, next = undefined) {
      try {
        await Cache.flush();
        if (next) {
          req.isCacheFlushed = true;
          return next();
        }
        return res.status(200).json({ error: null });
      } catch (err) {
        debug.danger(err.message);
        if (next) {
          req.isCacheError = true;
          return next();
        }
        return res.status(200).json({ error: "Internal Server Error." });
      }
    },
  }
}

module.exports = Cache;
