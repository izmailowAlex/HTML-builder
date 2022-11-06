const process = require('process')
const fs = require('fs')
const path = require('path')
const { stdout, stdin } = require('process')

const textFile = fs.createWriteStream(path.join(__dirname, 'text.txt'))

stdout.write('Enter the text please...\n')

stdin.on('data', (data) => {
    if (data.toString() === 'exit') {
        process.exit();
    }
    textFile.write(data, (error) => {
        if (error) {
            throw error;
        }
    })
})

process.on('SIGINT', () => process.exit());
process.on('exit', () => {
    stdout.write('Goodbye');
});