'use strict';

// Select element
const inputPagesize = document.querySelector('#input-page-size');
const inputCategory = document.querySelector('#input-category');
const btnSave = document.querySelector('#btn-submit');

// Get the saved data
const PAGE_SIZE = 'CURRENT_PAGE_SIZE';
let curPageSize = getFromStorage(PAGE_SIZE);
const CATEGORY = 'CURRENT_CATEGORY';
let curCategory = getFromStorage(CATEGORY);

// Get current user from localStorage
const CUR_USER = 'CURRENT_USER';
let [user] = getFromStorage(CUR_USER);
let currentUser = [];

// Function to get current/saved setting
// then display in form
const getCurrentSetting = function () {
  curPageSize.length !== 0
    ? (inputPagesize.value = curPageSize)
    : (inputPagesize.value = 5);

  curCategory.length !== 0
    ? (inputCategory.value = curCategory)
    : (inputCategory.value = 'General');
};

// Event handler for save button
btnSave.addEventListener('click', function () {
  // Get new setting
  const setNewSetting = {
    pageSize: inputPagesize.value,
    category: inputCategory.value,
  };

  // Validate the setting input
  if (setNewSetting.pageSize === '' || setNewSetting.category === '') {
    alert('Please fill in the form!');
    return;
  }

  // Save to localStorage
  saveToStorage(PAGE_SIZE, setNewSetting.pageSize);
  saveToStorage(CATEGORY, setNewSetting.category);
  alert('Save complete!');
});

if (!user) {
  inputPagesize.disabled = true;
  inputCategory.disabled = true;
  btnSave.disabled = true;
} else {
  currentUser = parseUser(user);
  getCurrentSetting();
  inputPagesize.disabled = false;
  inputCategory.disabled = false;
  btnSave.disabled = false;
}
