'use strict';

const ALL_USER = 'USER_ARRAY';
const CUR_USER = 'CURRENT_USER';
let users = getFromStorage(ALL_USER);
let currentUser = getFromStorage(CUR_USER);
let userArr = [];
// Load all user when page load
users.forEach(user => userArr.push(parseUser(user)));

// Select neccessary elements
const userNameInput = document.querySelector('#input-username');
const passInput = document.querySelector('#input-password');
const btnLogin = document.querySelector('#btn-submit');

// Function to validate registered data
const validateData = function (regData) {
  if (regData.userName === '' || regData.password === '') {
    alert('Please fill in the form!');
    return false;
  } else {
    return true;
  }
};

// Function to check matching user name
const loginUser = function (userData, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (
      arr[i].userName === userData.userName &&
      arr[i].password === userData.password
    ) {
      // return true; // exist in data base
      return arr[i];
    }
  }

  alert('Please check again or Register first!');
  return false; // not exist
};

// Event handler for login button
btnLogin.addEventListener('click', function () {
  // Get login data
  const loginData = {
    userName: userNameInput.value,
    password: passInput.value,
  };

  // Validate the data
  const validate = validateData(loginData);
  if (!validate) return;

  // Check login data with database
  const loginUserInfo = loginUser(loginData, userArr);

  if (loginUserInfo) {
    alert('Login successfully!');

    // Save current login user to localStorage for further access
    currentUser.push(loginUserInfo);
    saveToStorage(CUR_USER, currentUser);

    // Go to Home page
    window.location.href = `../index.html`;
  }
});
