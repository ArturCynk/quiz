const Session = require("../model/session");

exports.createSession = async (userId) => {
    try {
        const sessionId = crypto.randomBytes(20).toString("hex");
        const session = await new Session({userId: userId, sessionId: sessionId});
        await session.save();
        return sessionId;
    } catch (error) {
        console.error('Error creating session:', error);
        throw new Error('Unable to create session.');
    }
};

exports.verifySession = async (sessionId) => {
    try {
        const session = await Session.findOne({sessionId: sessionId});
        if(!session){
            throw new Error('Session not found');
        }
        return session.userId;
    } catch (error) {
        console.error('Error verifying session:', error);
        throw new Error('Invalid session.');
    }
};

exports.closeSession = async (sessionId) => {
    try {
        await Session.deleteOne({sessionId: sessionId});
    } catch (error) {
        console.error('Error closing session:', error);
        throw new Error('Unable to close session.');
    }
};