import { RequestHandler } from "express";
import { LoggedInOptions } from "../@types";


export function ensureLoggedIn(options?: LoggedInOptions | string): RequestHandler;
