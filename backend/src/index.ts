import express from 'express';
import cors from 'cors';

import router from './routes';

export const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(router);

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
