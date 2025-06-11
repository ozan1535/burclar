import express from "express";
import {
  getDailyHoroscope,
  getWeeklyHoroscope,
  getHoroscopeFeatures,
  getDailyAllHoroscope,
  getWeeklyAllHoroscope,
  getAllHoroscopeFeatures,
} from "../controllers/horoscopesControllers.js";

const router = express.Router();

router.get("/gunluk/all", getDailyAllHoroscope);
router.get("/gunluk/:id", getDailyHoroscope);

router.get("/haftalik/all", getWeeklyAllHoroscope);
router.get("/haftalik/:id", getWeeklyHoroscope);

router.get("/ozellik/all", getAllHoroscopeFeatures);
router.get("/ozellik/:id", getHoroscopeFeatures);

export default router;
