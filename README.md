# Email Microservice

This microservice sends emails by listening to a RabbitMQ queue. Other services can publish messages to `email_queue`, and this service processes and sends emails accordingly.

## Setup

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Compile TypeScript: `npx tsc`
4. Start the email service: `node dist/index.js`

## RabbitMQ

Ensure RabbitMQ is running locally. The service connects to consume messages from the `EMAIL_QUEUE_NAME`.

## Usage

Publish messages to `EMAIL_QUEUE_NAME` using RabbitMQ Management UI or programmatically. The service sends emails based on the message content.

## Configuration

Adjust email service settings in `src/emailSender.ts` based on your email provider.


