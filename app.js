const express = require("express");
const fileupload = require("express-fileupload");

const app = express();
const port = 5000;

const formPage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2>Dosya Yükleme</h2>
    <hr />
    <form action="/upload" method="POST" encType="multipart/form-data">
        <label for="image">Resim</label>
        <input type="file" name="image" id="image" />
        <button type="submit">Gönder</button>
    </form>
</body>
</html>
`;

app.use(fileupload());

app.get("/upload", (req, res) => {
    res.status(200).send(formPage);
});

app.post("/uploaded", (req, res) => {
    // Dosya var mı? Eğer varsa boyutu 0 byte mı?
    // Dosya yoksa veya 0 byte ise hata mesajı bildir.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Herhangi bir dosya yüklenmedi.');
      }

    const file = req.files.image;
    // Sunucunun kök dizininde, photos
    // adında bir klasör olduğunu varsayıyoruz.
    const uploadFile = __dirname + '/photos/' + file;

})

app.listen(port, () => console.log("Uygulama başlatıldı."));
