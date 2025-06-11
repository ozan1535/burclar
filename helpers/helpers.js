import * as cheerio from "cheerio";
import axios from "axios";

const baseUrl = process.env.baseUrl;

export const horoscopeNames = [
  "koç",
  "boğa",
  "ikizler",
  "yengeç",
  "aslan",
  "başak",
  "terazi",
  "akrep",
  "yay",
  "oğlak",
  "kova",
  "balik",
];

export const getTr2En = (text) => {
  const Maps = {
    İ: "I",
    Ş: "S",
    Ç: "C",
    Ğ: "G",
    Ü: "U",
    Ö: "O",
    ş: "s",
    ç: "c",
    ğ: "g",
    ü: "u",
    ö: "o",
  };
  Object.keys(Maps).forEach((Old) => {
    text = text.replace(Old, Maps[Old]);
  });
  return text;
};

export const getData = (text, html, horoscope, horoscopeInfo) => {
  const normalize = (str) => str.replace(/\s+/g, " ").trim();

  const normalizedExample2 = normalize(horoscopeInfo);
  const horoscopeInfoAndDate = normalizedExample2.match(/^(.+?) \((.+)\)$/);
  const data = {
    data: {
      horoscope,
      info: horoscopeInfoAndDate[1] || "",
      currentDate: new Date().toLocaleDateString("en-GB"),
      horoscopeDate: horoscopeInfoAndDate[2] || "",
      text,
      html,
    },
    status: 200,
    success: true,
  };
  return data;
};

export const getDataItemsOnWebsite = (data) => {
  const $ = cheerio.load(data);
  let dataText = "";
  let dataHtml = "";
  $(".horoscope-tabs__content__main div").each((i, el) => {
    dataText += $(el).text().trim();
    dataHtml += $(el).html().trim();
  });

  const horoscope = $(".horoscope-info__head").text();
  const horoscopeInfo = $(".horoscope-info__spot").text();

  return { dataText, dataHtml, horoscope, horoscopeInfo };
};

const handleHoroscopeFetch = async (name, urlSuffix) => {
  const tr2EnName = getTr2En(name.toLowerCase());

  try {
    const { data } = await axios.get(`${baseUrl}/${tr2EnName}${urlSuffix}`);
    const { dataText, dataHtml, horoscope, horoscopeInfo } =
      getDataItemsOnWebsite(data);

    return {
      success: true,
      data: getData(dataText, dataHtml, horoscope.trim(), horoscopeInfo),
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.status === 404
          ? "Girilen burç bulunamadı."
          : "Bir hata meydana geldi.",
      status: error.status || 500,
    };
  }
};

export const fetchHoroscopeData = async (req, res, urlSuffix) => {
  const { id } = req.params;

  const result = await handleHoroscopeFetch(id, urlSuffix);

  if (result.success) {
    res.status(200).json(result.data);
  } else {
    res.status(result.status).json({
      message: result.error,
      status: result.status,
      success: false,
    });
  }
};

export const fetchAllHoroscopes = async (req, res, urlSuffix) => {
  try {
    const results = await Promise.all(
      horoscopeNames.map((name) => handleHoroscopeFetch(name, urlSuffix))
    );

    const formattedResults = results.map((result) =>
      result.success ? result.data : result
    );

    res.status(200).json(formattedResults);
  } catch (err) {
    res.status(500).json({
      message: "Tüm burçlar alınırken bir hata meydana geldi.",
      success: false,
    });
  }
};
