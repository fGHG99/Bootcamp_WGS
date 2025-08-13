const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (ask) => {
    return new Promise((resolve, reject) => {
        rl.question(ask, (answer) => {
            if (validator.isEmpty(answer)) {
                reject(new Error('Invalid input'));
            } else {
                resolve(answer);
            }
        });
    });
}

module.exports = {
    question, rl
};
