export type TokenType =
  | "string"
  | "number"
  | "boolean"
  | "property"
  | "punctuation"
  | "keyword"
  | "comment"
  | "operator"
  | "text";

export interface Token {
  type: TokenType;
  value: string;
}
