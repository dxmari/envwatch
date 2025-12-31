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
const extractor_1 = require("../../src/extractor");
const parser_1 = require("../../src/parser");
const path = __importStar(require("path"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fixturesPath = path.join(__dirname, '..', 'fixtures');
(0, node_test_1.test)('extractor should extract process.env references', () => {
    const files = [path.join(fixturesPath, 'sample-code.ts')];
    const parsedFiles = (0, parser_1.parseFiles)(files);
    const references = (0, extractor_1.extractEnvReferences)(parsedFiles);
    node_assert_1.default.ok(references.length > 0);
    node_assert_1.default.ok(references.some((r) => r.name === 'API_KEY'));
    node_assert_1.default.ok(references.some((r) => r.name === 'DATABASE_URL'));
    node_assert_1.default.ok(references.some((r) => r.name === 'NODE_ENV'));
});
(0, node_test_1.test)('extractor should extract bracket notation references', () => {
    const files = [path.join(fixturesPath, 'sample-code.ts')];
    const parsedFiles = (0, parser_1.parseFiles)(files);
    const references = (0, extractor_1.extractEnvReferences)(parsedFiles);
    const dbUrlRef = references.find((r) => r.name === 'DATABASE_URL');
    node_assert_1.default.ok(dbUrlRef !== undefined);
});
(0, node_test_1.test)('extractor should include file location information', () => {
    const files = [path.join(fixturesPath, 'sample-code.ts')];
    const parsedFiles = (0, parser_1.parseFiles)(files);
    const references = (0, extractor_1.extractEnvReferences)(parsedFiles);
    node_assert_1.default.strictEqual(references[0].file, files[0]);
    node_assert_1.default.ok(references[0].line > 0);
    node_assert_1.default.ok(references[0].column > 0);
});
//# sourceMappingURL=extractor.test.js.map