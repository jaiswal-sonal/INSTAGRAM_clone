const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/instainsta";
mongoose
  .connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("MongoDB connected:", MONGO_URL))
  .catch((err) => {
    console.error("\n*** MongoDB se connect nahi ho paya ***");
    console.error("MongoDB chalu hai? (mongod / MongoDB Compass / Atlas URL check karo)");
    console.error(err.message, "\n");
  });

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage:String,
  posts:[{type:mongoose.Schema.Types.ObjectId,ref:"post"}],
   picture: {
     type: String,
     default: "def.png"
   },
   contact: String,
   bio: String,
   stories: [
     {
       type: mongoose.Schema.Types.ObjectId,
  //     ref: "story" 
     }
   ],
   saved: [
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "post" 
     }
   ],
   posts: [{
     type: mongoose.Schema.Types.ObjectId,
   ref: "post" 
 }],
 followers: [
   {
     type: mongoose.Schema.Types.ObjectId,
      ref: "user" 
  } 
  ],
  following: [
     {
     type: mongoose.Schema.Types.ObjectId,
       ref: "user" 
     }
   ]
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);