import express from 'express';
import { join } from 'path';
import serveStatic from 'serve-static';

const app = express();

app.use(serveStatic(join(__dirname, 'dist')));

const port = process.env.PORT || 8080;
app.listen(port);

console.log('Server started on port ' + port);
