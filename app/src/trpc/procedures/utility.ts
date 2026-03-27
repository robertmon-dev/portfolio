import { publicProcedure } from "./public";
import { tokenChecker } from "../middlewares/token";

export const utilityProcedure = publicProcedure.use(tokenChecker);
