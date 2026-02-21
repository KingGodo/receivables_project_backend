"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    fullname: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum([
        "ADMIN",
        "HOD",
        "LECTURER",
        "RECEIVABLES_OFFICER",
        "RECEIVABLES_MANAGER"
    ]),
    department_id: zod_1.z.string().uuid().optional(),
    hod_id: zod_1.z.string().uuid().optional(),
    grade_id: zod_1.z.string().uuid().optional()
});
