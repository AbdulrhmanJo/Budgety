const interface = (function() {
  //   const toggleForm = btn => {
  //     const form = document.querySelector(".popup");

  //     if (btn.classList.contains("btn-click")) {
  //       form.style.display = "flex";
  //       setTimeout(() => {
  //         form.style.opacity = "1";
  //       }, 50);
  //     } else {
  //     //   form.style.opacity = "0";
  //     //   setTimeout(() => {
  //     //     form.style.display = "none";
  //     //   }, 100);
  //     }
  //   };

  const getInfo = () => {
    let type;
    document.querySelectorAll(".budget-switch-input").forEach(el => {
      if (el.checked) {
        type = el.value;
      }
    });

    return {
      type: type,
      desc: document.querySelector(".budget-input-desc").value,
      value: document.querySelector(".budget-input-val").value
    };
  };

  const displayItems = items => {
    const container = document.querySelector(".items__container");
    container.innerHTML = "";

    // const date = new Date();
    // let count = 0;
    let firstItem = true;

    items.forEach((item, index) => {
      let parentEl, html, day, dayCont, doc;

      // date = new Date().getDate();

      // if (count === 2) {
      //   date = new Date(1998, 0, 24);
      //   count = 0;
      // }

      dayCont = `<div class="day__items"></div>`;
      day = `<div class="day">${getDay(item.weekDay)} ${item.monthDay}</div>`;

      if (item.type === "expense") {
        parentEl = `<div class='item item_expense' id=${item.id}></div>`;
        html = `<img class='item__img' src='img/arrow-down-on-black-circular-background.png'>
                  <div class='item__desc'>${item.desc}</div>
                  <div class='item__val'>${formatNumber(
                    item.value,
                    "expense"
                  )}</div>
                  <img src='img/delete-button.png' class='item__delete'>`;
      } else {
        parentEl = `<div class='item item_income' id=${item.id}></div>`;
        html = `<img class='item__img' src='img/arrow-up-on-a-black-circle-background.png'>
                  <div class='item__desc'>${item.desc}</div>
                  <div class='item__val'>${formatNumber(
                    item.value,
                    "income"
                  )}</div>
                  <img src='img/delete-button.png' class='item__delete'>`;
      }

      if (firstItem || items[index - 1].monthDay !== item.monthDay) {
        container.insertAdjacentHTML("afterbegin", dayCont);
        dayCont = document.querySelector(".day__items");
        dayCont.innerHTML = day;
        doc = new DOMParser().parseFromString(parentEl, "text/html");
        parentEl = doc.body.querySelector(".item");
        parentEl.innerHTML = html;
        dayCont.insertBefore(parentEl, day.nextSibling);
        firstItem = false;
      } else {
        doc = new DOMParser().parseFromString(parentEl, "text/html");
        parentEl = doc.body.querySelector(".item");
        parentEl.innerHTML = html;
        dayCont = document.querySelector(".day__items");
        dayCont.insertBefore(
          parentEl,
          document.querySelector(".day").nextSibling
        );
      }
    });
  };

  const clearForm = () => {
    document.querySelector(".popup__btn").blur();
    document.querySelector(".budget-switch-input").checked = true;
    document.querySelector(".budget-input-desc").value = "";
    document.querySelector(".budget-input-val").value = "";
    document.querySelector(".budget-input-desc").style.border = "1px solid rgb(245, 245, 245)";
    document.querySelector(".budget-input-val").style.border = "1px solid rgb(245, 245, 245)";
    document.querySelector(".error_desc").style.display = "none";
    document.querySelector(".error_val").style.display = "none";

  };

  const formatNumber = (num, type) => {
    let splitNum, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);

    splitNum = num.split(".");

    int = splitNum[0];

    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
    }

    dec = splitNum[1];

    if (type === "expense") {
      return "- " + int + "." + dec;
    } else {
      return "+ " + int + "." + dec;
    }
  };

  const displayBudget = budget => {
    let type;
    budget.budget > 0 ? (type = "income") : (type = "expense");

    document.querySelector(".card__balance--money").textContent =
      formatNumber(budget.budget, type) + " SR";
    document.querySelector(".card__income--value").textContent = formatNumber(
      budget.income,
      "income"
    );
    document.querySelector(".card__expenses--value").textContent = formatNumber(
      budget.expense,
      "expense"
    );
  };

  const displayMonth = () => {
    let now, month, months, year;

    now = new Date();
    months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    month = now.getMonth();
    year = now.getFullYear();

    document.querySelector(".month").textContent = months[month] + " " + year;
  };

  const getDay = day => {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  };

  return {
    // toggleForm: toggleForm,
    getInfo: getInfo,
    displayItems: displayItems,
    clearForm: clearForm,
    displayBudget: displayBudget,
    displayMonth: displayMonth
  };
})();
