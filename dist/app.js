"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const health_routes_1 = __importDefault(require("./modules/health/health.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const university_routes_1 = __importDefault(require("./modules/university/university.routes"));
const departments_routes_1 = __importDefault(require("./modules/departments/departments.routes"));
const grades_routes_1 = __importDefault(require("./modules/grades/grades.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/health", health_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/universities", university_routes_1.default);
app.use("/api/departments", departments_routes_1.default);
app.use("/api/grades", grades_routes_1.default);
exports.default = app;
