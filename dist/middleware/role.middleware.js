"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
/**
 * Role Authorization Middleware
 * Restricts endpoint access based on user roles
 */
const authorizeRoles = (...allowedRoles) => (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
            message: "Access denied",
        });
    }
    next();
};
exports.authorizeRoles = authorizeRoles;
