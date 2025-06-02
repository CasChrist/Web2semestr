import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue('enrollment_queue', { durable: true });
  console.log('Connected to RabbitMQ');
};

export const publishEnrollment = async (message: object) => {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }
  channel.sendToQueue('enrollment_queue', Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

export const consumeEnrollment = async (callback: (msg: any) => void) => {
  if (!channel) {
    throw new Error('RabbitMQ channel is not initialized');
  }
  await channel.consume('enrollment_queue', (msg) => {
    if (msg) {
      callback(msg);
      channel.ack(msg);
    }
  });
};
