const { exec } = require('child_process');
const { error } = require('console');

const fs = require('fs');
const path = require('path');
const { stderr } = require('process');

const outputPath = path.join(__dirname, 'output');

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// const executeCpp = (filePath) => {
//     const jobId = path.basename(filePath).split('.')[0];
//     const outPath = path.join(outputPath, `${jobId}.exe`);

//     return new Promise((resolve, reject) => {
//         exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath}  && ./${jobId}.exe`,
//             (error, stdout, stderr) => {
//                 if (error) {
//                     console.error(`Error: ${error.message}`);
//                     return reject({ error: error.message });
//                 }
//                 if (stderr) {
//                     console.error(`stderr: ${stderr}`);
//                     return reject({ error: stderr });
//                 }
//                 // console.log(`stdout: ${stdout}`);
//                 return resolve(stdout);
//             }
//         );
//     });
// }

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        //For Windows: run the .exe directly, no './'
        exec(`g++ "${filePath}" -o "${outPath}" && "${outPath}"`,
            (error, stdout, stderr) => {
                error && reject({ error: error.message });
                stderr && reject({ error: stderr });
                resolve(stdout);
            }
        );
    });
}

module.exports = {
    executeCpp,
}