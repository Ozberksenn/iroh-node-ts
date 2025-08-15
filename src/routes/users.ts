import { Router } from "express";
import { getUsers } from "../controllers/users/usersController";

const router = Router();

router.get('/', getUsers);

export default router;