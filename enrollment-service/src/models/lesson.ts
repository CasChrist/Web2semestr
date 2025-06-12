import { model, Schema } from 'mongoose';

interface ILesson {
  title: string;
  content?: string;
  videoUrl?: string;
  course: Schema.Types.ObjectId;
  order?: number;
  createdAt: Date;
}

const lessonSchema = new Schema<ILesson>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  order: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LessonModel = model<ILesson>('Lesson', lessonSchema);
