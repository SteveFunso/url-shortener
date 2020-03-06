const mongoose = require('mongoose')
const shortid = require('shortid')


const code = {
                me: shortid.generate
             }
const urlGen = 'cbc_'+ code.me.generate();

const shortUrlSchema = new mongoose.Schema({
    full:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: urlGen
    },
    clicks:{
        type: Number,
        required: true,
        default: 0
    }
    
})

module.exports = {
    m: mongoose.model('ShortUrl', shortUrlSchema),
    c: code
}

//module.exports = mongoose.model('ShortUrl', shortUrlSchema)

