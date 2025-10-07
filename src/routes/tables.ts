import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getTables, insertTable, updateTable } from "../controllers/tables/tablesController";
const router = Router();

router.get('/tables', authMiddleware, getTables);
router.post('/table-insert', authMiddleware, insertTable);
router.post('/table-update', authMiddleware, updateTable);


export default router;