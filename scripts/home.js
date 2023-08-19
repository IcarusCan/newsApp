'use strict';

const CUR_USER = 'CURRENT_USER';
let [currentUser] = getFromStorage(CUR_USER); //destructuring

// Select neccessary elements
const loginModal = document.querySelector('#login-modal');
const mainContent = document.querySelector('#main-content');
const btnLogout = document.querySelector('#btn-logout');

// Function to display Home page
const displayHomePage = function () {
  // Check whether the user has logged in or not
  if (!currentUser) {
    mainContent.style.display = 'none';
  } else {
    loginModal.querySelector('.row').style.display = 'none';
    loginModal.querySelector(
      'p'
    ).textContent = `Welcome ${currentUser.firstName}`;
  }
};

// Event handler for logout
btnLogout.addEventListener('click', function () {
  removeFromStorage(CUR_USER);
  // Back to login page (from index.html)
  window.location.href = './pages/login.html';
});

displayHomePage();
