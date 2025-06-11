import {
  fetchHoroscopeData,
  fetchAllHoroscopes,
} from "./../helpers/helpers.js";

// @desc    Get daily horoscope
// @route   GET /horoscope/gunluk/:id
export const getDailyHoroscope = (req, res) => {
  fetchHoroscopeData(
    req,
    res,
    "-burcu-gunluk-yorum",
    "dataText",
    "dataHtml",
    "horoscope",
    "horoscopeInfo"
  );
};

export const getDailyAllHoroscope = (req, res) => {
  fetchAllHoroscopes(req, res, "-burcu-gunluk-yorum");
};

// @desc    Get weekly horoscope
// @route   GET /horoscope/haftalik/:id
export const getWeeklyHoroscope = (req, res) => {
  fetchHoroscopeData(
    req,
    res,
    "-burcu-haftalik-yorum",
    "dataText",
    "dataHtml",
    "horoscope",
    "horoscopeInfo"
  );
};

export const getWeeklyAllHoroscope = (req, res) => {
  fetchAllHoroscopes(req, res, "-burcu-haftalik-yorum");
};

// @desc    Get horoscope features
// @route   GET /horoscope/ozellik/:id
export const getHoroscopeFeatures = (req, res) => {
  fetchHoroscopeData(
    req,
    res,
    "-burcu-ozellikleri",
    "dataText",
    "dataHtml",
    "horoscope",
    "horoscopeInfo"
  );
};
export const getAllHoroscopeFeatures = (req, res) => {
  fetchAllHoroscopes(req, res, "-burcu-ozellikleri");
};
