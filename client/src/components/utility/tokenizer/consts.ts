import type { TokenType } from "./types";

export const jsonRules: { type: TokenType; regex: RegExp }[] = [
  { type: "string", regex: /^"(\\.|[^"\\])*"(?=\s*:)/ },
  { type: "string", regex: /^"(\\.|[^"\\])*"/ },
  { type: "boolean", regex: /^(true|false|null)\b/ },
  { type: "number", regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/ },
  { type: "punctuation", regex: /^[{}[\]:,]/ },
  { type: "text", regex: /^\s+/ },
];
