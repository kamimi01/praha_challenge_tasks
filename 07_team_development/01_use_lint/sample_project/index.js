import { express, json } from "express";

const app = express();
const port = 8000;

app.use(json());

app.get("/", (req, res) => {
  const resBody = "HelloWorld";
  res.status(200).json(resBody);
});

app.listen(port);
console.log(`listen on port: ${port}`);
