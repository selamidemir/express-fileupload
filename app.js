const express = require("express");
const fileupload = require("express-fileupload");

const app = express();
const port = 5000;

const pageHeader = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>
`;

const pageFooter = `
    </div>
    <div style="margin-top: 55px; padding: 15px; background-color: gray; font-size: 17px;"><a href="https://netbilio.com" style="color: white; font-weight: 700;">Netbilio</a></div>
</body>
</html>
`;

const form = `
        <h2>Dosya Yükleme</h2>
        <hr />
        <form action="/upload" method="POST" encType="multipart/form-data">
            <label for="image">Resim</label>
            <input type="file" name="image" id="image" />
            <button type="submit">Gönder</button>
        </form>
`;

app.use(fileupload());

app.get("/upload", (req, res) => {
  // Form sayfasını ekrana bastır
  res.status(200).send(pageHeader + form + pageFooter);
});

app.post("/upload", (req, res) => {
  // Dosya var mı? Eğer varsa boyutu 0 byte mı?
  // Dosya yoksa veya 0 byte ise hata mesajı bildir.
  if (!req.files || Object.keys(req.files).length === 0) {
    return res
      .status(400)
      .send(pageHeader + "Herhangi bir dosya yüklenmedi." + pageFooter);
  }

  const imageFile = req.files.image;
  // Sunucunun kök dizininde, photos
  // adında bir klasör olduğunu varsayıyoruz.
  const uploadPath = __dirname + "/photos/" + imageFile.name;

  // mv metodu ile dosyayı istediğimiz yere taşıyalım
  imageFile.mv(uploadPath, function (err) {
    // Herhangi bir hata varsa hata mesajını yazdır.
    if (err) return res.status(500).send(pageHeader + err + pageFooter);

    // Dosya başarı ile yüklendi
    res.send(pageHeader + "Dosya başarı ile yüklendi." + pageFooter);
  });
});

app.get("*", (req, res) => {
  res.status(404).send(pageHeader + "Aradığınız sayfa bulunamadı" + pageFooter);
});

app.listen(port, () => console.log("Uygulama başlatıldı."));
