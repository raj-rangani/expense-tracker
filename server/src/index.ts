import app from "./app";
import { testConnection } from "./configs/database";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

try {
  const port = process.env.PORT ?? 3000;
  testConnection().then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });
} catch (error) {
  console.error("Error running the API Code");
  process.exit(0);
}
