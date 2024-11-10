const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
const port = process.env.PORT || 8080;

app.use(serveStatic(path.join(__dirname)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
}); 