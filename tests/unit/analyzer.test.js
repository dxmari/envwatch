"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const analyzer_1 = require("../../src/analyzer");
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.test)('analyzer should detect missing environment variables', () => {
    const references = [
        { name: 'EXISTING_VAR', file: 'test.ts', line: 1, column: 1 },
        { name: 'MISSING_VAR', file: 'test.ts', line: 2, column: 1 },
    ];
    const available = ['EXISTING_VAR', 'OTHER_VAR'];
    const { missing, unused } = (0, analyzer_1.analyzeEnvVars)(references, available);
    node_assert_1.default.ok(missing.includes('MISSING_VAR'));
    node_assert_1.default.ok(!missing.includes('EXISTING_VAR'));
});
(0, node_test_1.test)('analyzer should detect unused environment variables', () => {
    const references = [
        { name: 'USED_VAR', file: 'test.ts', line: 1, column: 1 },
    ];
    const available = ['USED_VAR', 'UNUSED_VAR'];
    const { missing, unused } = (0, analyzer_1.analyzeEnvVars)(references, available);
    node_assert_1.default.ok(unused.includes('UNUSED_VAR'));
    node_assert_1.default.ok(!unused.includes('USED_VAR'));
});
(0, node_test_1.test)('analyzer should handle empty references', () => {
    const references = [];
    const available = ['VAR1', 'VAR2'];
    const { missing, unused } = (0, analyzer_1.analyzeEnvVars)(references, available);
    node_assert_1.default.strictEqual(missing.length, 0);
    node_assert_1.default.strictEqual(unused.length, 2);
});
//# sourceMappingURL=analyzer.test.js.map