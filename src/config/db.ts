import mongoose from "mongoose";

const connectDB = async () => {
  const maxRetries = 5;
  const retryDelay = 3000; // 3 seconds
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log("MongoDB connected!");
      return;
    } catch (error) {
      attempts++;
      console.error(`MongoDB connection error (attempt ${attempts}): `, error);
      if (attempts >= maxRetries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};

export { connectDB };
