"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanner_1 = require("../../src/scanner");
const path = __importStar(require("path"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fixturesPath = path.join(__dirname, '..', 'fixtures');
(0, node_test_1.test)('scanner should scan TypeScript and JavaScript files', () => {
    const files = (0, scanner_1.scanSourceFiles)({ path: fixturesPath });
    node_assert_1.default.ok(files.length > 0);
    node_assert_1.default.ok(files.some((f) => f.endsWith('.ts')));
    node_assert_1.default.ok(files.some((f) => f.endsWith('.js')));
});
(0, node_test_1.test)('scanner should exclude node_modules', () => {
    const files = (0, scanner_1.scanSourceFiles)({ path: process.cwd() });
    node_assert_1.default.ok(files.every((f) => !f.includes('node_modules')));
});
(0, node_test_1.test)('scanner should respect custom exclude patterns', () => {
    const files = (0, scanner_1.scanSourceFiles)({
        path: fixturesPath,
        exclude: ['sample-code-2.js'],
    });
    node_assert_1.default.ok(files.every((f) => !f.includes('sample-code-2.js')));
});
//# sourceMappingURL=scanner.test.js.map