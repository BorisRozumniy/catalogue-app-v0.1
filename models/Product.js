const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    img: String,
    title: {type: String, required: true, unique: true},
    description: String,
    price: Number,
    numberDaysUntilEndDiscount: Number,
    owner: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Product', schema)