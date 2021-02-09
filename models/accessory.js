const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

const accessorySchema = new Schema({
    name: {
        type: String,
        required: true,
        },
    description: {
        type: String,
        required: true,
        minLength: 5
        },
    imageUrl: {
        type: String,
        required: true,
        },

    cubes: [{
        type: Schema.Types.ObjectId,
        ref: 'Cube'
        }]
});


// username: {
//     validate: {
//         validator: function (v) {
//             return /^[\w\d]*$/.test(v);
//         },
//         message: `must be only letters or numbers!`
//     },
// }
// minlength: [5, 'must be 5 or more letters!'],
//     required: [true, 'is required!']



const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;