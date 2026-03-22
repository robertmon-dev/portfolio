import type { Token } from "./types";
import { jsonRules } from "./consts";

export const tokenizeCode = (code: string): Token[] => {
  const tokens: Token[] = [];
  let remaining = code;

  while (remaining.length > 0) {
    let matchFound = false;

    for (const rule of jsonRules) {
      const match = remaining.match(rule.regex);

      if (match) {
        let finalType = rule.type;
        if (
          rule.type === "string" &&
          remaining.match(/^"(\\.|[^"\\])*"(?=\s*:)/)
        ) {
          finalType = "property";
        }

        tokens.push({ type: finalType, value: match[0] });
        remaining = remaining.slice(match[0].length);
        matchFound = true;
        break;
      }
    }

    if (!matchFound) {
      tokens.push({ type: "text", value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};
