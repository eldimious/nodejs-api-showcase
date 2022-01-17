/**
  * This is the app Model it is decoupled from
  * the Entities used for the databse
*/
export class Post {
  readonly id: string;

  readonly userId: string;

  readonly imageUrl: string;

  readonly description: string;

  readonly publisher: string;

  readonly created: Date;

  constructor(_id: string, userId: string, imageUrl: string, description: string, publisher: string, created: Date) {
    this.id = _id;
    this.userId = userId;
    this.imageUrl = imageUrl;
    this.description = description;
    this.publisher = publisher;
    this.created = created;
  }
}
