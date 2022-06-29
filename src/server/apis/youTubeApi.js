const axios = require("axios");


export const ytVideoSearchRes = async query => {
  return await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "snippet,contentDetails",
      id: query,
      key: "AIzaSyB94sw_pfwdHJY-8_Yin8Denl1Tjk6EYEM"
    }
  });
};
