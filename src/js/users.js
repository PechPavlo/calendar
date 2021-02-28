export class User {
  constructor(id, name) {
    this.isAdmin = false;
    this.id = id;
    this.name = name;
    this.password = '';
  }
}

export class Admin extends User {
  constructor(id, name) {
    super(id, name);
    this.isAdmin = true;
  }
}
