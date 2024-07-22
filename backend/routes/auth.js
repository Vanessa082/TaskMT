import pool from '../config/dbconfig.js';
import express from 'express';
import registrationValidatetor from '../uitils/registrationValidator.js';
import bcript, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import loginValidator from '../uitils/loginValidator.js';


const router = express.Router();

// register new user

router.post('/register', registrationValidatetor, async function (req, res, next) {
  try {
    const { username, email, password } = req.body;

    // checking if user already exist

    const userCheckQuery = `select * from accounts where email = $1`
    const existingUsers = await pool.query(userCheckQuery, [email]);

    if (existingUsers?.rows?.length > 0) {
      return res.status(401).json({ error: 'user already exist please login' });
    }

    // hashing password

    const saltRound = 10;
    const hash = await bcript.hash(password, saltRound);

    // storing user details
    const addUserQuery = `insert into accounts (username, email, password, created_at) values($1, $2, $3, now())`;

    await pool.query(addUserQuery, [username, email, hash]);

    return res.status(201).json({ message: 'User registered succesfully' });
  } catch (error) {
    console.error('Error in try-catch block:', error?.message || error
    );
    return res.status(500).json({ error: 'Internal server error' });
  }
})

// login user

// router.post('/login', loginValidator, function (req, res, next) {
//   try {
//     const { email, password } = req.body;

//     // check if email exist
//     const emailCheckQuery = `select * from accounts where email = $1`
//     pool.query(emailCheckQuery, [email])
//       .then(result => {
//         if (result?.rows?.length > 0) {
//           return res.status(201).json({ message: 'Login succesfully' })
//         }

//         res.status(400).json({ error: 'Incorrect Email' });
//       })
//       res.status(200).json({
//         message: 'Login successful',
//       })
//     // compare password with that in the database
//     const user = result.rows[0]
//     return bcript.compare(password, user.password)
//       .then(isMatch => {
//         if (!isMatch) {
//           return res.status().json({ error: 'Incorrect password' });
//         }
//       })
//   } catch (error) {
//     console.error('Error in try-catch block:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// })

export default router;
