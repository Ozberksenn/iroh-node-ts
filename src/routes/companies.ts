import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getCompanies } from "../controllers/companies/companiesController";
const router = Router();

 router.get('/',authMiddleware,getCompanies);


export default router;