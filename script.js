let jeda = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000; // jeda random antara 5 - 7 detik
let keywordStatus = [];
let i = 0;
const storedStatus = localStorage.getItem('keywordStatus');
const storedIndex = localStorage.getItem('currentIndex');
let words = [];

if (storedStatus && storedIndex) {
  keywordStatus = JSON.parse(storedStatus);
  i = parseInt(storedIndex, 10);
  showTable();
} else {
  keywordStatus = words.map(word => ({ keyword: word, isOpened: false }));
  generateKeywordManual()
}

document.getElementById('current-index-keyword').innerHTML = i;
document.getElementById('total-keyword').innerHTML = keywordStatus.length;

function start() {
  if (i >= keywordStatus.length) {
    alert("Semua keyword sudah dibuka. Silakan melakukan generate keyword baru!");
    return;
  }

  disableButton();
  keywordStatus[i].isOpened = true;
  
  const cvid = crypto.randomUUID(); // generate random cvid
  window.open(`https://www.bing.com/search?q=${encodeURIComponent(keywordStatus[i].keyword)}&FORM=QBLH&PC=LCTS&cvid=${cvid}&pglt=161`, '_blank');

  i++;

  document.getElementById('current-index-keyword').innerHTML = i;
  document.getElementById('total-keyword').innerHTML = keywordStatus.length;

  localStorage.setItem('keywordStatus', JSON.stringify(keywordStatus));
  localStorage.setItem('currentIndex', i);

  showTable();
}

function enableButton() {
  document.getElementById('btn-search').disabled = false;
}

function disableButton() {
  document.getElementById('btn-search').disabled = true;
  const countdownEl = document.getElementById('loading-countdown');
  let seconds = Math.ceil(jeda / 1000);

  countdownEl.textContent = `Tunggu ${seconds} detik...`;
  const interval = setInterval(() => {
    seconds--;
    countdownEl.textContent = `Tunggu ${seconds} detik...`;
    if (seconds <= 0) {
      clearInterval(interval);
      countdownEl.textContent = '';
      enableButton();
    }
  }, 1000);
}

function showTable() {
  const tableBody = document.querySelector("#table-keywords tbody");
  tableBody.innerHTML = "";

  const rawIndex = i;
  const currentIndex = rawIndex !== null ? parseInt(rawIndex, 10) : NaN;
  if (isNaN(currentIndex)) return;

  
  let slice = (rawIndex == 1 ? 4 : 3);
  let start = Math.max(0, currentIndex - 1);
  let end = Math.min(keywordStatus.length, currentIndex + slice);
  if(rawIndex == 0){
    start = Math.max(0, currentIndex - 1);
    end = Math.min(keywordStatus.length, currentIndex + 5);
  }

  if(rawIndex > keywordStatus.length - slice){
    start = keywordStatus.length - slice - 1;
  }
  
  if(rawIndex > 1){
    const dotsRow = document.createElement("tr");
    dotsRow.innerHTML = `<td colspan="3" style="text-align:center;">...</td>`;
    tableBody.appendChild(dotsRow);
  }

  const visibleItems = keywordStatus.slice(start, end);
  visibleItems.forEach((item, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="text-align:center;">${start + i + 1}</td>
      <td>${item.keyword}</td>
      <td class="${item.isOpened ? 'opened' : 'not-opened'}">
        ${item.isOpened ? 'Sudah Dibuka' : 'Belum Dibuka'}
      </td>
    `;
    tableBody.appendChild(row);
  });

  if((rawIndex == 0 || rawIndex >= 1) && (rawIndex < keywordStatus.length - slice)){
    const dotsRow = document.createElement("tr");
    dotsRow.innerHTML = `<td colspan="3" style="text-align:center;">...</td>`;
    tableBody.appendChild(dotsRow);
  }
}

async function generateKeywordAI() {
  // block request per hari
  let storedDateGenerate = localStorage.getItem('generatekeywordai');
  if(storedDateGenerate){
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // jam 00:00:00
    const storedDate = new Date(storedDateGenerate);
    const storedDay = new Date(storedDate.getFullYear(), storedDate.getMonth(), storedDate.getDate());
    // jika stored date >= hari ini (sudah pernah request hari ini atau masa depan)
    if (storedDay.getTime() >= today.getTime()) {
      alert("Generate Keyword AI hanya bisa dilakukan 1x per hari.");
      return false;
    }
  }

  const message = `Gantikan semua array javascript yang berisi keyword dibawah ini dan jangan dipakai lagi untuk isi array yang baru. Ganti keyword dengan jumlah 35 jangan sampai lebih atau kurang dan berikan array tanpa definisi variable const, let, atau var. Berikan hasilnya saja tanpa penjelasan atau konteks dan respon dalam bentuk array saja. ["sejarah komik jepang", "manfaat jalan kaki pagi", "tutorial desain poster canva"]`;

  const loading = document.getElementById('loading-keyword');
  loading.innerHTML = 'Tunggu beberapa saat...';

  const btnGenerateAi = document.getElementById('btn-generate-ai');
  const btnGenerateManual = document.getElementById('btn-generate-manual');

  btnGenerateAi.disabled = true;
  btnGenerateManual.disabled = true;

  const API_TOKEN = '';

  try {
    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + API_TOKEN,
          'HTTP-Referer': 'https://valentinocfs.github.io/daily-rewards/',
          'X-Title': 'Daily Rewards',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1:free',
          messages: [{ role: 'user', content: message }],
        }),
      },
    );
    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || 'No response received.';

    if(result == 'No response received.'){
      loading.innerHTML = result;
      return false; 
    }
    loading.innerHTML = '';

    if (!result.startsWith("[") || !result.endsWith("]")) {
      alert("Format array tidak valid!");
      return;
    }

    const parsed = JSON.parse(result);
    if (!Array.isArray(parsed)) {
      alert("Format array tidak valid!");
      return;
    }

    words = parsed;

    // clear stored keyword
    localStorage.removeItem('keywordStatus');
    localStorage.removeItem('currentIndex');
    

    i = 0;
    keywordStatus = words.map(word => ({ keyword: word, isOpened: false }));

    localStorage.setItem('keywordStatus', JSON.stringify(keywordStatus));
    localStorage.setItem('currentIndex', i);

    showTable();

    localStorage.setItem('generatekeywordai', new Date());
    
  } catch (error) {
    loading.innerHTML = '<span style="color:red">Error: ' + error.message + ' </span>';
  } finally {
    btnGenerateAi.disabled = false;
    btnGenerateManual.disabled = false;
  }
}

function generateKeywordManual(){
  // clear all keywords
  words = [];

  // const btnGenerateAi = document.getElementById('btn-generate-ai');
  const btnGenerateManual = document.getElementById('btn-generate-manual');

  // btnGenerateAi.disabled = true;
  btnGenerateManual.disabled = true;

  const firstWordMap = new Map();

  for (const keyword of keywords_bank) {
    const firstWord = keyword.split(" ")[0];
    if (!firstWordMap.has(firstWord)) {
      firstWordMap.set(firstWord, keyword);
    }
  }

  const allUnique = Array.from(firstWordMap.values());
  const shuffled = allUnique.sort(() => Math.random() - 0.5); // shuffle

  words = shuffled.slice(0, 35);

  // clear stored keyword
  localStorage.removeItem('keywordStatus');
  localStorage.removeItem('currentIndex');

  i = 0;
  keywordStatus = words.map(word => ({ keyword: word, isOpened: false }));

  localStorage.setItem('keywordStatus', JSON.stringify(keywordStatus));
  localStorage.setItem('currentIndex', i);

  document.getElementById('current-index-keyword').innerHTML = i;
  document.getElementById('total-keyword').innerHTML = keywordStatus.length;

  showTable();
  // btnGenerateAi.disabled = false;
  btnGenerateManual.disabled = false;
}

function startSearchNews(){
  window.open(`https://www.bing.com/news`, '_blank');
}