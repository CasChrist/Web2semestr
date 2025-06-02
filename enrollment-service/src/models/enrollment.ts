import { model, Schema } from 'mongoose';

interface IEnrollment {
  user: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  completedLessons: Schema.Types.ObjectId[];
  enrolledAt: Date;
}

const enrollmentSchema = new Schema<IEnrollment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedLessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
});

enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export const EnrollmentModel = model<IEnrollment>(
  'Enrollment',
  enrollmentSchema
);
