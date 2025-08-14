import { closeReadLine, question } from './utils/rlInterface.js';
import { savingData } from './utils/fileHandler.js';
import { validatePhone, validateEmail } from './utils/validator.js';

const main = async () => {
    const name = await question('What is your name? ');  
 
    let mobile;
    let email;
    do {
        mobile = await question('What is your mobile number? ');
        if (!validatePhone(mobile)) {
            console.error("Please enter a valid mobile number.");
        }
    } while (!validatePhone(mobile));

    do {
        email = await question('What is your email address? ');
        if (!validateEmail(email)) {
            console.error("Please enter a valid email address.");
        }
    } while (!validateEmail(email));

     const data = {
        name,
        mobile,
        email
    }
   
    savingData('./data/data.json', data);
    closeReadLine();
}

main();