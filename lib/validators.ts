import { z } from "zod";

export const userSchema = z.object({
  user_id: z.string(),
  email: z.string().email(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  image_url: z.string().nullable(),
});
