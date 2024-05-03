//userInfo.model.ts

export class User {
    userId?: string;
    username: string;
    password: string;
    email: string;

    constructor(username: string, password: string, email: string, userId?: string) {
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
