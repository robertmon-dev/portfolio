export class RateLimitError extends Error {
  constructor(public msBeforeNext: number) {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}
