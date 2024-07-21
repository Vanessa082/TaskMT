import pool from '../config/dbconfig';
import express from 'express';
import registrationValidatetor from '../uitils/registrationValidator';
import bcript, { hash } from 'bcrypt';
import loginValidator from '../uitils/loginValidator';

const router = express.Router();

// register new user

router.post('/register', registrationValidatetor, function (req, res, next) {

  try {
    const { username, email, password } = req.body;

    // checking if user already exist

    const userCheckQuery = `select * from accounts where email = $1`
    pool.query(userCheckQuery, [email])
      .then(result => {
        if (result?.rows?.length > 0) {
          return res.status(400).json({ error: 'user already exist please login' })
        }

        res.status(201).json({ message: 'registered successfully' })
      })
      .catch(error => {
        console.error('Error checking user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      });

    // hashing password

    const saltRound = 10;
    bcript.genSalt(saltRound, function (err, salt) {
      if (err) {
        console.error('Error generating salt:', err)
        return res.status(500).json({ error: 'Internal server error' })
      }
      bcript.hash(password, salt, function (err, hash) {
        if (err) throw err;
      })
    })

    // storing user details
    const addUserQuery = `insert into accounts (username, email, password, created_at) values($1, $2, $3, now())`;
    pool.query(addUserQuery, [username, email, hash])
      .then(() => {
        res.status(201).json({ message: 'User registered succesfully' });
      }).catch(error => {
        console.error('Error registering user', error);
        return res.status(500).json({ error: 'Internal server error' });
      })
  } catch (error) {
    console.error('Error in try-catch block:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
})

// login user

router.post('/login', loginValidator, function (req, res, next) {
  try {
    const { email, password } = req.body;

    // check if email exist
    const emailCheckQuery = `select * from accounts where email = $1`
    pool.query(emailCheckQuery, [email])
      .then(result => {
        if (result?.rows?.length > 0) {
          return res.status(201).json({ message: 'Login succesfully' })
        }

        res.status(400).json({ error: 'Incorrect Email' });
      }).catch(error => {
        console.error('Error checking user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      });

    const passwordCheckQuery = `select * from accounts where password = $2`
    pool.query(passwordCheckQuery, [password])
      .then(result => {
        if (result?.rows?.length > 0) {
          return res.status(201).json({ message: 'Login succesfully' });
        }

        res.status(400).json({ message: 'Incorrect Password' });
      }).catch(error => {
        console.error('Error checking user:', error);
        return res.status(500).json({ error: 'Internal server error' });
      });
  } catch (error) {
    console.error('Error in try-catch block:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;
