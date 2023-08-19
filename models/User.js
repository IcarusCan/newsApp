'use strict';

/**
 * ASM3
 * 1. Create User class
 */
class User {
  constructor(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = username;
    this.password = password;
  }

  async getNews(url) {
    try {
      const response = await fetch(url);
      if (!response.status) throw new Error(`Error Code: (${response.status})`);
      return response.json();
    } catch (error) {
      console.error(`*** Something wrong! ****** ${error.message} ***`);
    }
  }
}

// Function to parse user from Object --> Class
const parseUser = function (userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password
  );

  return user;
};
