import mongoose from 'mongoose';
// import Promise from 'bluebird';
// import bcryptNodejs from 'bcrypt';

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  idUser: {
    type: 'ObjectId',
    required: [true, 'iduser field is required'],
  },
  idCharacter: {
    type: Number,
    required: [true, 'idCharacter field is required'],
  },
  dataCharacter: {
    type: Map
  }
}, { timestamps: true });

const favoriteModel = mongoose.model('favorites', favoriteSchema);

export default favoriteModel;
