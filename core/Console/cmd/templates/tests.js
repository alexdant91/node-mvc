module.exports = `require('dotenv').config();
const axios = require('axios');

/**
 * Prefixed path name, default set to '/api'
 */

const prefix = process.env.API_PREFIX;
const config = { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache', 'Expires': '0' } };

/**
 * Default minimum test code
 */

test("Testing %__MODEL_NAME__% model response header.", async () => {
  const response = await axios.get(\`\${ process.env.APP_URL }:\${ process.env.APP_PORT }\${prefix}/%__MODEL_MIN_NAME__%\`, config);
  expect(response.status).toBeOneOf([200, 201, 400, 401]);
});

test("Testing %__MODEL_NAME__% model response data.", async () => {
  const response = await axios.get(\`\${ process.env.APP_URL }:\${ process.env.APP_PORT }\${prefix}/%__MODEL_MIN_NAME__%\`, config);
  expect(response.data).toHaveProperty("%__MODEL_MIN_NAME__%");
});

/**
 * Implement here your test code
 */
`;
