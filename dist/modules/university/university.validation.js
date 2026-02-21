"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUniversitySchema = exports.createUniversitySchema = void 0;
const zod_1 = require("zod");
exports.createUniversitySchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, "University name required")
        .max(255),
});
exports.updateUniversitySchema = zod_1.z.object({
    name: zod_1.z.string().min(3).optional(),
});
