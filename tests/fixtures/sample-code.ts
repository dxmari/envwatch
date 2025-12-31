// Sample code file for testing

const apiKey = process.env.API_KEY;
const dbUrl = process.env['DATABASE_URL'];
const nodeEnv = process.env.NODE_ENV || 'development';

// Risky pattern: NODE_ENV override
process.env.NODE_ENV = 'production';

// Risky pattern: hardcoded fallback
const port = process.env.PORT || 3000;
const debug = process.env.DEBUG || false;

export { apiKey, dbUrl, nodeEnv, port, debug };

