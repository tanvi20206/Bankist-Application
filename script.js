"use strict";

const account1 = {
  owner: "Tanvi Gupta",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2024-11-24T10:51:36.790Z",
  ],
  currency: "INR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Tuktuk",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "standard",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Prateek Raj",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account4 = {
  owner: "Satyam Gupta",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const formatMovementDate = function (date, locale) {
  const calcdaypassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const dayspassed = calcdaypassed(new Date(), date);

  if (dayspassed === 0) return "Today";
  if (dayspassed === 1) return "Yesterday";
  if (dayspassed <= 7) return ` ${dayspassed} days ago`;

  //
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// before sort date , initially we used below method
////////////////////////////////
// const displaymovement =function(acc,sort = false){

//   containerMovements.innerHTML ='';
//   const movs =sort ? acc.movements.slice().sort((a,b) => a-b): acc.movements;
//   movs.forEach(function(mov,i) {
//       const type =mov>0 ?'deposit' :'withdrawal';
//       const date = new Date(acc.movementsDates[i]);
//       const day = `${date.getDate()}`.padStart(2,0);
//       const month =`${date.getMonth()+1}`.padStart(2,0);
//       const year =date.getFullYear();

//       const displayDate =`${day}/${month}/${year} `;

//       const html=`
//        <div class="movements__row">
//         <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
//         <div class="movements__date">${displayDate}</div>
//         <div class="movements__value">${mov.toFixed(2)} Rs.</div>
//       </div>
//       `;
//       // innerDAdjacent html is used to add the html to brower
//       containerMovements.insertAdjacentHTML('afterbegin',html);  //first argument is to position where
//   });
// };

const displaymovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const combinedmovdate = acc.movements.map((mov, i) => ({
    movement: mov,
    movdate: acc.movementsDates.at(i),
  }));
  console.log(combinedmovdate);

  if (sort) combinedmovdate.sort((a, b) => a.movement - b.movement);

  //const movs =sort ? acc.movements.slice().sort((a,b) => a-b): acc.movements;
  combinedmovdate.forEach(function (obj, i) {
    const { movement, movdate } = obj;
    const type = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(movdate);
    // const day = `${date.getDate()}`.padStart(2,0);
    // const month =`${date.getMonth()+1}`.padStart(2,0);
    // const year =date.getFullYear();
    // const displayDate =`${day}/${month}/${year} `;

    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(movement, acc.locale, acc.currency);

    const html = ` 
         <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDate}</div>
          <!-- <div class="movements__value">${movement.toFixed(
            2
          )} Rs.</div> -->
            <div class="movements__value">${formattedMov} </div>
        </div>
        `;
    // innerDAdjacent html is used to add the html to brower
    containerMovements.insertAdjacentHTML("afterbegin", html); //first argument is to position where
  });
};

//displaymovement(account1.movements);

// const createUsername = function(user){
//   const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(name => name[0])
//   .join('');

//   return username ;
// };
// console.log(createUsername('Satyam Kumar Gupta'));

/// create username

const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsername(accounts);
console.log(accounts);

const updateUi = function (acc) {
  displaymovement(acc);

  // display balance
  calcPrintBalance(acc);

  // //display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // set time to 5 minutes
  let time = 100;
  const tick = function () {};
  //call the timer every second
  setInterval(function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    //in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    //decrese is
    time--;
    //when 0 seconds , stop timer and log out user
    if (time == 0) {
      clearInterval(time);
      labelWelcome.textContent = "log in to get started";
      containerApp.style.opacity = 0;
    }
  }, 1000);
};

// calculate the total balance
// const calcPrintBalance= function(movements){
//   const balance = movements.reduce((acc,mov) =>
//     acc+mov ,0);
//   labelBalance.textContent=`${balance} Rs.`;
// };
// calcPrintBalance(account1.movements);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //labelBalance.textContent=`${acc.balance.toFixed(2)} `;

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};
//calcPrintBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumIn.textContent = `${incomes.toFixed(2)} `;
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} `;
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  //labelSumInterest.textContent= `${interest.toFixed(2)} `;
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

//calcDisplaySummary(account1.movements);

//login

let currentaccount;
btnLogin.addEventListener("click", function (e) {
  //prevent form from subnetting
  e.preventDefault();
  //console.log('login')
  currentaccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentaccount);
  if (currentaccount?.pin === Number(inputLoginPin.value)) {
    console.log("login");
    //display message
    labelWelcome.textContent = `Welcome back ,${
      currentaccount.owner.split(" ")[0]
    }`;
  }
  containerApp.style.opacity = 100;

  //current date
  const now = new Date();

  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "numeric", // long , 2-digits
    year: "numeric",
    //weekday:'long',
  };
  //const locale =navigator.language;
  labelDate.textContent = new Intl.DateTimeFormat(
    currentaccount.locale,
    options
  ).format(now);

  // const day = `${now.getDate()}`.padStart(2,0);
  // const month =`${now.getMonth()}`.padStart(2,0);
  // const year =now.getFullYear();
  // const hour = `${now.getHours()}`.padStart(2,0);
  // const min = `${now.getMinutes()}`.padStart(2,0);
  //labelDate.textContent=`${day}/${month}/${year} , ${hour}:${min}`;

  //clear input fields

  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
  startLogOutTimer();
  //display movements

  //update UI
  updateUi(currentaccount);
  //display movements
  // displaymovement(currentaccount.movements);
  // // display balance
  // calcPrintBalance(currentaccount);
  // //display summary
  // calcDisplaySummary(currentaccount);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiveracc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiveracc);
  inputTransferTo.value = inputTransferAmount.value = "";
  if (
    amount > 0 &&
    receiveracc &&
    currentaccount.balance >= amount &&
    receiveracc?.username !== currentaccount.username
  ) {
    //console.log('transfer valid');
    // doing the transfer
    currentaccount.movements.push(-amount);
    receiveracc.movements.push(amount);

    // add transfer date
    currentaccount.movementsDates.push(new Date().toISOString());
    receiveracc.movementsDates.push(new Date().toISOString());
    updateUi(currentaccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentaccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //addd movement
    currentaccount.movements.push(amount);
    // add loan date
    currentaccount.movementsDates.push(new Date().toISOString());
    receiveracc.movementsDates.push(new Date().toISOString());
    //update UI
    updateUi(currentaccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentaccount.username &&
    Number(inputClosePin.value) == Number(currentaccount.pin)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentaccount.username
    );
    // console.log(index);
    //delete
    accounts.splice(index, 1);
    // hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displaymovement(currentaccount, !sorted);
  sorted = !sorted;
});

// const now =  new Date();
// const day = `${now.getDate()}`.padStart(2,0);
// const month =`${now.getMonth()}`.padStart(2,0);
// const year =now.getFullYear();
// const hour = now.getHours();
// const min = now.getMinutes();

// labelDate.textContent=`${day}/${month}/${year} , ${hour}:${min}`;

// day/month/year

// experimenting

const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", // long , 2-digits
  year: "numeric",
  weekday: "long",
};
const locale = navigator.language;
labelDate.textContent = new Intl.DateTimeFormat("en-US", options).format(now);
//ISO language
