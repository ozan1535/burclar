import * as cheerio from "cheerio";
import axios from "axios";

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

export const fetchHoroscopeData = async (req, res, urlSuffix) => {
  const baseUrl = process.env.baseUrl;
  const id = req.params.id.toLowerCase();
  const tr2En = getTr2En(id);
  try {
    const { data } = await axios.get(`${baseUrl}/${tr2En}${urlSuffix}`);
    const { dataText, dataHtml, horoscope, horoscopeInfo } =
      getDataItemsOnWebsite(data);

    res
      .status(200)
      .json(getData(dataText, dataHtml, horoscope.trim(), horoscopeInfo));
  } catch (error) {
    console.log(error, "hehehe");
    res.status(error.status).json({
      message:
        error.status === 404
          ? "Girilen burç bulumadı."
          : "Bir hata meydana geldi.",
      status: error.status,
      success: false,
    });
  }
};
