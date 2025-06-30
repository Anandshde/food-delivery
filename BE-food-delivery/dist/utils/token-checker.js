"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenChecker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenChecker = async (request, response, next) => {
    const authorization = request.headers.authorization;
    if (!authorization) {
        response.status(401).send({ message: "token is not valid" });
        return;
    }
    const token = authorization.split(" ")[1];
    const tokenPassword = process.env.JWT_SECRET;
    if (!tokenPassword) {
        response.status(500).send({ message: "JWT secret not configured" });
        return;
    }
    try {
        const isValid = jsonwebtoken_1.default.verify(token, tokenPassword);
        if (isValid) {
            const destructToken = jsonwebtoken_1.default.decode(token);
            response.locals.userId = destructToken._id;
            console.log(destructToken);
            next();
            return;
        }
        else {
            response.status(401).send({ message: "token is not valid" });
            return;
        }
    }
    catch (err) {
        response.status(401).send({ message: "token is not valid" });
        return;
    }
};
exports.tokenChecker = tokenChecker;
