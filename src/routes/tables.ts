import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getTables, insertTable } from "../controllers/tables/tablesController";
const router = Router();

router.get('/tables', authMiddleware, getTables);
router.post('/table-insert', authMiddleware, insertTable);


export default router;