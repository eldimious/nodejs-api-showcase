/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/

export class Token {
  readonly accessToken: string;

  readonly tokenType: string;

  readonly expiresIn: number;

  readonly roles: string[];

  constructor(accessToken: string, tokenType: string, expiresIn: number, roles: string[]) {
    if (roles.length <= 0) {
      throw new Error('roles should not be empty');
    }
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
    this.roles = roles;
  }
}
