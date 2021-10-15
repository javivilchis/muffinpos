const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
  name: {
    type: String,
  },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
