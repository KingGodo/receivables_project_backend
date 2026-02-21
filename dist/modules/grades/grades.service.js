"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrades = exports.createGrade = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const createGrade = async (data) => {
    const result = await db_1.default.query(`INSERT INTO grades
     (
      grade_name,
      breakfast_amount,
      lunch_amount,
      supper_amount,
      fuel_rate_per_km
     )
     VALUES($1,$2,$3,$4,$5)
     RETURNING *`, [
        data.grade_name,
        data.breakfast_amount,
        data.lunch_amount,
        data.supper_amount,
        data.fuel_rate_per_km,
    ]);
    return result.rows[0];
};
exports.createGrade = createGrade;
const getGrades = async () => {
    const result = await db_1.default.query(`SELECT * FROM grades`);
    return result.rows;
};
exports.getGrades = getGrades;
