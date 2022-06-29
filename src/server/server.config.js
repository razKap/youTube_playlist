let socketIo;
module.exports = {
  YOU_TUBE_BASE_URL: "https://www.youtube.com",
  MONGO_URI: "mongodb+srv://razkap:jEdv28MsxRGwYs7o@cluster0.ifzgw6f.mongodb.net/?retryWrites=true&w=majority",
  createInstance: expressListner => {
    socketIo = require("socket.io")(expressListner, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
  },
  getInstance: () => {
    if (!socketIo) {
      throw new Error("you need initiate socket.io");
    }
    return socketIo;
  }
};
