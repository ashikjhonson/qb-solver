import express from "express";
import { PdfReader } from "pdfreader";

const app = express();

app.get("/", (req, res) => {
  const texts = [];
  new PdfReader().parseFileItems("test/cgip.pdf", (err, item) => {
    if (err) {
      console.error("error:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    if (!item) {
      console.warn("end of file");
      console.log(texts);
      res.send(`<p>${texts.join("<br>")}</p>`);
      return;
    }
    if (item.text) {
      texts.push(item.text);
    }
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
