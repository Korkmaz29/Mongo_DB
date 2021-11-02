// npm install express --save
// npm install -g express
//KONSOLA ÜSTTEKİ İKİ SORGUYU ENTER EDEREK EXPRESS KÜTÜPHANESİNİ PROJEMİZE EKLİYORUZ, ALTTA DA EXPRESS KULLANARAK BAgLANACAgIMIZ PORT U BELİRTİYORUZ
const express = require("express");
const app = express();
const port = 3007;
//baglandigini görmek için
app.listen(port, () => console.log(port + " port çalisiyor "));
//browser a localhost:3000 yazinca alttaki çiksin
app.get("/", (req, res) => res.send("GAYET BASARILI"));
//BAgLAMA OLAYINI sİMDİ YAP (CLİENT)
var calisincaMongoSonuc = null; //burayi alttaki 4 metodla doldurup update delete yapiyoruz, hepsi görebilsin diye önce buraya atadik
// Bu kod satiri, collection un  verilerini tarayicida yazdiracak,
// tarayici url çubuguna girdiginizde: http://localhost:3000/mongo yazip görebilirsiniz.(response=res=yanit)
app.get("/mongo", (req, res) => res.send(calisincaMongoSonuc));
//4 tane metod olusturduk ve metodda olusan sonuçlari calisincaMongoSonuc e atadik
// 1)Create / Insert
const insertDocuments = function (db, callback) {
  // Koleksiyon, db objesinden alinir
  const collection = db.collection("employees");
  // Koleksiyona çoklu ekleme islemi
  collection.insertMany(
    [
      { id: 1, adi: "Ahmet", soyadi: "Çinar", yas: 25 },
      { id: 2, adi: "Caner", soyadi: "Sari", yas: 30 },
      { id: 3, adi: "Gülçin", soyadi: "Yilmaz", yas: 22 },
    ],
    function (err, docs) {
      if (err) throw err;
      console.log("Koleksiyona 3 döküman eklenmistir.");
      calisincaMongoSonuc = docs;
      callback(docs);
    }
  );
};
// 2) Read / Search
const findDocuments = function (db, callback) {
  // Koleksiyon, db objesinden alinir
  //const collection = db.collection("employees");
  // Id'si 3 olan kayiti arama islemi için: collection.find({ id: 3})
  // Tüm kayitlari listelemek: collection.find({}) seklinde kullanabilirsiniz.
  db.collection("employees")
    .find({})
    .toArray(function (err, docs) {
      if (err) throw err;
      console.log("su kayitlar bulunmustur;");
      console.log(docs);
      calisincaMongoSonuc = docs;
      callback(docs);
    });
};
// 3) Update
const updateDocument = function (db, callback) {
  // Koleksiyon, db objesinden alinir
  const collection = db.collection("employees");
  // İlk parametre ile güncellenecek kayit bulunur, sonra istenilen field'i güncellenir.
  collection.updateOne(
    { id: 1 },
    { $set: { yas: 26 } },
    function (err, result) {
      if (err) throw err;
      console.log("1 Id'li kaydin yasi güncellenmistir.");
      callback(result);
    }
  );
};
//4) Delete
const deleteDocument = function (db, callback) {
  // Koleksiyon, db objesinden alinir
  const collection = db.collection("employees");
  // Silme islemi id alani üzerinden yapilir
  collection.deleteOne({ id: 2 }, function (err, result) {
    if (err) throw err;
    console.log("Id'si 2 olan kayit silinmistir.");
    callback(result);
  });
};
/// https://www.w3schools.com/nodejs/nodejs_mongodb_createcollection.asp adresinde örnek
// MongoDB Client olusturma
// MongoDB'de bir veritabani olusturmak için bir MongoClient nesnesi olusturarak baslayin, ardindan dogru ip adresi ve olusturmak istediginiz veritabaninin adiyla bir baglanti URL'si belirtin.
// MongoDB, mevcut degilse veritabanini olusturacak ve onunla baglanti kuracaktir.
//ALTTA YAPTIgIMIZ BÜTÜN BAgLANMA İsLEMLERİNDE FİX YAZILACAK İsLEMLERDİR, BAgLANIP, TARAYICIDA GÖRMEK İSTEDİgİM METODLARI YERLEsTİRDİM. METODLARIN HEPSİ AÇIKKEN TARAYICIDA EN SON METODU GÖSTERİR. HEPSİNİ GÖRMEK İSTERSEK (İSTENMEYENLERİ) YORUMA ALIP ÇALIsTIRMALIYIZ.BU ARADA CONSOL DA (TERMİNAL) AYNI ANDA BÜTÜN METODLARIN SONUCUNU GÖREBİLİRİZ
// MongoDB Client olusturma
const MongoClient = require("mongodb").MongoClient;
// MongoDB sunucu adresi (bizim sürekli baglandigimiz)
const mongoDbServer = "mongodb://localhost:27017";
// Database adi
const dbName = "hellomongo";
// Sunucuya baglanma
MongoClient.connect(mongoDbServer, function (err, client) {
  if (err) throw err;
  const db = client.db(dbName);
  console.log("Baglanti basariyla kuruldu");
  insertDocuments(db, function () {
    updateDocument(db, function () {
      deleteDocument(db, function () {
        findDocuments(db, function () {
          client.close();
        });
      });
    });
  });
}); //YAZMA İsLEMİ BİTİNCE TERMİNAL E EN ÜSTTEKİ EXPRESS İsLEMLERİNİ  GİRDİKTEN SONRA NODE İNDEX.JS YAZARAK KODUMUZU ÇALIsTIRIYORUZ
