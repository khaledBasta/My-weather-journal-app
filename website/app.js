/* Global Variables */
const apiKey = "a40c6f048f9a89e079140d573655672d";

let apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

const button = document.querySelector('#generate');
const inputZipCode = document.querySelector('#zip');
const textarea = document.querySelector('#feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// get temp request
const getTemp = async (apiURL, zipCode, apiKey) => {
  const fetchTemp = await fetch(
    apiURL + zipCode + "&appid=" + apiKey + "&units=metric"
  );
  try {
    const data = await fetchTemp.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// post request
const sendingData = async (data = {}) => {
  const postReq = await fetch("/sendData", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const result = await postReq.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};


const updateUI = () => {
  const fetchingData = await fetch('/getData');
  try {
    const data = await fetchingData.json()
    document.querySelector('#date').textContent = data.date;
    document.querySelector('#temp').textContent = data.temp;
    document.querySelector('#content').textContent = data.feelings;
  } catch (error) {
    console.log(error.message);
  }
};

// Click event
button.addEventListener('click', ()=> {
  const zipCode = inputZipCode.value;
  const feelings = textarea.value;
  getTemp(apiURL, zipCode, apiKey)
  .then(data => sendingData({date:newDate, temp:data.main.temp, feelings}))
  .then(() => updateUI());
});