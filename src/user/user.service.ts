export class UserService {
  private users = [];

  create(user) {
    this.users.push(user);

    return user;
  }
}
