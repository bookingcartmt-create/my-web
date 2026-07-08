// URL ของ Apps Script Web App ที่คุณให้มา
const apiUrl = "https://script.google.com/macros/s/AKfycbxdZH4jO8AkNTnId5DoEiysU1L2hGk_2faf-tB6LGvqooPeU-XO_7IsKjj9H5UZ5z8D/exec";

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    document.getElementById("data").innerText = JSON.stringify(data, null, 2);
  })
  .catch(err => {
    document.getElementById("data").innerText = "Error: " + err;
  });
