import express from 'express';
import registrationValidatetor from '../uitils/registrationValidator';

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register new user

router.post('/register',registrationValidatetor, function(req,res,next) {
  const { username,email,password } = req.body;
  try {
    registrationValidatetor(req.body)
    const { username,email,password } = req.body;
  } catch (error) {
    
  }
})

module.exports = router;
