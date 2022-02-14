const express = require('express')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

app.get("", (req, res) => {
  res.sendFile("index.html", { root: '.' });
});

app.listen(PORT, () => console.info(`App listening on port ${PORT}`))
