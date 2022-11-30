import { z } from 'zod';


export const registerSchema =z.object({
    body: z.object({

        username :z.string({required_error :"Username is required !"}).min(3),
        password: z.string({required_error :"password is required !"}).min(3),
        email: z.string({ required_error: 'email is required !' }).min(3),

    }),
});

export const loginSchema = z.object({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  });
  