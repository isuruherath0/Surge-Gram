import app from "./app.js";
import connectDB from "./Config/db.js";

const port = process.env.PORT || 3000;

await connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
