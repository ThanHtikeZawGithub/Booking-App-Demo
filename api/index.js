const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
    uploadBytesResumable,
    getDownloadURL,
    getStorage,
  } = require("firebase/storage");
const storage = require("./fireBase");


const app = express();

const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');

const bSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdffafdsfsdgdsgegfegeg';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads/'));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',

}));

dotenv.config();



//-------------------------------------//
//firebase config


async function uploadToFirebase(originalname, buffer ,mimetype) {
    const newPath = Date.now() + '-' + originalname;
    const imageRef = ref(storage, newPath);
    const metadata = {
        contentType: mimetype,
    };
    const snapshot = await uploadBytesResumable(imageRef, buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};

const photosMiddleware = multer({storage:multer.memoryStorage()});

//upload file link route                                       
app.post('/api/uploads',photosMiddleware.array('photos', 100), async(req,res)=>{
    const uploadedFiles = [];
    for (let i=0; i < req.files.length; i++) {
        const file = req.files[i];    //.jpeg , .png etc..s
        const downloadURL = await uploadToFirebase(file.originalname, file.buffer, file.mimetype);
        uploadedFiles.push(downloadURL);
    }
    res.json(uploadedFiles);  //response to frontend //create function to send photo to firebase //map all the photos in firebase
   
} );


function getUserDataFromToken(req) {
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData )=>{
            if(err) throw err;
            resolve(userData);
        });
    })
}

//register route
app.post('/api/register', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password} = req.body;
    try{
        const userInfo = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bSalt),
        });
        res.json(userInfo);
    }catch(err){
        res.status(422).json(err);
    }
});


//login route
app.post('/api/login', async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userInfo = await User.findOne({email});
    if(userInfo){
        const passOk = bcrypt.compareSync(password, userInfo.password);
        if (passOk){
            jwt.sign({email:userInfo.email, id: userInfo._id}, jwtSecret, {}, (err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(userInfo);
            })
        }else {
            res.status(422).json('Wrong Password');
        }
    }else{
        res.json('not found');
    }
});

//authentication
app.get('/api/profile', (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData )=>{
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name,email, _id});
        })
    }else {
        res.json(null);
    }
})

//logout route
app.post('/api/logout', (req,res)=>{
    res.cookie('token', '').json('You are already logout');
});




//place add form route
app.post('/api/places', (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {title, 
           address, 
           photos, 
           description, 
           options, 
           extraInfo,
           checkIn,
           checkOut,
           maxGuest,
           price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData )=>{
        if(err) throw err;
    const placeInfo = await Place.create({
        owner: userData.id, 
        title,
        address,
        photos,
        description,
        options,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price
    });
    res.json(placeInfo);
})
});

//single place routes
app.get('/api/user-places', (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData )=>{
        if(err) throw err;
    const {id} = userData;
    res.json(await Place.find({owner:id}));
})
});

//single place route
app.get('/api/places/:id', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {id} = req.params;
    res.json(await Place.findById(id));
});

//edit place route
app.put('/api/places', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {id,
        title, 
        address, 
        photos, 
        description, 
        options, 
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData )=>{
        if(err) throw err;
        const placeData = await Place.findById(id);
        if(userData.id === placeData.owner.toString()) {
            placeData.set({
                title,
                address,
                photos,
                description,
                options,
                extraInfo,
                checkIn,
                checkOut,
                maxGuest,
                price
            });
            await placeData.save();
            res.json('saved');  
            }
    });       
});

//fetching all the place routes
app.get('/api/places', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    res.json( await Place.find() );
});

//booking route
app.post('/api/booking', async (req,res)=>{
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromToken(req);
    const {place,
           checkIn,
           checkOut,
           numOfGuests,
           name,
           phone,
           price} = req.body;
    Booking.create({
        place,
        checkIn,
        checkOut,
        numOfGuests,
        name,
        phone,
        price,
        user:userData.id,
    }).then((bookings)=>{
        res.json(bookings);
    }).catch((err)=>{
        throw err;
    });
});

//finding placeInfo for the booking route
app.get('/api/booking', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
   const userData = await getUserDataFromToken(req);
   res.json( await Booking.find({user: userData.id}).populate('place'));
})

app.listen(4000,()=>console.log('server running'));


