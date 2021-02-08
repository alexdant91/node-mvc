require('dotenv').config();
const axios = require('axios');

/**
 * Prefixed path name, default set to '/api'
 */

const prefix = process.env.API_PREFIX;

/**
 * Default minimum test code
 */

test("Testing User model response header.", async () => {
  const response = await axios.get(`${process.env.APP_URL}:${process.env.APP_PORT}${prefix}/user`);
  expect(response.status).toBeOneOf([200, 201, 400, 401]);
});

test("Testing User model response data.", async () => {
  const response = await axios.get(`${process.env.APP_URL}:${process.env.APP_PORT}${prefix}/user`);
  expect(response.data).toHaveProperty("user");
});

/**
 * Implement here your test code
 */
