import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { fileHandler, savingData } from '../Day_3/utils/fileHandler.js';
import { validateEmail } from '../Day_3/utils/validator.js';

yargs(hideBin(process.argv))
    .command({
    command: 'add',
    describe:'menambahkan data baru',
    builder: {
        name: {
            describe: 'Nama',
            demandOption: true,
            type: 'string'
        },
        mobile: {
            describe: 'Nomor telepon',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Alamat email',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        let data = fileHandler.readFileArray('./data/data.json');
        const contact = {
            name: argv.name,
            mobile: argv.mobile,
            email: argv.email
        };
        if (data.find(contact => contact.email === argv.email)) {
            console.error(`Email, "${argv.email}" sudah ada, coba email lain.`);
        } else {
            savingData('./data/data.json', contact);
            console.log(contact);
        }
    }
})
    .command({
    command: 'list',
    describe: 'Menampilkan semua data',
    handler() {
        let data = fileHandler.readFileArray('./data/data.json');
        if (data.length === 0) {
            console.log('Tidak ada data yang tersedia.');
        } else {
            console.log(data);
        }
    }
})
    .command({
        command: 'detail',
        describe: 'Menampilkan detail data',
        handler(argv) {
            let data = fileHandler.readFileArray('./data/data.json');
            const contact = data.find(contact => contact.email === argv.email);
            if (contact) {
                console.log(contact);
            } else {
                console.log('Data yang Kamu cari tidak ada, coba cari email lain.');
            }
         }
    })
    .command({
        command: 'delete',
        describe: 'Menghapus data',
        builder: {
            name: {
                describe: 'Email yang akan dihapus',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            let data = fileHandler.readFile('./data/data.json');
            data = data.filter(contact => contact.email !== argv.email);
            savingData('./data/data.json', data);
            console.log(`Data dengan email ${argv.email} telah dihapus.`);
        }
    })
    .command({
        command: 'update',
        describe: 'update data',
        builder: {
            name: {
                describe: 'Nama',
                demandOption: false,
                type: 'string'
            },
            mobile: {
                describe: 'Nomor telepon',
                demandOption: false,
                type: 'string'
            },
            email: {
                describe: 'Alamat email',
                demandOption: false,
                type: 'string'
            }
        },
        handler(argv) {
          const newData = fileHandler.readFileArray('./data/data.json');
          const index = newData.findIndex(contact => contact.email === argv.email);
          console.log(index)
          if (index === -1) {
            console.log('data not found');  
          } 
            if (argv.mobile) {newData[index].mobile = argv.mobile;}
            console.log(argv.mobile, argv.email)
            if (argv.email) {newData[index].email = argv.email;}


          if (argv.email && !validateEmail(argv.email)) {
              return console.error('Email tidak valid');
          }

          fileHandler.writeFile('./data/data.json', newData);
        }
    })
.parse()

