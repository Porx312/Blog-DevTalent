import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const Connection = async () => {
    const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog'; // Use environment variable or default to local DB

    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
      
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting to the database:', error.message);
        process.exit(1); // Exit process with failure
    }
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
        try {
            await mongoose.connection.close();
            console.log('Database connection closed');
            process.exit(0); // Exit process with success
        } catch (error) {
            console.error('Error while closing the database connection:', error.message);
            process.exit(1); // Exit process with failure
        }
    });
};

export default Connection;
