import express from 'express';
import bcrypt from 'bcrypt';
import db from '../Database/db.js';
const router = express.Router();
import jwt from 'jsonwebtoken'
import {verifymebro,verifyifmybookingvalid} from '../middleware.js';
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;


    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const [userExist] = await db.query(`select * from users where username = '${username}'`);
        if (userExist.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const store_pass = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, store_pass, role || 'user']
        );

        res.status(201).json({ message:'User registered successfully'});
    } catch (error) {
        res.status(500).json({ message:'Internal Server Error'});
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message:'Username and password are required'});
    }

    try {

        const [user] = await db.query('select * from users where username = ?',[username]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userData = user[0];
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message:'Invalid username or password'});
        }

        
        const token = jwt.sign(
            { id: userData.id, username: userData.username, role: userData.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({ message:'Login successful', token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

router.post('/add_trains', verifymebro, async (req, res) => {
    const { source, destination, total_seats} = req.body;
    
    if (!source || !destination || !total_seats) {
        console.log(source, destination, total_seats);
        return res.status(400).json({message: "All fields must be submitted"});
    }

    try {
        const [result] = await db.query(
            'insert into trains (source, destination, total_seats, available_seats) values (?, ?, ?, ?)',
            [source, destination, total_seats, total_seats]
        );
        res.status(201).json({ message: `Train from ${source} to ${destination} added successfully` });
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
});

router.get('/check_trains',async(req,res)=>{
    const {source,destination}= req.query

    if(!source || !destination){
        return res.status(400).json({message: "you need fill are required parameters"});
    }
    try{
            const [result]= await db.query('select * from trains where source= ? AND destination=?',
                [source,destination]
            );
            if(result.length==0){
                res.status(204).json({message: "there no available trains on this route"});
            }
            res.status(200).json({message: result})

    }
    catch(err){
          res.status(500).json({message: "Server side error"})
    }
})

router.post('/booking-ticket', verifyifmybookingvalid, async(req,res)=>{
     console.log(req.user.id)
     const {train_id}=req.query;
     if(!train_id){
        return res.status(404).json({message: 'train ID must be passed for booking train'})
     }
     try{

          await db.query('start transaction');

          const [result]= await db.query('select * from trains where id=?',[train_id]);
          if(result.length==0){
              return res.status(404).json({message: "Train your trying to get are not valid or it doesn't exist anymore"});
          }
          const total_seats=result[0].total_seats + 1;
          const available_seats= result[0].available_seats;
          const src=result[0].source;
          const dest = result[0].destination;

          if(available_seats<=0){
            return res.status(204).json({message: "train your trying to book is already full"});
          }

          const seat_number=total_seats-available_seats;

          await db.query('update trains set available_seats= ? where id=?',[available_seats-1, train_id]);
          await db.query(`INSERT INTO bookings (user_id, train_id, seat_number) VALUES (${req.user.id},${train_id},${seat_number})`);
          
          await db.query('commit')


          res.status(201).json({message: `Congratulation!! , your booking has been completed by IRCTC`,
            route: `ticket for ${src} --> ${dest} has been confirmed`
          })



     }
     catch(err){
           await db.query('rollback')
           res.status(500).json({error: "server side error"})
     }
})

router.get('/view_tickets', verifyifmybookingvalid,async(req,res)=>{
      console.log("hello")
      try{
          const [result]= await db.query(`select * from bookings where user_id= ${req.user.id}`);
          if(result.length==0){
             return res.status(204).json({message: "You haven't booked anything as of now"});
          }
          res.status(200).json({Ticket_list: result});
      }
      catch(err){
          res.status(500).json({error: "server side error"});
      }


})
export default router; 
