import { connectRabbitMQ, consumeEnrollment } from './rabbitmq';
import { EnrollmentModel } from './models/enrollment';
import amqp from 'amqplib';

const processEnrollment = async (msg: amqp.Message) => {
  try {
    const content = msg.content.toString();
    const { userId, courseId } = JSON.parse(content);

    // Check if enrollment already exists
    const existingEnrollment = await EnrollmentModel.findOne({
      user: userId,
      course: courseId,
    }).exec();
    if (existingEnrollment) {
      console.log(`User ${userId} already enrolled in course ${courseId}`);
      return;
    }

    // Create new enrollment
    const enrollment = new EnrollmentModel({
      user: userId,
      course: courseId,
      completedLessons: [],
    });

    await enrollment.save();
    console.log(
      `Enrollment processed for user ${userId} in course ${courseId}`
    );
  } catch (error) {
    console.error('Failed to process enrollment:', error);
  }
};

const startWorker = async () => {
  await connectRabbitMQ();
  await consumeEnrollment(processEnrollment);
  console.log('Enrollment worker started');
};

startWorker().catch(console.error);
