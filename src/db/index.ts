import mongoose from "mongoose";

const db = process.env.MONGODB_URI || "mongodb://localhost:27017/prices";

let cachedPromise: Promise<void> | null = null;

const connectMongo = async () => {
  if (!cachedPromise) {
    // If no connection promise is cached, create a new one. We cache the promise instead
    // of the connection itself to prevent race conditions where connect is called more than
    // once. The promise will resolve only once.
    // Node.js driver docs can be found at http://mongodb.github.io/node-mongodb-native/.
    cachedPromise = mongoose
      .connect(db)
      .then(() => {
        return console.log(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        console.log("Error connecting to database: ", error);
        return process.exit(1);
      });
  }
  // await on the promise. This resolves only once.
  const client = await cachedPromise;
  return client;
};

export default connectMongo;
