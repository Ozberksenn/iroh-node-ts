import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getTables } from "../controllers/tables/tablesController";
const router = Router();

 router.get('/',authMiddleware,getTables);


export default router;