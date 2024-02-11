const Config = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/prices",
};

export default Config;
