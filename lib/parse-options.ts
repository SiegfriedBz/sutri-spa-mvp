export type ParsedOptions = {
  option1: string;
  option2: string;
};

/**
 * Splits Gemini output into Option 1 and Option 2 response bodies.
 */
export function parseOptions(raw: string): ParsedOptions | null {
  const text = raw.trim();
  if (!text) return null;

  const option1Match = text.match(
    /Option\s*1\s*\(Warm\s*&\s*Detailed\)\s*([\s\S]*?)(?=Option\s*2\s*\(Short\s*&\s*Sweet\)|$)/i
  );
  const option2Match = text.match(
    /Option\s*2\s*\(Short\s*&\s*Sweet\)\s*([\s\S]*?)$/i
  );

  const option1 = option1Match?.[1]?.trim() ?? "";
  const option2 = option2Match?.[1]?.trim() ?? "";

  if (!option1 || !option2) {
    return null;
  }

  return { option1, option2 };
}
