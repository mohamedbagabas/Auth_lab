import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import { prisma } from '../config/db';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

export const loginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body as User;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Wrong username or password',
    });
  }

  const isValidPassword = await argon2.verify(user.password, password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: 'Wrong username or password',
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECERT as string
  );

  return res.status(200).json({
    message: 'Welcome back !',
    token,
  });
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const newUser = req.body as User;

    const hashedPassword = await argon2.hash(newUser.password);
    newUser.password = hashedPassword;
    await prisma.user.create({
      data: newUser,
    });
    return res.status(201).json({
      message: 'Welcome to the website ! , user added !',
    });
  } catch (error) {
    console.log(error);
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const getAllUsersHandler = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    const prismaError = error as PrismaClientKnownRequestError;
    return res.status(400).json({
      message: prismaError.message,
    });
  }
};

export const adminHandler = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ message: 'Hey admin with id' + res.locals.user.id });
};

export const userHandler = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Hey user' });
};
