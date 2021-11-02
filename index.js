const express = require("express");

const app = express();

const port = 3001;

//baglandığını görmek için yapılan şeyler

app.listen(port, () => console.log("port çalışıyor"));

//browser a local host:3000 yazınca alttaki çıksın

app.get("/", (req, res) => res.send("Gayet başarılı"));

// MongoDB Client oluşturma
const MongoClient = require("mongodb").MongoClient;
// MongoDB sunucu adresi (bizim sürekli bağlandığımız)
const mongoDbServer = "mongodb://localhost:27017";
// Database adı
const dbName = "hellomongo";
// Sunucuya bağlanma
MongoClient.connect(mongoDbServer, function (err, client) {
  if (err) throw err;

  const db = client.db(dbName);

  insertDocuments(db, function () {
    updateDocument(db, function () {
      deleteDocument(db, function () {
        findDocuments(db, function () {
          client.close();
        });
      });
    });
  });
  Collapse;
});
