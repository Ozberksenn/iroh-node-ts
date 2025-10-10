import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";
import { getCompanies, updateCompany } from "../controllers/companies/companiesController";
const router = Router();

router.get('/companies', authMiddleware, getCompanies);
router.put('/company-update', authMiddleware, updateCompany);

export default router;