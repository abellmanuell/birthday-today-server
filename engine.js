const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const { celebrants } = require("./celebrant");

app.get("/image/birthday-celebrant/:id", (req, res) => {
  const img_id = req.params.id;

  fs.readFile(__dirname + "/" + img_id, (err, data) => {
    try {
      const ext = path.extname(img_id).slice(1);
      res.writeHead(200, { "Content-Type": `image/${ext}` });
      res.write(data);
      return res.end();
    } catch (err) {
      throw err;
    }
  });
});

app.get("/api/birthday-celebrants", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(celebrants));
  res.end();
});
app.listen(3000);
