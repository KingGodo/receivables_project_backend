"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGradeSchema = void 0;
const zod_1 = require("zod");
exports.createGradeSchema = zod_1.z.object({
    grade_name: zod_1.z.string().min(2),
    breakfast_amount: zod_1.z.number(),
    lunch_amount: zod_1.z.number(),
    supper_amount: zod_1.z.number(),
    fuel_rate_per_km: zod_1.z.number(),
});
