import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));

app.listen(port, () => {
  console.log(`JJ Blogs Backend listening on port ${port}`);
});
