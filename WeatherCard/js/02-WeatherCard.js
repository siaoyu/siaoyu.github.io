var areaNTEle = document.querySelector('.area.NT');
var areaCTEle = document.querySelector('.area.CT');
var areaSTEle = document.querySelector('.area.ST');
var areaETEle = document.querySelector('.area.ET');
var areaOIEle = document.querySelector('.area.OI');

let url =
  'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-3A9A6685-5D2F-4A40-9680-885473C41C8F';

var cityData = [];

// Wx 天氣現象, MinT 最低溫度, MaxT 最高溫度, PoP 降雨機率, CI 舒適度
// startTime, endTime, elementName(Wx1, Wx2, MinT, MaxT, PoP, CI)
var weatherData = [];

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log('datasetDescription: ' + data['records']['datasetDescription']);
    for (let i = 0; i < data['records']['location'].length; i++) {
      let cityValue = getCityValue(
        data['records']['location'][i]['locationName']
      );

      cityData.push({
        cityIndex: cityValue,
        cityName: data['records']['location'][i]['locationName'],
        cityWeather: data['records']['location'][i]['weatherElement'],
      });
      //   cards += ``;
    }

    cityData.sort(function (a, b) {
      return a.cityIndex - b.cityIndex;
    });

    for (let i = 0; i < cityData.length; i++) {
      for (let j = 0; j < cityData[i].cityWeather[0].time.length; j++) {
        let startTime = cityData[i].cityWeather[0]['time'][j]['startTime'];
        let endTime = cityData[i].cityWeather[0]['time'][j]['endTime'];
        let WxValue =
          cityData[i].cityWeather[0]['time'][j]['parameter']['parameterValue'];
        let Wx =
          cityData[i].cityWeather[0]['time'][j]['parameter']['parameterName'];
        let MinT =
          cityData[i].cityWeather[2]['time'][j]['parameter']['parameterName'];
        let MaxT =
          cityData[i].cityWeather[4]['time'][j]['parameter']['parameterName'];
        let PoP =
          cityData[i].cityWeather[1]['time'][j]['parameter']['parameterName'];
        let CI =
          cityData[i].cityWeather[3]['time'][j]['parameter']['parameterName'];

        weatherData.push({
          locationName: cityData[i].cityName,
          startTime: startTime,
          endTime: endTime,
          WxValue: WxValue,
          Wx: Wx,
          MinT: MinT,
          MaxT: MaxT,
          PoP: PoP,
          CI: CI,
        });
      }
      // console.log(weatherData);
    }

    let NTcards = '';
    let CTcards = '';
    let STcards = '';
    let ETcards = '';
    let OIcards = '';
    weatherData.forEach(function (cityweatherData, index, array) {
      let content = '';

      content = `
      <div class="content">
        <h2 class="cityName">${cityweatherData.locationName}</h2>
        <p><span class="startTime">${cityweatherData.startTime.slice(5, -3)}</span> - <span class="endTime">${cityweatherData.endTime.slice(5, -3)}</span></p>
        <p class="Wx">${getWxIcon(cityweatherData.WxValue, cityweatherData.Wx)}</p>
        <p><span class="MinT">${cityweatherData.MinT}</span>&#176;C - <span class="MaxT">${cityweatherData.MaxT}</span>&#176;C</p>
        <p><i class="fas fa-umbrella"></i> <span class="PoP">${cityweatherData.PoP}</span>&#037;</p>
        <p class="CI">${cityweatherData.CI}</p>
      </div>`;

      if (index < 21) {
        // 北部
        if ((index + 3) % 3 == 0) {
          NTcards += `<div class="card">` + content;
        } else if ((index + 3) % 3 == 1) {
          NTcards += content;
        } else {
          NTcards += content + `</div>`;
        }
      } else if (index < 39) {
        // 中部
        if ((index + 3) % 3 == 0) {
          CTcards += `<div class="card">` + content;
        } else if ((index + 3) % 3 == 1) {
          CTcards += content;
        } else {
          CTcards += content + `</div>`;
        }
      } else if (index < 48) {
        // 南部
        if ((index + 3) % 3 == 0) {
          STcards += `<div class="card">` + content;
        } else if ((index + 3) % 3 == 1) {
          STcards += content;
        } else {
          STcards += content + `</div>`;
        }
      } else if (index < 57) {
        // 東部
        if ((index + 3) % 3 == 0) {
          ETcards += `<div class="card">` + content;
        } else if ((index + 3) % 3 == 1) {
          ETcards += content;
        } else {
          ETcards += content + `</div>`;
        }
      } else {
        // 外島
        if ((index + 3) % 3 == 0) {
          OIcards += `<div class="card">` + content;
        } else if ((index + 3) % 3 == 1) {
          OIcards += content;
        } else {
          OIcards += content + `</div>`;
        }
      }
    });

    areaNTEle.innerHTML = NTcards;
    areaCTEle.innerHTML = CTcards;
    areaSTEle.innerHTML = STcards;
    areaETEle.innerHTML = ETcards;
    areaOIEle.innerHTML = OIcards;
  });

function getCityValue(name) {
  let value;
  switch (name) {
    // 北部
    case '基隆市':
      value = 0;
      break;
    case '臺北市':
      value = 1;
      break;
    case '新北市':
      value = 2;
      break;
    case '桃園市':
      value = 3;
      break;
    case '新竹市':
      value = 4;
      break;
    case '新竹縣':
      value = 5;
      break;
    case '苗栗縣':
      value = 6;
      break;
    // 中部
    case '臺中市':
      value = 7;
      break;
    case '彰化縣':
      value = 8;
      break;
    case '南投縣':
      value = 9;
      break;
    case '雲林縣':
      value = 10;
      break;
    case '嘉義市':
      value = 11;
      break;
    case '嘉義縣':
      value = 12;
      break;
    // 南部
    case '臺南市':
      value = 13;
      break;
    case '高雄市':
      value = 14;
      break;
    case '屏東縣':
      value = 15;
      break;
    // 東部
    case '宜蘭縣':
      value = 16;
      break;
    case '花蓮縣':
      value = 17;
      break;
    case '臺東縣':
      value = 18;
      break;
    // 外島
    case '澎湖縣':
      value = 19;
      break;
    case '金門縣':
      value = 20;
      break;
    case '連江縣':
      value = 21;
      break;

    default:
      break;
  }
  return value;
}

function getWxIcon(num, Wxstring) {
  let icon;
  switch (parseInt(num)) {
    case 1:
      icon = `<i class="fas fa-sun" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 2:
    case 3:
      icon = `<i class="fas fa-cloud-sun" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 19:
    case 21:
      icon = `<i class="fas fa-cloud-sun-rain" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 4:
    case 5:
    case 6:
      icon = `<i class="fas fa-cloud" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 7:
    case 8:
    case 9:
    case 10:
    case 14:
    case 20:
    case 22:
    case 23:
    case 29:
    case 30:
    case 31:
      icon = `<i class="fas fa-cloud-rain" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 11:
    case 12:
    case 13:
    case 15:
    case 16:
    case 17:
    case 18:
    case 32:
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 41:
      icon = `<i class="fas fa-cloud-showers-heavy" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 38:
    case 39:
      icon = `<i class="fas fa-smog" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    case 42:
      icon = `<i class="far fa-snowflake" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;

    default:
      icon = `<i class="fas fa-sun" alt="${Wxstring}" title="${Wxstring}"></i>`;
      break;
  }
  return icon;
}
