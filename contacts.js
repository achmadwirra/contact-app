const { rejects } = require('node:assert');
const { resolve } = require('node:dns');
const fs = require('node:fs');
const chalk = require('chalk');
const validator = require('validator');


const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const simpanContact = (nama, email, noHP) => {
    const contact = { nama, email, noHP };

        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);

        // cek duplikat
        const duplikat = contacts.find((contact) => contact.nama === nama);
        if(duplikat) {
            console.log(chalk.red.inverse.bold('contact sudah terdaftar, gunakan nama lain!'));
            return false;
        }

        //cek email
        if(email) {
            if(!validator.isEmail(email)) {
                console.log(chalk.red.inverse.bold('Email tidak valid!'));
                return false;
            }
        //cek email
            if(!validator.isMobilePhone(noHP, 'id-ID')) {
                console.log(chalk.red.inverse.bold('No HP tidak valid!'));
                return false;
            }

        }

        contacts.push(contact);

        fs.writeFileSync(
            'data/contacts.json',
            JSON.stringify(contacts, null, 2)
        );

        console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data'));
        
        
};

module.exports = { simpanContact };