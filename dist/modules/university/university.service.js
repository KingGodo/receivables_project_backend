"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUniversity = exports.updateUniversity = exports.getUniversities = exports.createUniversity = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const createUniversity = async (data) => {
    const result = await db_1.default.query(`INSERT INTO universities (name)
     VALUES ($1)
     RETURNING *`, [data.name]);
    return result.rows[0];
};
exports.createUniversity = createUniversity;
const getUniversities = async () => {
    const result = await db_1.default.query(`SELECT * FROM universities ORDER BY created_at DESC`);
    return result.rows;
};
exports.getUniversities = getUniversities;
const updateUniversity = async (id, data) => {
    const result = await db_1.default.query(`UPDATE universities
     SET name=$1
     WHERE university_id=$2
     RETURNING *`, [data.name, id]);
    return result.rows[0];
};
exports.updateUniversity = updateUniversity;
const deleteUniversity = async (id) => {
    await db_1.default.query(`DELETE FROM universities WHERE university_id=$1`, [id]);
};
exports.deleteUniversity = deleteUniversity;
