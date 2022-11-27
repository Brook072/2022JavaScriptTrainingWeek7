"use strict";

// let itineraryData = [
//   {
//     "id": 0,
//     "name": "肥宅心碎賞櫻3日",
//     "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     "area": "高雄",
//     "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     "group": 87,
//     "price": 1400,
//     "rate": 10
//   },
//   {
//     "id": 1,
//     "name": "貓空纜車雙程票",
//     "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台北",
//     "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     "group": 99,
//     "price": 240,
//     "rate": 2
//   },
//   {
//     "id": 2,
//     "name": "台中谷關溫泉會1日",
//     "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台中",
//     "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     "group": 20,
//     "price": 1765,
//     "rate": 7
//   }
// ];
var itineraryData, lastDataItem;
var addData = {};
var showData = [];
var areaSelected;
var areaDistribution = [];
var formUnfinished = false;
var dataArea = ["台北", "新北", "桃園", "台中", "台南", "高雄", "基隆", "新竹", "嘉義", "苗栗", "彰化", "南投", "雲林", "屏東", "宜蘭", "花蓮", "台東", "澎湖"];
var itineraryAddBtn = document.querySelector('.itineraryAddBtn');
var showDataAreaSelect = document.querySelector('.areaSelect');
var apiPath = 'https://raw.githubusercontent.com/hexschool/js-training/main';
var addForm = document.forms['addItineraryForm'].elements;
axios.get("".concat(apiPath, "/travelApi.json")).then(function (res) {
  itineraryData = res.data.data;
  showData = itineraryData;
  chartDataFilter();
  itineraryCardGenerate();
})["catch"](function (err) {
  console.log(err);
});
itineraryAddBtn.addEventListener('click', function (e) {
  e.preventDefault();
  formInputValidation();
});
showDataAreaSelect.addEventListener('change', function (e) {
  areaSelected = e.target.value;
  showDataFilter();
  chartDataFilter();
  if (areaSelected === '') showData = itineraryData;
  itineraryCardGenerate();
});

function chartDataFilter() {
  areaDistribution = [];
  dataArea.forEach(function (areaListed) {
    var count = 0;
    showData.forEach(function (item) {
      if (item.area == areaListed) count += 1;
    });
    if (count != 0) areaDistribution.push([areaListed, count]);
  });
  c3.generate({
    bindto: '#areaDistribution',
    data: {
      columns: areaDistribution,
      type: 'donut'
    },
    donut: {
      label: {
        show: false
      },
      title: '套票地區比例',
      width: 10
    },
    size: {
      height: 184
    }
  });
}

function showDataFilter() {
  showData = itineraryData.filter(function (item) {
    if (item.area === areaSelected) return true;
  });
}

function itineraryCardGenerate() {
  var cardWrapper = document.querySelector('.itineraryCardWrapper');
  var resultNumber = document.querySelector('.resultNumber');
  if (cardWrapper.innerHTML != '') cardWrapper.innerHTML = '';
  resultNumber.innerHTML = "\u672C\u6B21\u641C\u5C0B\u5171 ".concat(showData.length, " \u7B46\u8CC7\u6599");
  showData.forEach(function (i) {
    cardWrapper.innerHTML += "\n      <div class='w-full md:w-6/12 xl:w-4/12 px-3.75'>\n        <div class=\"relative shadow-md rounded\">\n          <span class=\"absolute -top-2.5 bg-seaSerpent text-xl text-white leading-6 rounded-r py-2 px-5\">".concat(i.area, "</span>\n          <div>\n              <img src=\"").concat(i.imgUrl, "\" alt=\"\" class=\"w-full h-full md:h-45 object-cover rounded-t\">\n          </div>\n          <div class=\"relative px-5 pt-5 pb-3.5\">\n              <span class=\"absolute -top-4 left-0 bg-primary text-white leading-6 rounded-r py-1 px-2\">").concat(i.rate, "</span>\n              <h3 class=\"text-primary text-2xl font-medium pb-1 mb-4 border-b border-b-2 border-b-primary\">").concat(i.name, "</h3>\n              <div class='h-36'>\n                <p class=\"text-tertiary text-base leading-6 mb-6\">").concat(i.description, "</p>\n              </div>\n              <div class=\"flex justify-between items-center\">\n                  <div>\n                      <span class=\"mdi mdi-alert-circle text-primary text-base font-medium mr-1\"></span>\n                      <span class=\"text-primary text-base font-medium\">\u5269\u4E0B\u6700\u5F8C").concat(i.group, "\u7D44</span>\n                  </div>\n                  <div class=\"flex items-center\">\n                      <span class=\"text-primary text-base mr-1\">TWD</span>\n                      <span class=\"text-primary text-4xl font-medium\">$").concat(i.price, "</span>\n                  </div>\n              </div>\n          </div>\n        </div>\n      </div>\n      ");
  });
}

function formInputValidation() {
  if (document.querySelectorAll('.alertText')) {
    document.querySelectorAll('.alertText').forEach(function (item) {
      item.remove();
    });
  }

  ;
  var finishedNum = 0;

  for (var i = 0; i < addForm.length; i += 1) {
    if (addForm[i].value == '') {
      if (addForm[i].tagName == 'SELECT') {
        addForm[i].parentNode.innerHTML += "<span class=\"alertText text-red\">\u8ACB\u9078\u64C7".concat(addForm[i].labels[0].innerText, "!</span>");
      } else {
        addForm[i].parentNode.innerHTML += "<span class=\"alertText text-red\">\u8ACB\u8F38\u5165".concat(addForm[i].labels[0].innerText, "!</span>");
      }
    } else {
      finishedNum += 1;
    }
  }

  if (finishedNum == 7) addNewData();
}

function addNewData() {
  lastDataItem = itineraryData[itineraryData.length - 1];
  addData = {
    'id': lastDataItem.id += 1,
    "name": document.getElementById('name').value,
    "imgUrl": document.getElementById('imgUrl').value,
    "area": document.getElementById('area').value,
    "description": document.getElementById('description').value,
    "group": parseInt(document.getElementById('group').value),
    "price": parseInt(document.getElementById('price').value),
    "rate": parseInt(document.getElementById('rate').value)
  };
  itineraryData.push(addData);
  document.getElementById('addItineraryForm').reset();
  chartDataFilter();
  itineraryCardGenerate();
}
//# sourceMappingURL=all.js.map
