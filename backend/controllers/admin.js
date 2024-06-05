const { validateEmail } = require("../middleware/validation/Email");
const { validatePassword } = require("../middleware/validation/password");
const bcrypt = require('bcryptjs')

const Session = require("../model/session");
const User = require("../model/user");

exports.getSettings = async (req,res) => {
    const { email } = req.params;

    try{
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ message: 'User not found'});

        const session = await Session.findOne({ userId: user._id });
        if(!session) return res.status(400).json({ message: 'Session not found' });

        res.status(200).json({...user[`_doc`]});
    }catch(error){
        return res.status(400).json({ message: error.message });
    }
}

exports.putSettings = async (req,res) => {
    const { currentField,newData,userEmail} = req.body;

    const user = await User.findOne({ email: userEmail });
    if(!user) return res.status(400).json({ message: 'User not found'});

    const session = await Session.findOne({ userId: user._id });
    if(!session)return res.status(400).json({ message: 'Session not found' })

    if(currentField === 'name'){
        const other = await User.findOne({name: newData});
        if(user.name === newData || other ) return res.status(400).json({ error: 'Name already'});
        
        await user.updateOne({ name: newData }); 
        return res.status(200).json({ message: "Updated Name"});
    }

    if(currentField == 'email'){
        const other = await User.findOne({ email: newData });
        if(user.email === newData || other) return res.status(400).json({ error: 'Name already'});

        await user.updateOne({ email: newData });
        return res.status(200).json({ message: 'Updated Email'});
    }

    if(currentField === 'password'){
        const {confirmPassword} = req.body;
        if (!validatePassword(newData)) return res.status(400).json({ message: "Invalid Password" });
    
        if (newData !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

        const newPassword = await bcrypt.hash(newData, 10);
        await user.updateOne({ password: newPassword });
        return res.status(200).json({ message: 'Updated Password'});
    }
}

exports.getUsers = async (req,res) => {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({ message: 'User not found'});

    const session = await Session.findOne({ userId: user._id });
    if(!session)return res.status(400).json({ message: 'Session not found' })

    const Users = await User.find();

    return res.status(200).json({Users});
} 

exports.deleteUser = async (req,res) => {
    const { email } = req.query;
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({ message: 'User not found'});

    const session = await Session.findOne({ userId: user._id });
    if(!session)return res.status(400).json({ message: 'Session not found' });
    
    const {userId} = req.params;
    await User.findOneAndDelete({ _id : userId });
    return res.status(200).json({ message: 'User deleted successfully'});
}

exports.updateUser = async (req,res) => {
    const { userId} = req.params;
    const {name,email,role} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {name,email,role});
        if(!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Not updated' });
    }
}