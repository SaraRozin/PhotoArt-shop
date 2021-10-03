const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const pictures = [
  {
    "pictureName": "אצילות",
    "pictureSrcImage": "./images/pictures/3d-wallpaper-swan-pink-tree-260nw-1687707232.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 700,
    "pictureColor": "ורוד"
  },
  {
    "pictureName": "שאיפה",
    "pictureSrcImage": "./images/pictures/3JWIV8XHOE.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 900,
    "pictureColor": "ירוק"
  },
  {
    "pictureName": "אני קיים",
    "pictureSrcImage": "./images/pictures/83E7QOO8AN.jpg",
    "pictureType": "פרחים",
    "picturePrice": 500,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "אופניים במיים",
    "pictureSrcImage": "./images/pictures/637313458428207422DOR_7969.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "כחול"
  },
  {
    "pictureName": "ארנבון הבונבון",
    "pictureSrcImage": "./images/pictures/ארנב-HUGE-BASHFUL-TULIP-PUNK-BUNNY1-247x296.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "ורוד"
  },
  {
    "pictureName": "הכותל",
    "pictureSrcImage": "./images/pictures/הכותל-תמונת-זכוכית-אומנותית-של-ירושלים-לתלייה-במשרד-דגם-F15-1-400x400.jpg",
    "pictureType": "תמונות זכוכית",
    "picturePrice": 1000,
    "pictureColor": "אפור"
  },
  {
    "pictureName": "עץ החיים",
    "pictureSrcImage": "./images/pictures/טריפל-עץ-החיים-סט-3-תמונות-זכוכית-דגם-SLH-3225-388x400.jpg",
    "pictureType": "תמונות זכוכית",
    "picturePrice": 700,
    "pictureColor": "זהב"
  },
  {
    "pictureName": "יער הפיות",
    "pictureSrcImage": "./images/pictures/יער-הפיות-תמונת-ציור-אומנותית-על-קנבס-בסגנון-אבסטרקטי-לתלייה-בחדר-שינה-או-סלון-דגם-3728042-536x800.jpg",
    "pictureType": "תמונות זכוכית",
    "picturePrice": 900,
    "pictureColor": "ירוק"
  },
  {
    "pictureName": "שלווה",
    "pictureSrcImage": "./images/pictures/סט-נוף-הים-3-תמונות-זכוכית-דגם-SLH-3341-388x400.jpg",
    "pictureType": "תמונות זכוכית",
    "picturePrice": 1200,
    "pictureColor": "כחול"
  },
  {
    "pictureName": "פריחה",
    "pictureSrcImage": "./images/pictures/תמונת-זכוכית-דרום-אדום-דגם-2034-400x400.jpg",
    "pictureType": "תמונות זכוכית",
    "picturePrice": 1500,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "שנינו ביחד",
    "pictureSrcImage": "./images/pictures/תמונת-זכוכית-מרוץ-סוסים-דגם-00001-400x400.jpg",
    "pictureType": "תמונות זכוכית",
    "picturePrice": 2000,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "עוצמה",
    "pictureSrcImage": "./images/pictures/burn.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 500,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "שקיעה",
    "pictureSrcImage": "./images/pictures/BY1A04951-600x338.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 700,
    "pictureColor": "חום"
  },
  {
    "pictureName": "מנוחה",
    "pictureSrcImage": "./images/pictures/BY1A7569-1-600x400.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 500,
    "pictureColor": "חום"
  },
  {
    "pictureName": "תסיסה",
    "pictureSrcImage": "./images/pictures/BY1A48501-600x402.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 500,
    "pictureColor": "כחול"
  },
  {
    "pictureName": "להסתער",
    "pictureSrcImage": "./images/pictures/colorful-ocean-wave-sea-water-600w-693783628.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 500,
    "pictureColor": "כתום"
  },
  {
    "pictureName": "יחד",
    "pictureSrcImage": "./images/pictures/decorative-eggs_PB6TLGYIXH.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "לפרגן",
    "pictureSrcImage": "./images/pictures/depositphotos_229890240-stock-photo-merry-christmas-composition-santa-shoe.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "רכות",
    "pictureSrcImage": "./images/pictures/depositphotos_247001368-stock-photo-real-cold-here-inscription-ice.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 700,
    "pictureColor": "לבן"
  },
  {
    "pictureName": "שנינו ביחד",
    "pictureSrcImage": "./images/pictures/depositphotos_317589136-stock-photo-couple-birds-decor-for-love.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 700,
    "pictureColor": "לבן"
  },
  {
    "pictureName": "אהבה",
    "pictureSrcImage": "./images/pictures/depositphotos_438374838-stock-photo-happy-valentine-day-winter-landscape.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "אצילות",
    "pictureSrcImage": "./images/pictures/Depositphotos_456226238_xl-2015.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "לבן"
  },
  {
    "pictureName": "פריחה",
    "pictureSrcImage": "./images/pictures/DFNTF97WVC.jpg",
    "pictureType": "פרחים",
    "picturePrice": 500,
    "pictureColor": "סגול"
  },
  {
    "pictureName": "חבורה",
    "pictureSrcImage": "./images/pictures/e7d1fb2289cbc2c7fd8a4153805a03fa.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "ורוד"
  },
  {
    "pictureName": "צבעוניות מרהיבה",
    "pictureSrcImage": "./images/pictures/eggs-3216877_1280.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 700,
    "pictureColor": "צהוב"
  },
  {
    "pictureName": "אביב צבעוני",
    "pictureSrcImage": "./images/pictures/FIL0195-600x400.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 500,
    "pictureColor": "כתום"
  },
  {
    "pictureName": "רוצה לגדול",
    "pictureSrcImage": "./images/pictures/flower-bloom_NZWKWLNPYX.jpg",
    "pictureType": "פרחים",
    "picturePrice": 500,
    "pictureColor": "כתום"
  },
  {
    "pictureName": "חלומות מתוקים",
    "pictureSrcImage": "./images/pictures/IHIHHZJODB.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "צהוב"
  },
  {
    "pictureName": "אביב ורוד",
    "pictureSrcImage": "./images/pictures/IMG_2527-2-600x400.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 500,
    "pictureColor": "ורוד"
  },
  {
    "pictureName": "אומנות",
    "pictureSrcImage": "./images/pictures/IMG_8777-600x400.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 500,
    "pictureColor": "כחול"
  },
  {
    "pictureName": "לגור שם",
    "pictureSrcImage": "./images/pictures/IMG_91071-600x400.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 700,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "לעוף הכי גבוה שאפשר",
    "pictureSrcImage": "./images/pictures/istockphoto-955149536-612x612.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 500,
    "pictureColor": "כחול"
  },
  {
    "pictureName": "קסום",
    "pictureSrcImage": "./images/pictures/J75_5568-1-768x513.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 500,
    "pictureColor": "ירוק"
  },
  {
    "pictureName": "מפלים של עוצמה",
    "pictureSrcImage": "./images/pictures/J75_5664-768x513.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 500,
    "pictureColor": "ירוק"
  },
  {
    "pictureName": "הרים",
    "pictureSrcImage": "./images/pictures/J85_5139-768x384.jpg",
    "pictureType": "תמונות נוף",
    "picturePrice": 500,
    "pictureColor": "חום"
  },
  {
    "pictureName": "לפלס את הדרך",
    "pictureSrcImage": "./images/pictures/littlevisuals.jpg",
    "pictureType": "תמונות נוף",
    "picturePrice": 500,
    "pictureColor": "חום"
  },
  {
    "pictureName": "אהבה",
    "pictureSrcImage": "./images/pictures/living-coral-color-year-2019-260nw-1250940526.jpg",
    "pictureType": "תמונות לחדר ילדים",
    "picturePrice": 700,
    "pictureColor": "אדום"
  },
  {
    "pictureName": "חלומות ורודים",
    "pictureSrcImage": "./images/pictures/magnolia-trees-556718_1280.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 800,
    "pictureColor": "ורוד"
  },
  {
    "pictureName": "נופת צופים",
    "pictureSrcImage": "./images/pictures/QPSPSSPF77.jpg",
    "pictureType": "פרחים",
    "picturePrice": 800,
    "pictureColor": "ורוד"
  },
  {
    "pictureName": "קפה שלי",
    "pictureSrcImage": "./images/pictures/RGTFS21RRA.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 600,
    "pictureColor": "חום"
  },
  {
    "pictureName": "אבני דרך",
    "pictureSrcImage": "./images/pictures/sea-waves-lash-line-impact-600w-1574930707.jpg",
    "pictureType": "תמונות טבע",
    "picturePrice": 600,
    "pictureColor": "חום"
  },
  {
    "pictureName": "גוונים",
    "pictureSrcImage": "./images/pictures/StockSnap_HNM0EAC9LW.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 500,
    "pictureColor": "צהוב"
  },
  {
    "pictureName": "רגשות מעורבים",
    "pictureSrcImage": "./images/pictures/StockSnap_J8HQTPQR4I.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 700,
    "pictureColor": "כחול"
  },
  {
    "pictureName": "מפליגים רחוק",
    "pictureSrcImage": "./images/pictures/SY200707-3708-768x512.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 2000,
    "pictureColor": "ירוק"
  },
  {
    "pictureName": "ים של צבעים",
    "pictureSrcImage": "./images/pictures/SY201003-3537-768x432.jpg",
    "pictureType": "תמונות לסלון",
    "picturePrice": 1500,
    "pictureColor": "כתום"
  },
  {
    "pictureName": "עתיד ורוד",
    "pictureSrcImage": "./images/pictures/YM5PFT4AEP.jpg",
    "pictureType": "פרחים",
    "picturePrice": 500,
    "pictureColor": "ורוד"
  }
]
  
const app = express();

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const jwt = require('jsonwebtoken');
const db = require("./app/models");

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    db.picture.collection.deleteMany({})
    db.picture.collection.insertMany(pictures)
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/userPicture.routes")(app);
require("./app/routes/picture.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

