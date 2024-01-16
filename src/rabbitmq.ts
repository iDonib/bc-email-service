import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const rabbitMQUrl: any = process.env.RABBITMQ_URL;

interface IRabbitMQ {
    channel: amqp.Channel;
    connection: amqp.Connection;
}

async function connectToRabbitMQ(): Promise<IRabbitMQ> {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    return { channel, connection };
}

export { connectToRabbitMQ };
