const axios = require("axios");

export const insertToDb = async data => {
  return await axios.post("/insertDataToMongo", data);
};

export const deleteFromDb = async id => {
  return await axios.get("/deleteFromMongo?", { params: { id: id } });
};

export const getFromDb = async () => {
  return await axios.get("/getFromMongo");
};
