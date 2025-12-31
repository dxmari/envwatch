"use strict";
// Sample code file for testing
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.port = exports.nodeEnv = exports.dbUrl = exports.apiKey = void 0;
const apiKey = process.env.API_KEY;
exports.apiKey = apiKey;
const dbUrl = process.env['DATABASE_URL'];
exports.dbUrl = dbUrl;
const nodeEnv = process.env.NODE_ENV || 'development';
exports.nodeEnv = nodeEnv;
// Risky pattern: NODE_ENV override
process.env.NODE_ENV = 'production';
// Risky pattern: hardcoded fallback
const port = process.env.PORT || 3000;
exports.port = port;
const debug = process.env.DEBUG || false;
exports.debug = debug;
//# sourceMappingURL=sample-code.js.map