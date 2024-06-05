const Session = require("../model/session");
const User = require("../model/user");

exports.verifyUserAndSession = async (req,res,next) => {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({ message: 'User not found'});

    const session = await Session.findOne({ userId: user._id });
    if(!session)return res.status(400).json({ message: 'Session not found' });

    next();
}