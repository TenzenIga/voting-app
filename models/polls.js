const mongoose = require('mongoose');
const config = require('../config/database');

const optionsSchema = mongoose.Schema({
  optionName: String,
  votes: Number
  })

const PollSchema = mongoose.Schema({
  name:String,
  createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  votedUsers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  options:[optionsSchema]
})

const Poll = module.exports = mongoose.model('Poll', PollSchema);

module.exports.addPoll = function(newPoll, cb){
  newPoll.save(cb)
}
module.exports.upPoll = function(poll, callback){
  if(poll.userLogged){
    Poll.findOneAndUpdate({"_id":poll.id, "options._id":poll.optionId},{$addToSet:{"votedUsers": poll.userLogged}, $inc:{"options.$.votes": 1}},{new: true}, callback)
  }else{
      Poll.findOneAndUpdate({"_id":poll.id, "options._id":poll.optionId},{$inc:{"options.$.votes": 1}}, {new: true}, callback)
  }
}
