import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

if (!process.env.PORT) {
  console.log("Mongos Url Not Found");
}
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is Run On Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb Connection Fail");
  });
