import { model, Schema } from 'mongoose';

interface IComment {
  user: Schema.Types.ObjectId;
  lesson: Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lesson: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CommentModel = model<IComment>('Comment', commentSchema);
