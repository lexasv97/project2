const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
      email: String,
      password: String,
      fullName: String,
      occupation: String
    },
    {
      timestamps: true
    }
  );

module.exports = model('User', userSchema)