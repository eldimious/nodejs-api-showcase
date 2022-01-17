import { UserResponse } from '../../presentation/http/routes/users/responses';

/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
export class User {
  readonly id: string;

  readonly fullName: string;

  readonly username: string;

  readonly email: string;

  readonly password: string;

  readonly created: Date;

  constructor(_id: string, name: string, surname: string, username: string, email: string, password: string, created: Date) {
    this.id = _id;
    this.fullName = `${name} ${surname}`;
    this.username = username;
    this.email = email;
    this.password = password;
    this.created = created;
  }

  toUserResponse(): UserResponse {
    return new UserResponse(this.id, this.fullName, this.username, this.email, this.created);
  }
}
