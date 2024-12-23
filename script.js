'use strict';

const account1 = {
    owner: 'Tanvi Gupta',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    type: 'premium',
  };
  
  const account2 = {
    owner: 'Tuktuk',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    type: 'standard',
  };
  
  const account3 = {
    owner: 'Prateek Raj',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    type: 'premium',
  };
  
  const account4 = {
    owner: 'Satyam Gupta',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    type: 'basic',
  };
  
  const accounts = [account1, account2, account3, account4];
  



  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');
  



  const displaymovement =function(movements,sort = false){
             
    containerMovements.innerHTML ='';

    const movs =sort ? movements.slice().sort((a,b) => a-b): movements;

    movs.forEach(function(mov,i) {
        const type =mov>0 ?'deposit' :'withdrawal';

        const html=` 
         <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov} Rs.</div>
        </div>
        `;

        // innerDAdjacent html is used to add the html to brower
        containerMovements.insertAdjacentHTML('afterbegin',html);  //first argument is to position where 
    });
  };

  displaymovement(account1.movements);


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

  const createUsername = function(accs){
    accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(" ")
    .map(name => name[0])
    .join('');
    });
  };
  createUsername(accounts);
  console.log(accounts);

  const updateUi =function(acc){
  displaymovement(acc.movements);

  // display balance
  calcPrintBalance(acc);

  // //display summary
  calcDisplaySummary(acc);
  }

// calculate the total balance
// const calcPrintBalance= function(movements){
//   const balance = movements.reduce((acc,mov) =>
//     acc+mov ,0);
//   labelBalance.textContent=`${balance} Rs.`;
// };
// calcPrintBalance(account1.movements);

const calcPrintBalance= function(acc){
  acc.balance = acc.movements.reduce((acc,mov) =>
    acc+mov ,0);
  labelBalance.textContent=`${acc.balance} Rs.`;
};
//calcPrintBalance(account1.movements);

const calcDisplaySummary=function(acc){
  const incomes = acc.movements
  .filter( mov =>  mov > 0)
  .reduce((acc,mov)=> acc+mov , 0);
  labelSumIn.textContent = `${incomes} Rs.`;

  const out = acc.movements
  .filter(mov=> mov<0)
  .reduce((acc , mov)=> acc + mov , 0);
  labelSumOut.textContent =`${Math.abs(out)} Rs.`;


const interest = acc.movements
.filter(mov =>  mov>0)
.map(deposit => (deposit * acc.interestRate)/100 )
.filter((int , i ,arr)=> int >=1 )
.reduce((acc,int)=> acc +int ,0);
labelSumInterest.textContent= `${interest} Rs.`;
};

//calcDisplaySummary(account1.movements);

//login

let currentaccount;
btnLogin.addEventListener('click', function(e){
  //prevent form from subnetting
  e.preventDefault();
  //console.log('login')
  currentaccount=accounts.find(
    acc => acc.username === inputLoginUsername.value);
  console.log(currentaccount);
  if(currentaccount?.pin === Number(inputLoginPin.value)){
    console.log('login');
  //display message 
   labelWelcome.textContent=`Welcome back ,${currentaccount.owner.split(' ')[0]}`;
  };
  containerApp.style.opacity = 100;
  //clear input fiels

  inputLoginUsername.value =inputLoginPin.value ='';
  inputLoginPin.blur();
  //display movements

  updateUi(currentaccount);
  //display movements
  // displaymovement(currentaccount.movements);
  // // display balance
  // calcPrintBalance(currentaccount);
  // //display summary
  // calcDisplaySummary(currentaccount);
});


btnTransfer.addEventListener(('click'),function(e){
e.preventDefault();

const amount = Number(inputTransferAmount.value);
const receiveracc = accounts.find(
  acc => acc.username === inputTransferTo.value
);
console.log(amount , receiveracc);
inputTransferTo.value=inputTransferAmount.value= '' ;
if(amount > 0 && 
  receiveracc &&
  currentaccount.balance >= amount
   && receiveracc?.username !== currentaccount.username){
    //console.log('transfer valid');
  // doing the transfer 
  currentaccount.movements.push(-amount);
  receiveracc.movements.push(amount);
 updateUi(currentaccount);
   }
});


btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if(amount > 0 && currentaccount.movements.some(mov => 
    mov >= amount * 0.1
  )){
    //addd movement
    currentaccount.movements.push(amount);

    //update UI
    updateUi(currentaccount);
  }
  inputLoanAmount.value = '';

});


btnClose.addEventListener('click',function(e){
  e.preventDefault();

  if(inputCloseUsername.value ===currentaccount.username && Number(inputClosePin.value)==Number(currentaccount.pin)){
  const index= accounts.findIndex(
    acc => acc.username === currentaccount.username
  );
 // console.log(index);
  //delete 
    accounts.splice(index,1);
// hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value=inputClosePin.value= '' ;
})

let sorted =false;
btnSort.addEventListener('click' ,function(e){
  e.preventDefault();

  displaymovement(currentaccount.movements ,!sorted);
  sorted =!sorted;
})


