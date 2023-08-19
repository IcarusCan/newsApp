'use strict';

const ALL_USER = 'USER_ARRAY';
let users = getFromStorage(ALL_USER);
let userArr = [];
// Load all user when page load
users.forEach(user => userArr.push(parseUser(user)));

// Select neccessary elements
const btnRegister = document.querySelector('#btn-submit');
const firstNameInput = document.querySelector('#input-firstname');
const lastNameInput = document.querySelector('#input-lastname');
const userNameInput = document.querySelector('#input-username');
const passInput = document.querySelector('#input-password');
const cfmPassInput = document.querySelector('#input-password-confirm');

// Function to get the register data
const userExist = function (userName, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].userName === userName) {
      return true; // exist in data base
    }
  }
  return false; // user name is OK
};

// Function to get the register data
const getRegisterData = function () {
  return {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: userNameInput.value,
    password: passInput.value,
    cfmPass: cfmPassInput.value,
  };
};

// Function to validate the register data
const validateRegisterData = function (regData) {
  if (
    regData.fistName === '' ||
    regData.lastname === '' ||
    regData.userName === '' ||
    regData.password === '' ||
    regData.cfmPass === ''
  ) {
    alert('Please complete the register form!');
    return false;
  } else if (userExist(regData.userName, userArr)) {
    alert('User name exist!');
    return false;
  } else if (regData.password.length <= 8) {
    alert('Password must contains more than 8 characters!');
    return false;
  } else if (!(regData.password === regData.cfmPass)) {
    alert('Password does not match!');
    return false;
  } else {
    return true;
  }
};

// Function to clear the input data in Form
const clearInput = function () {
  firstNameInput.value = '';
  lastNameInput.value = '';
  userNameInput.value = '';
  passInput.value = '';
  cfmPassInput.value = '';
};

// Event handler for register button
btnRegister.addEventListener('click', function () {
  const userData = getRegisterData(); //return user data (object)
  const validate = validateRegisterData(userData);

  if (validate) {
    clearInput();
    // Init a new user
    const newUser = parseUser(userData); //object --> class instance

    // Push to array and save to localStorage
    userArr.push(newUser);
    saveToStorage(ALL_USER, userArr);

    // Go to page
    window.location.href = `../pages/login.html`;
  }
});
// localStorage.removeItem(ALL_USER);
