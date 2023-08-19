'use strict';

/**
 * ASM3:
 * 3. Store data in local storage
 */
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * ASM3:
 * 3. Load data from local storage
 */
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? [];
}

/**
 * ASM3:
 * 3. Remove data from local storage
 */
function removeFromStorage(key) {
  localStorage.removeItem(key);
}
