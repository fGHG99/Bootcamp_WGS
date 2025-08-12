const validator = require('validator');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question("What is your name: ", (name) => {
   function AskPhone() {
       rl.question("What is your num: ", (num) => {
           if (!validator.isMobilePhone(num, 'id-ID')) {
               console.error("Please enter a valid number.");
               AskPhone();
           } else {
               function AskEmail() {
                   rl.question("What is your email: ", (email) => {
                       if (!validator.isEmail(email)) {
                           console.error("Please enter a valid email.");
                           AskEmail();
                       } else {
                           console.log("Your name is: ", name);
                           console.log("Your num is: ", num);
                           console.log("Your email is: ", email);
                           rl.close();
                       }
                   });
               }
               AskEmail();
           }
       });
   }
   AskPhone();
});

