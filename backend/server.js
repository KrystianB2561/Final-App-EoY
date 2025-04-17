const express = require('express'); //Imports dependency for express JS to be used for backend
const mongoose = require('mongoose'); //Required to establish connection with MongoDB Atlas Database
const bcrypt = require('bcrypt'); // Will be used to hash login passwords
const cors = require('cors'); //Allows to run frontend at port 3000 and backend at port 5000 so it doesn't run on the same port
const bodyParser = require('body-parser'); //Parses data sent through forms to the backend & database
require('dotenv').config(); //refers to the .env file where we have set our MONGODB URI and also the port number

//Initialise App
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));


//User Schema - Defines the document for the MongoDB database when registering users
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//Job Schema - Defines the document for MongoDB database when client's post jobs.
const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    salary: Number,
  });

const User = mongoose.model('User', userSchema); // Connects the schema to the collection within the MongoDB database
const Job = mongoose.model('Job', jobSchema);

//Registration of User
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    //Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists'});
    }

    //Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser= new User({ username, password: hashedPassword }); //Inserted into the MongoDB database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
});

//Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    //Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: 'User not found '});
    }

    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
});

app.post('/post-job', async (req, res) => {
    const { title, description, salary} = req.body; //Will pass over title, description and salary to MongoDB database when a project is posted.
  
    const newJob = new Job({ title, description, salary });
    await newJob.save();
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
  });

app.get('/view-jobs', async (req, res) => {
    const jobs = await Job.find(); //GET method used to retrieve projects posted.
    res.status(200).json({ jobs });
});
  

//Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});