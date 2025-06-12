const { exec } = require("child_process");

const executePython = (filepath, input = "") => {
  return new Promise((resolve, reject) => {
    const process = exec(`python "${filepath}"`, (error, stdout, stderr) => {
      if (process.timedOut) return resolve({ output: "Time Limit Exceeded (4s)" });
      if (error) return resolve({ output: stderr || error.message });
      resolve({ output: stdout });
    });
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      process.timedOut = true;
      process.kill();
    }, 4000);
    if (input) {
      process.stdin.write(input);
    }
    process.stdin.end();
    process.on('close', () => clearTimeout(timer));
  });
};

module.exports = { executePython };