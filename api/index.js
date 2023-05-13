const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    getStorage
} = require("firebase/storage"); // Update the import statement
const dbConfig = require('./config/dbConfig');

const authenticateUser = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const placeRoutes = require('./routes/placeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Update the import statement for storage
const storage = require("./config/fireBase");

const app = express();
dbConfig();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

dotenv.config();
app.use('/api', authRoutes);
app.use('/api', placeRoutes);
app.use('/api/booking', authenticateUser, bookingRoutes);



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


app.listen(4000, () => console.log('server running'));