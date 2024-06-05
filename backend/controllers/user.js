const Session = require("../model/session");
const User = require("../model/user");

exports.getSettings = async (req,res) => {
    const {email} = req.query;

    try {
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({message: 'User not found'});

        const session = await Session.findOne({userId: user._id});
        if(!session) return res.status(404).json({message: 'Session not found'});

        console.log(user);
        res.status(200).json({...user[`_doc`]});
    } catch (error) {
        return res.status(404).json({message: error.message});
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