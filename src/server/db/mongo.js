const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require("../server.config");

//init mongoDB connection and configurations
const uri = config.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const database = client.db("yt-playlist");
const videosCollection = database.collection("all_videos");

module.exports = {
  async insertToMongo(data) {
    try {
      await client.connect();
      await videosCollection.insertMany([data]);
    } catch (error) {
      // handle error logs.
    } finally {
      client.close();
    }
  },

  async deleteFromMongo(id) {
    try {
      await client.connect();
      const query = {};
      const prop = `${id}.id`;
      query[prop] = id;
      await videosCollection.deleteOne(query);
    } catch (error) {
      // handle error logs.
    } finally {
      client.close();
    }
  },

  async getFromMongo() {
    try {
      await client.connect();
      const list = await (
        await videosCollection.find().toArray()
      ).reduce((a, b) => {
        a = a || {};
        const key = Object.keys(b)[1];
        a[key] = b[key];
        return a;
      }, {});
      return list;
    } catch (error) {
      // handle error logs.
    } finally {
      client.close();
    }
  }
};
