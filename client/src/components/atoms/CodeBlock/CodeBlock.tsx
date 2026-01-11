import type { CodeBlockProps } from "./types";
import { tokenizeCode } from "../../utility/tokenizer/tokenizer";

export const CodeBlock = ({ code }: CodeBlockProps) => {
  const tokens = tokenizeCode(code);

  return (
    <>
      {tokens.map((token, index) => {
        if (token.type === 'text') {
          return token.value;
        }

        return (
          <span key={index} className={`token-${token.type}`}>
            {token.value}
          </span>
        );
      })}
    </>
  );
};
