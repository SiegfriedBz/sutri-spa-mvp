"use server";

import { getGeminiClient, GEMINI_MODEL } from "@/lib/gemini";
import { parseOptions } from "@/lib/parse-options";
import { SUTRI_SYSTEM_INSTRUCTION } from "@/lib/prompts";
import { reviewInputSchema } from "@/lib/schemas";

export type GenerateResult =
  | { ok: true; option1: string; option2: string }
  | { ok: false; error: string };

export async function generateReviewResponses(
  formData: FormData
): Promise<GenerateResult> {
  const parsed = reviewInputSchema.safeParse({
    customerName: formData.get("customerName") ?? "",
    customerReview: formData.get("customerReview") ?? "",
  });

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Invalid input. Please try again.";
    return { ok: false, error: message };
  }

  const { customerName, customerReview } = parsed.data;
  const nameLabel = customerName.length > 0 ? customerName : "(blank)";

  const payload = `Customer Name: ${nameLabel}
Customer Review: ${customerReview}`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: payload,
      config: {
        systemInstruction: SUTRI_SYSTEM_INSTRUCTION,
      },
    });

    const rawText = response.text?.trim() ?? "";
    if (!rawText) {
      return {
        ok: false,
        error: "The AI returned an empty response. Please try again.",
      };
    }

    const options = parseOptions(rawText);
    if (!options) {
      return {
        ok: false,
        error:
          "Could not parse the AI response into Option 1 and Option 2. Please try again.",
      };
    }

    return {
      ok: true,
      option1: options.option1,
      option2: options.option2,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while generating responses.";

    if (message.includes("GEMINI_API_KEY")) {
      return { ok: false, error: message };
    }

    console.error("Gemini generateReviewResponses error:", error);
    return {
      ok: false,
      error:
        "Unable to generate responses right now. Please check your connection and try again.",
    };
  }
}
