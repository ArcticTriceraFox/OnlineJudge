const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'output');

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, input = "") => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);

    return new Promise((resolve, reject) => {
        // Compile first
        const compile = spawn('g++', [filePath, '-o', outPath]);
        let compileError = '';
        compile.stderr.on('data', (data) => {
            compileError += data.toString();
        });
        compile.on('close', (code) => {
            if (code !== 0) {
                return resolve({ output: compileError });
            }
            // Run the executable with timeout
            const run = spawn(outPath);
            let stdout = '';
            let stderr = '';
            let timedOut = false;
            const timer = setTimeout(() => {
                timedOut = true;
                run.kill();
            }, 4000);
            if (input) {
                run.stdin.write(input);
            }
            run.stdin.end();
            run.stdout.on('data', (data) => {
                stdout += data.toString();
            });
            run.stderr.on('data', (data) => {
                stderr += data.toString();
            });
            run.on('close', (code) => {
                clearTimeout(timer);
                if (timedOut) {
                    return resolve({ output: 'Time Limit Exceeded (4s)' });
                }
                if (code !== 0) {
                    return resolve({ output: stderr || 'Runtime Error' });
                }
                resolve({ output: stdout });
            });
        });
    });
}

module.exports = {
    executeCpp,
}