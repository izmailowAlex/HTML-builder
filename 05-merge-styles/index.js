const fs = require('fs')
const { dirname } = require('path')
const path = require('path')
const fileBundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
const pathFolderStyles = path.join(__dirname, 'styles')

fs.readdir(pathFolderStyles, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        if (file.isFile()) {
            const pathToFile = path.join(__dirname, 'styles', file.name)
            if (path.basename(pathToFile).split('.').slice(1).join() === 'css') {
                const rs = fs.createReadStream(pathToFile, 'utf-8')
                let data = [];
                rs.on('data', function(chunk) {
                    data.push(chunk)
                })
                rs.on('end', () => {
                    fileBundle.write(data.shift())
                    fileBundle.write('\n')
                })
                rs.on('error', (err) => {
                    if (err) throw err;
                })
            }
        }
    }
})