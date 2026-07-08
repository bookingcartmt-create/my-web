// URL ของ Apps Script Web App (เรียกผ่าน endpoint ?api=1 เพื่อให้ได้ผลลัพธ์เป็น JSON)
const apiUrl = "https://script.google.com/macros/s/AKfycbxdZH4jO8AkNTnId5DoEiysU1L2hGk_2faf-tB6LGvqooPeU-XO_7IsKjj9H5UZ5z8D/exec?api=1";

const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("errorState");
const errorDetailEl = document.getElementById("errorDetail");
const contentEl = document.getElementById("content");

// แปลง key ให้เป็นชื่อภาษาไทยอ่านง่าย (เพิ่ม/แก้ได้ตามต้องการ)
const labelMap = {
  status: "สถานะ",
  message: "ข้อความ",
  totalApplications: "จำนวนผู้สมัครทั้งหมด",
  serverTime: "เวลาบนเซิร์ฟเวอร์"
};

function formatValue(key, value) {
  if (key === "serverTime") {
    try {
      return new Date(value).toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "medium"
      });
    } catch (e) {
      return value;
    }
  }
  return value;
}

function renderData(data) {
  contentEl.innerHTML = "";

  Object.keys(data).forEach((key) => {
    const label = labelMap[key] || key;
    const value = formatValue(key, data[key]);

    const card = document.createElement("div");
    card.className = "card";
    if (key === "message") card.classList.add("wide");
    if (key === "status") card.classList.add("status");

    const labelEl = document.createElement("p");
    labelEl.className = "label";
    labelEl.textContent = label;

    const valueEl = document.createElement("p");
    valueEl.className = "value";
    if (key === "status") {
      valueEl.innerHTML = '<span class="dot"></span>' + value;
    } else {
      valueEl.textContent = value;
    }

    card.appendChild(labelEl);
    card.appendChild(valueEl);
    contentEl.appendChild(card);
  });

  loadingEl.style.display = "none";
  errorEl.style.display = "none";
  contentEl.style.display = "grid";
}

function renderError(err) {
  loadingEl.style.display = "none";
  contentEl.style.display = "none";
  errorEl.style.display = "block";
  errorDetailEl.textContent = err;
}

fetch(apiUrl)
  .then((res) => {
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  })
  .then((data) => renderData(data))
  .catch((err) => renderError(err.message || String(err)));
