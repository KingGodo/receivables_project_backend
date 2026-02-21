"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartments = exports.createDepartment = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const createDepartment = async (data) => {
    const result = await db_1.default.query(`INSERT INTO departments
     (university_id, department_name)
     VALUES($1,$2)
     RETURNING *`, [data.university_id, data.department_name]);
    return result.rows[0];
};
exports.createDepartment = createDepartment;
const getDepartments = async () => {
    const result = await db_1.default.query(`
    SELECT d.*, u.name as university
    FROM departments d
    JOIN universities u
    ON u.university_id=d.university_id
  `);
    return result.rows;
};
exports.getDepartments = getDepartments;
