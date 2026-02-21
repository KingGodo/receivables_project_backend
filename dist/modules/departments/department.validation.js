"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDepartmentSchema = void 0;
const zod_1 = require("zod");
exports.createDepartmentSchema = zod_1.z.object({
    university_id: zod_1.z.string().uuid(),
    department_name: zod_1.z.string().min(2),
});
