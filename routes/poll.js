const express = require('express');
const Poll = require('../models/polls');
const mongoose = require('mongoose');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// get all polls
router.get('/home', (req, res, next)=>{
  Poll.find({}, (err, data)=>{
    if(err) res.send(err);
    res.send(data);
  })
})
//get  all polls created by user
router.get('/dashboard/:user',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
  let userId = req.params.user;
  Poll.find({createdBy:userId}, (err, data)=>{
    if(err) res.send(err);
    res.send(data)
  })
})
//Add poll
router.post('/',passport.authenticate('jwt', {session: false}),(req, res, next)=>{
  let ar = req.body.options;
  let newPoll = new Poll({
    name:req.body.name,
    createdBy:req.body.user
  });
  ar.forEach(item=>{
    newPoll.options.push(item);
  })
  Poll.addPoll(newPoll, (err)=>{
    if(err){
      res.json({success:false, msg:'Failed to add poll'});
    }else{
      res.json({success:true, msg:'Poll added'});
    }
  });
})
//get poll page
router.get('/polls/:id', (req, res, next)=>{
  let pollId = req.params.id;
  Poll.findOne({"_id":pollId}, (err,data)=>{
    if(err) res.send(err);
    res.json(data);
  })

})

//Delete poll
router.delete('/polls/:id', passport.authenticate('jwt', {session: false}),(req, res, next)=>{
  let pollId = req.params.id;
  Poll.remove({"_id":pollId}, (err)=>{
    if(err) res.send(err);

  })
  res.send({success:true});
})
//add new option
router.put('/:id',passport.authenticate('jwt', {session: false}),(req,res,next)=>{
  let id = req.params.id;
      optionName= req.body.name;
      userId = req.body.user;
  Poll.findOneAndUpdate({"_id":id},{$addToSet:{"options":{"optionName":optionName,"votes":'1'}},"votedUsers":userId},{new: true},(err,data)=>{
    if(err){
      res.json({success:false, msg:'Failed to add vote'});
    }else{
      res.json(data);
    }
  })
})

//Upgrate poll
router.put('/polls/:id', (req, res, next)=>{
  let poll = {
    id :req.params.id,
     optionId:req.body.optionId,
     userLogged:req.body.user
 }
  Poll.upPoll(poll, (err, data)=>{
    if(err){
      res.json({success:false, msg:'Failed to add vote'});
    }else{
      res.json(data);
    }
  })

})

module.exports = router;
