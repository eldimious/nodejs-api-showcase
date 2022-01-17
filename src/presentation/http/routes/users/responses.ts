/**
  * This is the user response.
  * Added in order to avoid return password as response.
  * Password is property of our business model in domain layer.
*/
export class UserResponse {
  readonly id: string;

  readonly fullName: string;

  readonly username: string;

  readonly email: string;

  readonly created: Date;

  constructor(_id: string, fullName: string, username: string, email: string, created: Date) {
    this.id = _id;
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.created = created;
  }
}
