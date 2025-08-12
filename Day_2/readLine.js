const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name: ", (name) => {
    rl.question("What is your num: ", (num) => {
        console.log("Your name is: ", name);
        console.log("Your num is: ", num);
        rl.close();
    });
});
