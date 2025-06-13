import mongoose from "mongoose";

const mongoUrl = process.env.DATABASE_URL;

mongoose.connect(mongoUrl);

const connection = mongoose.connection;

connection.on("error", () => {
	console.log("MongoDB connection failed");
});

connection.on("connected", () => {
	console.log("MongoDB connection successful");
});

export default mongoose;
