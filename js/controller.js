const controller = (function(data, interface) {
  const setUpEvents = () => {
    // 1- add event listener to toggle the btn that show form

    // document.querySelector(".btn").addEventListener("click", plusBotten);

    // 2- add event listener to add btn
    document
      .querySelector(".popup__btn")
      .addEventListener("click", ctrlAddItem);

    document.querySelector(".container").addEventListener("keypress", e => {
      if (e.keyCode === 13) {
        ctrlAddItem();
      }
    });

    // 3- add event listener to delet btn
    document.querySelector(".items__container").addEventListener("click", e => {
      if (e.target.classList.contains("item__delete")) {
        ctrlDeleteItem(e.target);
      }
    });
  };

  const ctrlAddItem = () => {
    let info, item;

    // 1- get the infromation from the form
    info = interface.getInfo();

    if (
      isNaN(info.desc) &&
      info.desc !== "" &&
      !isNaN(info.value) &&
      info.value > 0
    ) {
      // 2- add item to data store
      items = data.addItem(info);

      //2.2 add item to local storage
      localStorage.setItem("items", JSON.stringify(items));

      // 3- add item to the UI
      interface.displayItems(items);

      //4- clear and hidden the form
      interface.clearForm();

      // 4- calc the budget
      data.updateBudget();

      const budget = data.getbudget();

      //5.5 add budget to local storage
      localStorage.setItem("budget", JSON.stringify(budget));

      // 5- display the budget on the UI
      interface.displayBudget(budget);
    } else {
      errorMsg(info);
    }
  };

  //   const plusBotten = () => {
  //     const btn = document.querySelector(".btn");
  //     btn.classList.toggle("btn-click");
  //     interface.toggleForm(btn);
  //   };

  const ctrlDeleteItem = target => {
    // 1- get item from the DOM
    const item = target.parentElement;

    // 2- delete our item from our memory
    const remItems = data.deleteItem(item);

    // overwrite items in localStorage
    localStorage.setItem("items", JSON.stringify(remItems));

    // 3- remove item from the UI
    interface.displayItems(remItems);

    // update budget
    data.updateBudget();

    // 5- display the budget on the UI
    const budget = data.getbudget();

    localStorage.setItem("budget", JSON.stringify(budget));

    interface.displayBudget(budget);
  };

  const setUpPage = () => {
    const month = new Date();
    if (month.getDate() !== 1) {
      if (localStorage.getItem("items")) {
        interface.displayItems(JSON.parse(localStorage.getItem("items")));
        data.setStore();
      }

      if (localStorage.getItem("budget")) {
        data.setBudget();
        interface.displayBudget(JSON.parse(localStorage.getItem("budget")));
      }
    } else {
      localStorage.clear();
    }
  };

  const errorMsg = info => {
    if (!isNaN(info.desc) || info.desc === "") {
      document.querySelector(".error_desc").style.display = "block";
      document.querySelector(".budget-input-desc").style.border =
        "1px solid darkred";
        console.log("hi");
        
    }

    if (isNaN(info.value) || info.value < 0 || info.value === "") {
      document.querySelector(".error_val").style.display = "block";
      document.querySelector(".budget-input-val").style.border =
        "1px solid darkred";
        console.log("hi");
        
    }
  };

  const init = () => {
    setUpEvents();
    setUpPage();
    interface.displayMonth();
  };

  return {
    init: init
    // plusBotten: plusBotten,
  };
})(data, interface);

controller.init();
