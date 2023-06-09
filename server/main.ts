import "dotenv/config";
import express, { Application, Request, Response } from "express";

const app: Application = express();

const clientPort = process.env.PORT || 3001;
const PORT = process.env.API_PORT || 3000;
const apiBase = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("build"));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", `http://localhost:${clientPort}`);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get(`${apiBase}/books`, (_req: Request, res: Response) => {
  return res.status(200).send([
    { id: 1, name: "book1" },
    { id: 2, name: "book2" },
    { id: 3, name: "book3" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
