import 'dotenv/config';
import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

app.get('/books', (_req: Request, res: Response) => {
  return res.status(200).send([{ id: 1, name: 'book' }]);
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
