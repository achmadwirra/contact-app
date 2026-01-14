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

const loadContact = () => {
    const file = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(file);
};

const simpanContact = (nama, email, noHP) => {
    const contacts = loadContact();

    // cek duplikat
    const duplikat = contacts.find((c) => c.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
        return false;
    }

    // cek email
    if (email && !validator.isEmail(email)) {
        console.log(chalk.red.inverse.bold('Email tidak valid!'));
        return false;
    }

    // cek no HP
    if (!validator.isMobilePhone(noHP, 'id-ID')) {
        console.log(chalk.red.inverse.bold('No HP tidak valid!'));
        return false;
    }

    const contact = { nama, email, noHP };
    contacts.push(contact);

    fs.writeFileSync(
        dataPath,
        JSON.stringify(contacts, null, 2)
    );

    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data'));
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('Daftar Kontak'));
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
);

if(!contact){
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
}

    console.log(chalk.cyan.inverse.bold('Detail Kontak'));
    console.log(`Nama  : ${contact.nama}`);
    console.log(`Email : ${contact.email || '-'}`);
    console.log(`No HP : ${contact.noHP}`);

};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
    }
     fs.writeFileSync(
        dataPath,
        JSON.stringify(newContacts, null, 2)
    );

    console.log(chalk.green.inverse.bold(`Contact ${nama} berhasil dihapus`));
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
