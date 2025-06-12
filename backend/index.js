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
const { executePython } = require("./ExecutePython");
const { executeJava } = require("./ExecuteJava");
const { aiCodeReview } = require('./aiCodeReview');
// const corsOptions = {
//   origin: "https://www.codemaster69.in", // Change to your frontend domain in production
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter); //use the auth router)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //for parsing application/x-www-form-urlencoded
app.use('/problems', problemRoutes);
app.use('/problem-sets', problemSetRoutes);
app.use('/', submissionRoutes); // This exposes /run and /submit endpoints

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
    const {language = "cpp", code, input = "" } = req.body;
    if(code === undefined) {
        return res.status(400).json({ message: 'Code is required' , success: false});
    }
    try{
        const filepath = await generateFile(language, code);
        let output;
        if (language === "cpp") {
            output = await executeCpp(filepath, input);
        } else if (language === "python") {
            output = await executePython(filepath, input);
        } else if (language === "java") {
            output = await executeJava(filepath, input);
        } else {
            return res.status(400).json({ message: 'Language not supported', success: false });
        }
        return res.json({filepath, output: output.output, success: true});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Error executing code', success: false });
    }
});

app.post('/ai-review', async (req, res) => {
  const { code, language, problemTitle, problemDescription } = req.body;
  if (!code || !language || !problemTitle || !problemDescription) {
    return res.status(400).json({ success: false, message: 'Code, language, problemTitle, and problemDescription are required.' });
  }
  try {
    const review = await aiCodeReview(code, language, problemTitle, problemDescription);
    res.json({ success: true, review });
  } catch (err) {
    console.error('AI Review error:', err);
    res.json({ success: false, message: 'AI review failed.' });
  }
});

app.get('/', (req, res) => {   
    res.status(200).json({ message: 'Hello World, good you are running!' });
});
 
app.listen(PORT, '0.0.0.0', () => {   
    console.log(`Server is running on port ${PORT}`);
});

