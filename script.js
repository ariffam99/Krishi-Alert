const locationBox = document.getElementById("locationBox");
const settingsBox = document.getElementById("settingsBox");
const alertBox = document.getElementById("alertBox");
const alertText = document.getElementById("alertText");

const rain = document.getElementById("rain");
const wind = document.getElementById("wind");

const stormSound = document.getElementById("stormSound");
const rainSound = document.getElementById("rainSound");
const heatSound = document.getElementById("heatSound");

let soundTimer;

/* LANGUAGE */
const text = {
  en: {
    title: "Krishi Weather Alert",
    subtitle: "Smart alerts to protect crops & farmers",
    getStarted: "Get Started",
    locTitle: "Select Your District",
    continueBtn: "Continue",
    settingsTitle: "Alert Settings",
    enableText: "Enable Alerts",
    soundText: "Alert Sound",
    showAlertBtn: "Show Alert"
  },
  hi: {
    title: "कृषि मौसम अलर्ट",
    subtitle: "फसलों की सुरक्षा के लिए स्मार्ट अलर्ट",
    getStarted: "शुरू करें",
    locTitle: "जिला चुनें",
    continueBtn: "आगे बढ़ें",
    settingsTitle: "अलर्ट सेटिंग",
    enableText: "अलर्ट चालू करें",
    soundText: "अलर्ट साउंड",
    showAlertBtn: "अलर्ट दिखाएं",
    lang0:"🌾 फसल बाजार के भाव",
    lang1:"मौसम का चयन करें",
    lang2:"🌤️Normal",
    lang3:"🌧️ Rainy",
    lang4:"🔥 Summer",
    lang5:"❄️ Winter",
    lang6:"फसल",
    lang7:"आज का भाव (₹/क्विंटल)",
    lang8:"कल का भाव (₹/क्विंटल)",
    lang9:"रुझान",
    lang10:"गेहूं",
    lang11:"धान",
    lang12:"मक्का",
    lang13:"सोयाबीन",
    lang14:"चना",
    lang15:"🌤️ सामान्य मौसम: किसानों को सलाह दी जाती है कि वे फसलों को सुरक्षित रखें और स्टॉक का सही प्रबंधन करें।"
  },
   ur: {
    title: "زرعی موسم الرٹ",
    subtitle: "فصلوں کی حفاظت کے لیے اسمارٹ الرٹس",
    getStarted: "شروع کریں",

    locTitle: "ضلع منتخب کریں",
    continueBtn: "آگے بڑھیں",

    settingsTitle: "الرٹ سیٹنگز",
    enableText: "الرٹس فعال کریں",
    soundText: "الرٹ آواز",
    showAlertBtn: "الرٹ دکھائیں",

    advisory: {
      normal: "🌤️ معمول کا موسم: فصلوں کو محفوظ رکھیں اور منڈی کے نرخوں پر نظر رکھیں۔",
      rain: "🌧️ برسات کا موسم: فصلوں کو نمی سے بچائیں اور کھلے میں ذخیرہ نہ کریں۔",
      summer: "🔥 گرمی کا موسم: دوپہر میں کھیتی سے گریز کریں اور فصلیں ٹھنڈی جگہ پر رکھیں۔",
      winter: "❄️ سردی کا موسم: فصلوں کو پالا پڑنے سے محفوظ رکھیں۔",
      lang0: "🌾 فصلوں کے بازار کے نرخ",
  lang1: "موسم کا انتخاب کریں",

  lang2: "معمول کا موسم",
  lang3: "برسات کا موسم",
  lang4: "گرمی کا موسم",
  lang5: "سردی کا موسم",

  lang6: "فصل",
  lang7: "آج کا نرخ (₹/کوئنٹل)",
  lang8: "کل کا نرخ (₹/کوئنٹل)",
  lang9: "رجحان",

  lang10: "گیہوں",
  lang11: "دھان",
  lang12: "مکئی",
  lang13: "سویا بین",
  lang14: "چنا",

  lang15:
    "🌤️ معمول کا موسم: کسانوں کو مشورہ دیا جاتا ہے کہ وہ فصلوں کو محفوظ رکھیں اور ذخیرہ صحیح طریقے سے کریں۔",


    
    }}
};


function setLang(l) {
  Object.keys(text[l]).forEach(id => {
    document.getElementById(id).innerText = text[l][id];
  });
}

/* FLOW */
function openLocation() {
  locationBox.classList.remove("hidden");
}

function saveLocation() {
  const d = district.value;
  if (!d) return;
  localStorage.setItem("district", d);
  settingsBox.classList.remove("hidden");
}

/* SOUND + EFFECT */
function stopAll() {
  [stormSound, rainSound, heatSound].forEach(s => {
    s.pause(); s.currentTime = 0;
  });
  rain.classList.add("hidden");
  wind.classList.add("hidden");
  clearTimeout(soundTimer);
}

function play(type) {
  stopAll();

  if (type === "rain") {
    rain.classList.remove("hidden");
    rainSound.volume = 3;
    rainSound.play();
    soundTimer = setTimeout(stopAll, 8000);
  }

  if (type === "storm") {
    wind.classList.remove("hidden");
    stormSound.volume = 0.3;
    stormSound.play();
    soundTimer = setTimeout(stopAll, 7000);
  }

  if (type === "heat") {
    heatSound.volume = 0.4;
    heatSound.play();
    soundTimer = setTimeout(stopAll, 5000);
  }
}



let currentWeather = "rain"; // options: sunny, rain, cloudy, storm

const statusEl = document.getElementById("weather-status");
const adviceEl = document.getElementById("advisory-box");

function showAdvice(weather) {
  let advice = "";
  switch(weather) {
    case "sunny":
      statusEl.innerText = "☀ Weather: Sunny";
      advice = "Ensure irrigation, apply fertilizer carefully, and use pesticide spray during calm hours.";
      break;
    case "rain":
      statusEl.innerText = "🌧 Weather: Rainy";
      advice = "Avoid fertilizer application, protect stored grains, and ensure proper drainage in fields.";
      break;
    case "cloudy":
      statusEl.innerText = "☁ Weather: Cloudy";
      advice = "Monitor for pests, prepare for possible rainfall, and plan irrigation cautiously.";
      break;
    case "storm":
      statusEl.innerText = "🌪 Weather: Storm Alert";
      advice = "Secure animals indoors, cover young crops, and avoid field work until safe.";
      break;
    default:
      statusEl.innerText = "ℹ Weather: Not Available";
      advice = "Check local updates for better farming guidance.";
  }
  adviceEl.innerHTML = `<p>${advice}</p>`;
}

// Call function
showAdvice(currentWeather);


    function showAdvisory() {
      const weather = document.getElementById("weather").value;
      const advisoryBox = document.getElementById("advisoryBox");

      let message = "";

      if(weather === "rain") {
        message = "🌧️ Rainy Season: Farmers should cover and store crops in dry places to avoid damage.";
     
      } else if(weather === "summer") {
        message = "☀️ Summer Season: Keep grains in cool and ventilated storage to prevent spoilage.";
      } else if(weather === "winter") {
        message = "❄️ Winter Season: Best time to stock wheat and chickpea safely for longer use.";
      } else {
        message = "🌤️ Normal Weather: Farmers are advised to store crops properly and maintain stock safely.";
      }

      advisoryBox.innerHTML = message;
    }
  

    

