import readLine from 'readline';
import validator from 'validator';

const rl = readLine.createInterface({
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

const closeReadLine = () => {
    rl.close();
}

export {
    question, closeReadLine
};
