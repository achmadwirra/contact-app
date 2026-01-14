const { type } = require('node:os');
const { argv } = require('node:process');
const yargs = require('yargs');
const contacts = require('./contacts');
// const { simpanContact } = require('./contacts');

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: "Email",
            demandOption: true,
            type: 'string',
        },
        noHP: {
            describe: "Nomor HP",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    },
}).demandCommand();

// menampilkan daftar semua nama & no contact
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no HP contact',
    handler(){
        contacts.listContact();
    },
});

//menampilkan detail sebuah contact
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah contact berdasarkan nama',
    builder :{
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});

//menghapus berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus sebuah contact berdasarkan nama',
    builder :{
        nama: {
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();






// mengambil argument dari command line
// const command = process.argv[2];

// if(command === 'add') {

// } else if( command === 'remove') {

// } else if(command === 'list'){

// };






















// const contacts = require('./contacts');

// const main = async () => {
//     const nama = await contacts.tulisPertanyaan('Masukkan nama anda :');
//     const email = await contacts.tulisPertanyaan('Masukkan email anda :');
//     const noHP = await contacts.tulisPertanyaan('Masukkan no HP anda :');

//      contacts.simpanContact(nama, email, noHP)
// };


// main();


// rl.question('Masukan nama anda ', (nama) => {
//     rl.question('Masukkan No HP anda ', (noHP) => {
//         const contact = { nama, noHP };

//         const file = fs.readFileSync('data/contacts.json', 'utf-8');
//         const contacts = JSON.parse(file);

//         contacts.push(contact);

//         fs.writeFileSync(
//             'data/contacts.json',
//             JSON.stringify(contacts, null, 2)
//         );

//         console.log('Terimakasih');
//         rl.close();
//     });
// });
