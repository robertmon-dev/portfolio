import type { ReactionAdminActions } from "@/pages/Admin/reactions/types";

export interface ReactionModalsProps {
  state: ReactionAdminActions["state"];
  actions: ReactionAdminActions["actions"];
}
