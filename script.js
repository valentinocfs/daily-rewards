 if (!localStorage.getItem("clearstorage")) {
  localStorage.clear();
  localStorage.setItem("clearstorage", "true");
}

let jeda = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000; // jeda random antara 5 - 7 detik
let jedaArticle = Math.floor(Math.random() * (7000 - 5000 + 1)) + 5000; // jeda random antara 5 - 7 detik


// KEYWORD
let keywordStatus = [];
let i = 0;
const storedKeywordStatus = localStorage.getItem('keywordStatus');
const storedKeywordIndex = localStorage.getItem('currentIndex');
let words = [];

if (storedKeywordStatus && storedKeywordIndex) {
  keywordStatus = JSON.parse(storedKeywordStatus);
  i = parseInt(storedKeywordIndex, 10);
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

// ARTICLE/NEWS
let articleStatus = [];
let idx = 0;
let idxParam = 2;

const storedArticleStatus = localStorage.getItem('articleStatus');
const storedArticleIndex = localStorage.getItem('currentIndexArticle');
let articles = [];

if (storedArticleStatus && storedArticleIndex) {
  articleStatus = JSON.parse(storedArticleStatus);
  idx = parseInt(storedArticleIndex, 10);
  showTableArticles();
} else {
  articleStatus = articles.map(article => ({ article: article, uniqueID: idxParam+2, isOpened: false }));
  generateArticlesManual()
}

document.getElementById('current-index-article').innerHTML = idx;
document.getElementById('total-article').innerHTML = articleStatus.length;

function startSearchNews(){
  if (idx >= articleStatus.length) {
    alert("Semua artikel/berita sudah dibuka. Silakan melakukan generate artikel/berita baru!");
    return;
  }

  disableButtonArticle();
  articleStatus[idx].isOpened = true;

  const cvid = crypto.randomUUID(); // generate random cvid
  const device = isMobile() ? "hpmsn" : "windirect";
  
  let newsURL = `https://www.msn.com/${articleStatus[i].article}?ocid=${device}&cvid=${cvid}&ei=${articleStatus[idx].uniqueID}`;
  window.open(newsURL, '_blank');

  idx++;

  document.getElementById('current-index-article').innerHTML = idx;
  document.getElementById('total-article').innerHTML = articleStatus.length;

  localStorage.setItem('articleStatus', JSON.stringify(articleStatus));
  localStorage.setItem('currentIndexArticle', idx);

  showTableArticles();
}

function enableButtonArticle() {
  document.getElementById('btn-search-article').disabled = false;
}

function disableButtonArticle() {
  document.getElementById('btn-search-article').disabled = true;
  const countdownEl = document.getElementById('loading-countdown-article');
  let seconds = Math.ceil(jedaArticle / 1000);

  countdownEl.textContent = `Tunggu ${seconds} detik...`;
  const interval = setInterval(() => {
    seconds--;
    countdownEl.textContent = `Tunggu ${seconds} detik...`;
    if (seconds <= 0) {
      clearInterval(interval);
      countdownEl.textContent = '';
      enableButtonArticle();
    }
  }, 1000);
}

function showTableArticles() {
  const tableBody = document.querySelector("#table-articles tbody");
  tableBody.innerHTML = "";

  const rawIndex = idx;
  const currentIndex = rawIndex !== null ? parseInt(rawIndex, 10) : NaN;
  if (isNaN(currentIndex)) return;

  
  let slice = (rawIndex == 1 ? 4 : 3);
  let start = Math.max(0, currentIndex - 1);
  let end = Math.min(articleStatus.length, currentIndex + slice);
  if(rawIndex == 0){
    start = Math.max(0, currentIndex - 1);
    end = Math.min(articleStatus.length, currentIndex + 5);
  }

  if(rawIndex > articleStatus.length - slice){
    start = articleStatus.length - slice - 1;
  }
  
  if(rawIndex > 1){
    const dotsRow = document.createElement("tr");
    dotsRow.innerHTML = `<td colspan="3" style="text-align:center;">...</td>`;
    tableBody.appendChild(dotsRow);
  }

  const visibleItems = articleStatus.slice(start, end);
  visibleItems.forEach((item, i) => {
    const row = document.createElement("tr");
    const urlPart = item.article.split("/");
    const titleSlug = urlPart[urlPart.length - 2] || '';
    const title = (() => {
      let t = titleSlug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      return t.length > 50 ? t.slice(0, 50) + "..." : t;
    })();
    row.innerHTML = `
      <td style="text-align:center;">${start + i + 1}</td>
      <td>${title}</td>
      <td class="${item.isOpened ? 'opened' : 'not-opened'}">
        ${item.isOpened ? 'Sudah Dibuka' : 'Belum Dibuka'}
      </td>
    `;
    tableBody.appendChild(row);
  });

  if((rawIndex == 0 || rawIndex >= 1) && (rawIndex < articleStatus.length - slice)){
    const dotsRow = document.createElement("tr");
    dotsRow.innerHTML = `<td colspan="3" style="text-align:center;">...</td>`;
    tableBody.appendChild(dotsRow);
  }
}

function generateArticlesManual(){
  // clear all articles
  articles = [];

  const btnGenerateManual = document.getElementById('btn-generate-manual-article');

  btnGenerateManual.disabled = true;

  const allUnique = [...new Set(news_bank)];
  const shuffled = allUnique.sort(() => Math.random() - 0.5);
  const news = shuffled.slice(0, 15);

  // clear stored keyword
  localStorage.removeItem('articleStatus');
  localStorage.removeItem('currentIndexArticle');

  idx = 0;
  idxParam = 2;
  articleStatus = news.map(article => ({ article: article, uniqueID: idxParam+2, isOpened: false }));

  localStorage.setItem('articleStatus', JSON.stringify(articleStatus));
  localStorage.setItem('currentIndexArticle', idx);

  document.getElementById('current-index-article').innerHTML = idx;
  document.getElementById('total-article').innerHTML = articleStatus.length;

  showTableArticles();
  btnGenerateManual.disabled = false;
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}