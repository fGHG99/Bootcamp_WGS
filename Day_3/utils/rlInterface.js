const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (ask) => {
    return new Promise((resolve) => {
        const askAgain = () => {
            rl.question(ask, (answer) => {
                if (validator.isEmpty(answer)) {
                    console.error("Answer cannot be empty. Please try again.");
                    askAgain();
                } else {
                    resolve(answer);
                }
            });
        }
        askAgain();
    });
}

module.exports = {
    question, rl
};
