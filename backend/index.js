const express  = require('express');
const app = express();
require('dotenv').config();
const {DBconnection} = require('./databse/db');
const mongoose = require('mongoose');
const user = require('./Models/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const { generateFile } = require('./generateFile');
DBconnection();
const { executeCpp } = require('./ExecuteCpp');
const PORT = process.env.PORT || 8080;
const problemRoutes = require('./Routes/problemRoutes');
const problemSetRoutes = require('./Routes/problemSetRoutes');
const submissionRoutes = require('./Routes/submissionRoutes');

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter); //use the auth router)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //for parsing application/x-www-form-urlencoded
app.use('/problems', problemRoutes);
app.use('/problem-sets', problemSetRoutes);
// app.use('/submit', submissionRoutes); // This will make the endpoint POST /submit
// app.use('/', submissionRoutes); // This exposes /run and /submit endpoints

// app.post("/register", async (req, res) => {  
//     const { firstName, lastName, email, password } = req.body; //get all the data from the request body

//     if (!firstName || !lastName || !email || !password) { //check if all fields are present
//         return res.status(400).json({ message: 'All fields are required' });
//     }
//     //check if user exists (add more validation urself)
//     const existingUser = await user.findOne({ email });
//     if(existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//     } 

//     //hasing the password
// });

app.get('/ping', (req, res) => {   
    res.status(200).json({ message: 'pong' });
});

app.post('/run', async (req, res) => {   
    // console.log(req.body);
    const {language = "cpp", code } = req.body;
    if(code === undefined) {
        return res.status(400).json({ message: 'Code is required' , success: false});
    }
    //generate c++, send response back
    try{
    const filepath = await generateFile(language, code);
    //run
    const output = await executeCpp(filepath);
    return res.json({filepath, output, success: true});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Error executing code', success: false });
    }
});

app.get('/', (req, res) => {   
    res.status(200).json({ message: 'Hello World, good you are running!' });
});
 
app.listen(PORT, () => {   
    console.log(`Server is running on port ${PORT}`);
}); 

