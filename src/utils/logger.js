"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info(message) {
        console.log(`%cInfo: ${message}`, "border: 1px solid #3498db; border-radius: 4px; padding: 4px 8px");
    },
    warning(message) {
        console.log(`%cWarning: ${message}`, "border: 1px solid #f1c40f; border-radius: 4px; padding: 4px 8px");
    },
    error(message) {
        console.log(`%cError: ${message}`, "border: 1px solid #c0392b; border-radius: 4px; padding: 4px 8px");
    },
    success(message) {
        console.log(`%cSuccess: ${message}`, "border: 1px solid #2ecc71; border-radius: 4px; padding: 4px 8px");
    }
};
exports.default = logger;
