import express from "express";

import nodemailer from "nodemailer";
const router = express.Router();

require ('dotenv').config();


export const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  },
});



