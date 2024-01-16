import { connectToRabbitMQ } from './rabbitmq';
import { sendEmail, IEmailMessage } from './emailSender';
import amqp from 'amqplib';

async function consumeEmailQueue(
    channel: amqp.Channel,
    queueName: string
): Promise<void> {
    await channel.assertQueue(queueName, { durable: false });

    channel.consume(queueName, (msg) => {
        if (msg) {
            try {
                const emailMessage = JSON.parse(
                    msg.content.toString()
                ) as IEmailMessage;
                sendEmail(emailMessage);
                channel.ack(msg);
            } catch (error) {
                console.error('Error processing email message:', (error as Error).message);
                channel.reject(msg, false);
            }
        }
    });
}

async function startEmailService(): Promise<void> {
    const { channel } = await connectToRabbitMQ();
    const queueName: any = process.env.EMAIL_QUEUE_NAME;

    try {
        await consumeEmailQueue(channel, queueName);
    } catch (error) {
        console.error(
            'Error starting email service:',
            (error as Error).message
        );
    }
}

export { startEmailService };
