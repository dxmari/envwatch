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
const detector_1 = require("../../src/detector");
const parser_1 = require("../../src/parser");
const path = __importStar(require("path"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const fixturesPath = path.join(__dirname, '..', 'fixtures');
(0, node_test_1.test)('detector should detect NODE_ENV overrides', () => {
    const files = [path.join(fixturesPath, 'sample-code.ts')];
    const parsedFiles = (0, parser_1.parseFiles)(files);
    const patterns = (0, detector_1.detectRiskyPatterns)(parsedFiles);
    const nodeEnvOverride = patterns.find((p) => p.type === 'NODE_ENV_OVERRIDE');
    node_assert_1.default.ok(nodeEnvOverride !== undefined);
});
(0, node_test_1.test)('detector should detect hardcoded fallbacks', () => {
    const files = [path.join(fixturesPath, 'sample-code.ts')];
    const parsedFiles = (0, parser_1.parseFiles)(files);
    const patterns = (0, detector_1.detectRiskyPatterns)(parsedFiles);
    const fallbacks = patterns.filter((p) => p.type === 'HARDCODED_FALLBACK');
    node_assert_1.default.ok(fallbacks.length > 0);
});
(0, node_test_1.test)('detector should include location information', () => {
    const files = [path.join(fixturesPath, 'sample-code.ts')];
    const parsedFiles = (0, parser_1.parseFiles)(files);
    const patterns = (0, detector_1.detectRiskyPatterns)(parsedFiles);
    node_assert_1.default.ok(patterns.length > 0);
    node_assert_1.default.ok(patterns[0].file !== undefined);
    node_assert_1.default.ok(patterns[0].line > 0);
    node_assert_1.default.ok(patterns[0].location.includes(':'));
});
//# sourceMappingURL=detector.test.js.map