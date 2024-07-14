const User = require('../models/User');
const UserInfo = require('../models/UserInfo');

// function to register new user 
const registerUser = async (req, res) => {
  const { username, password, email, mobile } = req.body;

  try {   

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { mobile }]
    }).exec();

    if (existingUser) {
      let message = 'Account already exists with ';
      if (existingUser.username === username) {
        message += 'this username';
      } else if (existingUser.email === email) {
        message += 'this email';
      } else if (existingUser.mobile === mobile) {
        message += 'this mobile number';
      }
      return res.status(400).json({ message });
    }

    const userInfo = await UserInfo.findById('6688f758d7d8f2abbf9447d6').exec();
    if (!userInfo) {
      console.log("UserInfo not found");
      return res.status(404).json({ message: 'UserInfo not found' });
    }

    const userId = userInfo.totalUsers + 1;

    const user = new User({
      username,
      password,
      email,  
      mobile,
      userId
    });

    await user.save();

    userInfo.totalUsers += 1;
    await userInfo.save();

    res.status(200).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// function for user login 
const loginUser = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json({userId: user.userId});
    } else {
      res.status(401).json({ message: 'Invalid credentails' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error })
  }  
}
  
// function to find records from user collection
const getAllUserInfo = async (req, res) => {
  try {
    const userInfos = await UserInfo.find();
    res.status(200).json(userInfos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUserInfo,
};
