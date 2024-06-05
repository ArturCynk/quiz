const axios = require('axios');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const Session = require('../model/session');
const { sendActivateEmail } = require('../middleware/mail/sendActivateEmail');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email: email }, { name: name }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
            if (existingUser.name === name) {
                return res.status(400).json({ error: 'Username is already in use' });
            }
        }

        // Hashing the password
        const passwordHashed = await bcrypt.hash(password, 10);

        // Generating activation token
        const activationToken = crypto.randomBytes(20).toString('hex');

        // Creating a new user
        const newUser = new User({
            name: name,
            email: email,
            password: passwordHashed,
            registrationDate: new Date(),
            activationToken: activationToken,
            activate : false,
        });
        await newUser.save();

        await sendActivateEmail(newUser,activationToken);

        res.status(200).json({ message: 'Registration successful, please check your email to activate your account.', data: { name, email } });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ error: 'Registration failed. Please try again later.' });
    }
};


exports.activate = async (req,res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({activationToken : token});

        if(!user){
            return res.status(400).json({ error: 'Invalid or expired activation token' });
        }

        user.activate = true;
        user.activationToken = undefined;

        await user.save();

        res.status(200).json({message: 'Account successfully activated'});
    } catch (error) {
        console.error('Activation failed:', error);
        res.status(500).json({ error: 'Activation failed. Please try again later.' });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: 'User not found. Please try again later.' });
        }

        if (!user.activate) {
            return res.status(400).json({ error: 'Your account has not been activated yet. Please check your email for activation instructions.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password. Please try again later.' });
        }

        // Tworzenie sesji dla zalogowanego użytkownika
        const sessionId = crypto.randomBytes(20).toString('hex'); // Generowanie identyfikatora sesji
        const session = new Session({ userId: user._id, sessionId: sessionId });
        await session.save();

        res.json({ message: 'Login successful.', sessionId, role: user.role }); // Zwracanie identyfikatora sesji
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
};
