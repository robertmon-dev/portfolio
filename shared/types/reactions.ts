import { z } from "zod";
import * as r from "../schemas/reactions";

export type ReactionKind = z.infer<typeof r.ReactionType>;
export type Reaction = z.infer<typeof r.ReactionSchema>;
export type CreateReactionInput = z.infer<typeof r.CreateReactionSchema>;
export type UpdateReactionInput = z.infer<typeof r.UpdateReactionSchema>;

export type ListReactionsInput = z.input<typeof r.ListReactionsInputSchema>;
export type ListReactionsOutput = z.input<typeof r.ListReactionsOutputSchema>;
