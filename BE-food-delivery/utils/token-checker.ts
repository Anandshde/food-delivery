import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const tokenChecker = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructToken: any = jwt.decode(token);
      response.locals.userId = destructToken._id;
      console.log(destructToken);
      next();
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
    return;
  }
};
