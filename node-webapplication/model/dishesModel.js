const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;
const schema = mongoose.Schema;

const commentSchema = new schema({
  rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
  },
  comment: {
             type: String,
             required: true
  },
  author: {
            type: String,
            required: true
  }
},
{
    timestamps: true
});

const dishSchema = new schema({
  name: {
          type: String,
          required: true
  },
  description: {
                 type: String,
                 required: true
  },
  price:  {
            type: currency,
            required: true
  },
  comments: [commentSchema]

},
{
      timestamps: true
});

var dishesModel = mongoose.model('dish', dishSchema);

module.exports = dishesModel;
