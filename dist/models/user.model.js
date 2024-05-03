"use strict";
//userInfo.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, password, email, userId) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
    }
    login() {
        // Placeholder logic for login
        // You would typically validate the username and password here
        console.log(`User ${this.username} logged in`);
    }
    logout() {
        // Placeholder logic for logout
        // You might clear the session or perform any necessary cleanup here
        console.log(`User ${this.username} logged out`);
    }
}
exports.User = User;
