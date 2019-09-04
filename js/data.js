const data = (function() {
  const Expense = function(id, desc, value, type) {
    this.id = id;
    this.desc = desc;
    this.value = value;
    this.type = type;
    this.weekDay = new Date().getDay();
    this.monthDay = new Date().getDate();
  };

  // Expense.prototype.DayNumber = function(){
  //   return this.date;
  // };

  const Income = function(id, desc, value, type) {
    this.id = id;
    this.desc = desc;
    this.value = value;
    this.type = type;
    this.weekDay = new Date().getDay();
    this.monthDay = new Date().getDate();
  };

  // Income.prototype.MonthDay = function(){
  //   return this.date;
  // };

  const calcTotal = type => {
    let sum = 0;

    data.allItems.forEach(item => {
      if (item.type === type) {
        sum += item.value;
      }
    });

    data.totals[type] = sum;
  };
  
  const setStore = () =>{
    data.allItems = JSON.parse(localStorage.getItem("items"));
  };
  
  const setBudget = () => {
    const budget = JSON.parse(localStorage.getItem("budget")); 
    data.totals.expense = budget.expense;
    data.totals.income = budget.income;
    data.budget = budget.budget;
  };

  const data = {
    allItems: [],
    totals: {
      expense: 0,
      income: 0
    },
    budget: 0
  };

  return {
    addItem: function(item) {
      let newItem, id;

      if (data.allItems.length > 0) {
        id = data.allItems[data.allItems.length - 1].id + 1;
      } else {
        id = 0;
      }

      if (item.type === "expense") {
        newItem = new Expense(id, item.desc, Number(item.value), "expense");
      } else {
        newItem = new Income(id, item.desc, Number(item.value), "income");
      }

      data.allItems.push(newItem);

      return data.allItems;
    },

    updateBudget: function() {
      calcTotal("expense");
      calcTotal("income");

      const budget = data.totals.income - data.totals.expense;

      data.budget = budget;
    },

    getbudget: function() {
      return {
        budget: data.budget,
        expense: data.totals.expense,
        income: data.totals.income
      };
    },

    deleteItem: function(delItem) {
      const items = data.allItems;

      items.forEach((item, index) => {
        if (parseInt(item.id) == delItem.id) {
          data.allItems.splice(index, 1);
        }
      });

      return data.allItems;
    },

    setStore:setStore,
    
    setBudget:setBudget,
    
    testing: function() {
      console.log(data);
    }
  };
})();
