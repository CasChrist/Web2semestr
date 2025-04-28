import { model, Schema } from 'mongoose';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

interface ICourse {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  level: string;
  published: boolean;
  author: Schema.Types.ObjectId;
  tags?: string[];
  createdAt: Date;
}

const courseSchema = new Schema<ICourse>({
  _id: {
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    default: 'beginner',
  },
  published: {
    type: Boolean,
    default: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
});

// Pre-save middleware to generate slug from title
courseSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const CourseModel = model<ICourse>('Course', courseSchema);
