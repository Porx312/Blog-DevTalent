import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/token.js';

dotenv.config();

export const authenticateToken = async (request, response, next) => {
    try {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return response.status(401).json({ msg: 'Token is missing' });
        }

        const user = await jwt.verify(token, process.env.ACCESS_SECRET_KEY);
        request.user = user;
        next();
    } catch (error) {
        return response.status(403).json({ msg: 'Invalid or expired token' });
    }
};

export const createNewToken = async (request, response) => {
    try {
        const refreshToken = request.body.token && request.body.token.split(' ')[1];

        if (!refreshToken) {
            return response.status(401).json({ msg: 'Refresh token is missing' });
        }

        const tokenRecord = await Token.findOne({ token: refreshToken });

        if (!tokenRecord) {
            return response.status(404).json({ msg: 'Refresh token is not valid' });
        }

        const user = await jwt.verify(tokenRecord.token, process.env.REFRESH_SECRET_KEY);
        
        const accessToken = jwt.sign({ user }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });

        return response.status(200).json({ accessToken });
    } catch (error) {
        return response.status(403).json({ msg: 'Invalid or expired refresh token' });
    }
};
