import moment from 'moment';
import mongoosePaginate from 'mongoose-paginate';
import mongoose, {
  PaginateModel,
  Document,
  model,
  Schema,
} from 'mongoose';
import { Post } from '../../../../domain/posts/model';

export interface IDocumentPost extends Document {
  userId: string;
  imageUrl: string;
  description: string;
  publisher: string;
  created: string;
}

export interface IPostEntity extends IDocumentPost {
  toPost(): Post;
}

export const PostSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: String,
  publisher: {
    type: String,
    required: true,
  },
  created: Date,
});

PostSchema.index({ userId: 1 });

PostSchema.index({ created: -1 });

PostSchema.plugin(mongoosePaginate);

PostSchema.methods.toPost = function toUser(): Post {
  return new Post(this._id, this.userId, this.imageUrl, this.description, this.publisher, this.created);
};

PostSchema.pre('save', function (next) {
  this.created = moment().toJSON();
  return next();
});

interface IPostDao<T extends Document> extends PaginateModel<T> {}

export const PostDao: IPostDao<IPostEntity> = model<IPostEntity>('Artist', PostSchema) as IPostDao<IPostEntity>;
