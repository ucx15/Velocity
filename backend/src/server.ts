import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 5000;

app.get('/api/stream/:filename', (req, res) => {
  const filePath = `./music/${req.params.filename}`;

  fs.stat(filePath, (err, stats) => {
    if (err) return res.status(404).send('File not found');

    const range = req.headers.range;
    if (!range) return res.status(416).send('Requires Range header');

    const CHUNK_SIZE = 1e6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, stats.size - 1);

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': end - start + 1,
      'Content-Type': 'audio/mpeg',
    };

    res.writeHead(206, headers);
    fs.createReadStream(filePath, { start, end }).pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
