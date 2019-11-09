import mongoose from 'mongoose';
import Promise from 'bluebird';
import bcryptNodejs from 'bcrypt';

const Schema = mongoose.Schema;
const bcrypt = Promise.promisifyAll(bcryptNodejs);

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email field is required'],
  },
  password: {
    type: String,
    required: [true, 'Password field is required'],
  }
}, { timestamps: true });

userSchema.pre('save', function(next) {

  const user = this;
  const SALT_FACTOR = 8;

  if (!user.isModified('password')) {
    return next();
  }

  const hash = bcrypt.hashSync(user.password, SALT_FACTOR);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('user', userSchema);

export default userModel;
