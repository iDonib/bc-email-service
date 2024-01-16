import { startEmailService } from './emailService';

async function main(): Promise<void> {
    try {
        await startEmailService();
        console.log('Email service started successfully.');
    } catch (error) {
        console.error('Error in main:', (error as Error).message);
        process.exit(1);
    }
}

main();
