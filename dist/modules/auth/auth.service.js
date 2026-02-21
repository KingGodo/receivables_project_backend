"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const db_1 = __importDefault(require("../../lib/db"));
const password_1 = require("../../utils/password");
/*
=====================================
REGISTER USER
=====================================
*/
const registerUser = async (data, currentUser) => {
    /*
    =====================================
    BASIC VALIDATION
    =====================================
    */
    if (!data.fullname || !data.email || !data.password || !data.role) {
        throw new Error("Missing required fields");
    }
    /*
    =====================================
    CHECK EMAIL
    =====================================
    */
    const existingUser = await db_1.default.query(`SELECT user_id FROM users WHERE email=$1`, [data.email]);
    if (existingUser.rowCount)
        throw new Error("Email already exists");
    /*
    =====================================
    ADMIN CREATION LOGIC
    =====================================
    */
    if (data.role === "ADMIN") {
        const adminExists = await db_1.default.query(`SELECT user_id FROM users WHERE role='ADMIN' LIMIT 1`);
        /**
         * FIRST ADMIN (SYSTEM BOOTSTRAP)
         */
        if (!adminExists.rowCount) {
            console.log("✅ Bootstrap ADMIN allowed");
        }
        else {
            /**
             * ONLY ADMIN CAN CREATE ADMIN
             */
            if (!currentUser || currentUser.role !== "ADMIN") {
                throw new Error("Only ADMIN can create another ADMIN");
            }
        }
    }
    /*
    =====================================
    FINANCE USERS ONLY BY ADMIN
    =====================================
    */
    if (["RECEIVABLES_OFFICER", "RECEIVABLES_MANAGER"]
        .includes(data.role)) {
        if (!currentUser || currentUser.role !== "ADMIN") {
            throw new Error("Only ADMIN can create finance users");
        }
    }
    /*
    =====================================
    LECTURER BUSINESS RULE
    =====================================
    */
    if (data.role === "LECTURER") {
        if (!data.hod_id || !data.grade_id) {
            throw new Error("Lecturer must have HOD and Grade");
        }
    }
    /*
    =====================================
    HASH PASSWORD
    =====================================
    */
    const password_hash = await (0, password_1.hashPassword)(data.password);
    /*
    =====================================
    CREATE USER
    =====================================
    */
    const result = await db_1.default.query(`
    INSERT INTO users
    (
      fullname,
      email,
      password_hash,
      role,
      department_id,
      hod_id,
      grade_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING
      user_id,
      fullname,
      email,
      role
    `, [
        data.fullname,
        data.email,
        password_hash,
        data.role,
        data.department_id ?? null,
        data.hod_id ?? null,
        data.grade_id ?? null
    ]);
    return result.rows[0];
};
exports.registerUser = registerUser;
