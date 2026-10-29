import { z } from "zod";

export const verifySchema = z.object({
    code: z.string().length(6, { message: "Code might not be completed" })
});

export type VerifyInput = z.infer<typeof verifySchema>