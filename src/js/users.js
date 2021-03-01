export class User {
  constructor(name, password) {
    this.isAdmin = false;
    this.name = name;
    this.password = password;
  }
}

export class Admin extends User {
  constructor(name, password) {
    super(name, password);
    this.isAdmin = true;
  }
}
