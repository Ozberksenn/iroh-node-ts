import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { deleteTable, getTables, insertTable, updateTable } from "../controllers/tables/tablesController";
const router = Router();

router.get('/tables', authMiddleware, getTables);
router.post('/table-insert', authMiddleware, insertTable);
router.put('/table-update', authMiddleware, updateTable);
router.delete('/table-delete', authMiddleware, deleteTable);


export default router;