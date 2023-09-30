const { Schema, model } = require('mongoose')

const creatorSchema = new Schema(
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

module.exports = model('Creator', creatorSchema)