export class User {
  constructor(id, name, password) {
    this.isAdmin = false;
    this.id = id;
    this.name = name;
    this.password = password;
  }
}

export class Admin extends User {
  constructor(id, name, password) {
    super(id, name, password);
    this.isAdmin = true;
  }
}
