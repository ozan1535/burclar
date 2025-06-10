import express from "express";
import {
  getDailyHoroscope,
  getWeeklyHoroscope,
  getHoroscopeFeatures,
} from "../controllers/horoscopesControllers.js";

const router = express.Router();

router.get("/gunluk/:id", getDailyHoroscope);

router.get("/haftalik/:id", getWeeklyHoroscope);

router.get("/ozellik/:id", getHoroscopeFeatures);

export default router;
