import { publicProcedure } from "./public";
import { tokenCheckerMiddleware } from "../middlewares/token";

export const utilityProcedure = publicProcedure.use(tokenCheckerMiddleware);
