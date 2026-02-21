"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const AuthService = __importStar(require("./auth.service"));
/**
 * REGISTER USER
 */
const register = async (req, res, next) => {
    try {
        const user = await AuthService.registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
/**
 * LOGIN USER
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await AuthService.loginUser(email, password);
        /**
         * Secure Cookie (Production Ready)
         */
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
/**
 * LOGOUT USER
 */
const logout = (req, res) => {
    res.clearCookie("access_token");
    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
exports.logout = logout;
