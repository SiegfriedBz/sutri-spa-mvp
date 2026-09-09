import { z } from "zod";

export const reviewInputSchema = z.object({
  customerName: z.string().trim().optional().default(""),
  customerReview: z
    .string()
    .trim()
    .min(1, "Customer review is required."),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;
