const validator = require('validator');
const { question, rl } = require('./utils/rlInterface');
const { savingData } = require('./utils/fileHandler')

const main = async () => {
    const name = await question('What is your name? ');  
   
    let mobile;
    let email;

    do {
        mobile = await question('What is your mobile number? ');
        if (!validator.isMobilePhone(mobile, 'id-ID')) {
            console.error("Please enter a valid mobile number.");
        }
    } while (!validator.isMobilePhone(mobile, 'id-ID'));

    do {
        email = await question('What is your email address? ');
        if (!validator.isEmail(email)) {
            console.error("Please enter a valid email address.");
        }
    } while (!validator.isEmail(email));
    
     const data = {
        name,
        mobile,
        email
    }
   
    savingData('./data/data.json', data);
    console.log("Data saved successfully");
    rl.close()
}

main();