const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

// Accepts a file path, not code string
const executeJava = (filepath, input = "") => {
  return new Promise((resolve, reject) => {
    const dir = path.join(__dirname, "codes", uuid());
    fs.mkdirSync(dir, { recursive: true });
    // Copy the file as Main.java
    const javaFile = path.join(dir, "Main.java");
    fs.copyFileSync(filepath, javaFile);

    const compile = exec(`javac Main.java`, { cwd: dir }, (compileErr, _, compileStderr) => {
      if (compileErr) {
        fs.rmSync(dir, { recursive: true, force: true });
        return resolve({ output: compileStderr || compileErr.message });
      }
      const run = exec(`java Main`, { cwd: dir }, (error, stdout, stderr) => {
        clearTimeout(timer);
        fs.rmSync(dir, { recursive: true, force: true });
        if (run.timedOut) return resolve({ output: "Time Limit Exceeded (4s)" });
        if (error) return resolve({ output: stderr || error.message });
        resolve({ output: stdout });
      });
      run.timedOut = false;
      if (input) {
        run.stdin.write(input);
      }
      run.stdin.end();
      var timer = setTimeout(() => {
        run.timedOut = true;
        run.kill();
      }, 4000);
    });
  });
};

module.exports = { executeJava };