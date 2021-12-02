var areaEle = document.querySelector('.area');
var maskEle = document.querySelector('.mask');
var activeBlockEle;

var cdTimeEle = document.querySelector('.countdown span');
var time;
var timer;

var scoreEle = document.querySelector('.score span');
var score = 0;

var pauseEle = document.querySelector('.pause');
var restartEle = document.querySelector('.restart');
var isPassed = false;

var nowLevel = 1;
var times = [1, 1, 1, 2, 2, 3, 6];

// 取得隨機色弱方塊數字
function getRandomInt(num) {
  return Math.floor(Math.random() * num ** 2);
}

// 取得隨機色彩 rgb(255, 255, 255): 34(#22) - 204(#CC)
function getRandomColor(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// 產生方塊: 1.N*N遊戲範圍 2.決定色彩 3.將色弱方塊放入範圍
function addBlock(num) {
  let ansblocknum = getRandomInt(num);
  let colorR = getRandomColor(34, 204);
  let colorG = getRandomColor(34, 204);
  let colorB = getRandomColor(34, 204);

  for (let i = 0; i < num ** 2; i++) {
    if (i == ansblocknum) {
      areaEle.innerHTML += `<div class="block active" style="--length: ${num}; background-color: rgba(${colorR}, ${colorG}, ${colorB}, 0.${num});"></div>`;
    } else {
      areaEle.innerHTML += `<div class="block " style="--length: ${num}; background-color: rgb(${colorR}, ${colorG}, ${colorB});"></div>`;
    }
  }
}

// 倒數計時器:
// 1.60秒開始倒數
// 2.顯示並更新時間數字
// 3.(重要)如果前次計時器還存在則清除
// 4.如果按下暫停鍵則停止倒數
function setTime() {
  if (timer != null) {
    clearInterval(timer);
  }
  time = 10;
  timer = null;

  cdTimeEle.innerHTML = time;
  timer = setInterval(function () {
    if (!isPassed && time > 0) {
      time--;
      cdTimeEle.innerHTML = time;
    } else if (time == 0) {
      maskEle.style.display = 'block';
    }
  }, 1000);
}

// 開啟新關卡:
// 1. 累計計分
// 2. 開始倒數計時
// 3. 清掉前關卡的色弱方塊&監聽事件
// 4. 清掉遊戲範圍內方塊
// 5. 增加方塊
// 6. 重新選擇色弱方塊
// 7. 並且綁定監聽事件(點擊後根據關卡產生規則決定N*N遊戲範圍)
// 8. 更新目前關卡數字
function newLevel(num) {
  scoreEle.innerHTML = score;
  setTime();
  activeBlockEle = null;
  areaEle.innerHTML = '';
  addBlock(num);
  activeBlockEle = document.querySelector('.block.active');
  activeBlockEle.addEventListener('click', rule);
  nowLevel++;
}

newLevel(nowLevel + 1);

// 規則:
// 1. 點擊後將該關剩餘秒數轉成總分數累加
// 2. 總共25關，完成後顯示恭喜
// 3. 並清除倒數時間
// 4. 清掉計時器
function rule() {
  score = score + parseInt(cdTimeEle.innerHTML);
  scoreEle.innerHTML = score;

  if (nowLevel <= 4) {
    newLevel(nowLevel + 1);
  } else if (nowLevel <= 6) {
    newLevel(nowLevel);
  } else if (nowLevel <= 8) {
    newLevel(nowLevel - 1);
  } else if (nowLevel <= 10) {
    newLevel(7);
  } else if (nowLevel <= 16) {
    newLevel(8);
  } else if (nowLevel <= 25) {
    newLevel(9);
  } else {
    alert('Congratulations!');
    cdTimeEle.innerHTML = 0;
    if (timer != null) {
      clearInterval(timer);
    }
  }

  if (nowLevel == times[0]) {
    newLevel(2);
  } else if (nowLevel == times[0]) {
  }
}

// 暫停按鈕:
// 1. 如果按下(active存在)則視為取消暫停，並移除active
// 2. 若否(不存在active)則視為暫停，並增加active
pauseEle.addEventListener('click', function (e) {
  e.preventDefault();
  if (pauseEle.getAttribute('class').indexOf('active') != -1 && time != 0) {
    isPassed = false;
    pauseEle.classList.remove('active');
    maskEle.style.display = 'none';
  } else {
    pauseEle.classList.add('active');
    maskEle.style.display = 'block';
    isPassed = true;
  }
});

// 重新開始(第1關):
// 1. 分數清除&暫停清除
// 2. 目前關卡數字為1
// 3. 開啟新關卡
restartEle.addEventListener('click', function () {
  score = 0;
  scoreEle.innerHTML = score;
  isPassed = false;
  pauseEle.classList.remove('active');
  maskEle.style.display = 'none';
  nowLevel = 1;
  newLevel(nowLevel + 1);
});
