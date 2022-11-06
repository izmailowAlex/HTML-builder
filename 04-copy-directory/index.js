const fs = require('fs')
const path = require('path')
const folderFiles = path.join(__dirname, 'files')
const folderFilesCopy = path.join(__dirname, 'files-copy')

const copyDir = function() {
    fs.rm(folderFilesCopy, { recursive: true, force: true }, (err) => {
        if (err) throw err;

        fs.mkdir(folderFilesCopy, { recursive: true }, (err) => {
            if (err) throw err;
        })
        fs.readdir(folderFiles, { withFileTypes: true }, (err, files) => {
            if (err) throw err;
            for (let file of files) {
                const filePath = path.join(folderFiles, file.name)
                const filePathNew = path.join(folderFilesCopy, file.name)
    
                if (file.isFile()) {
                    fs.copyFile(filePath, filePathNew, (err) => {
                        if (err) throw err;
                    })
                }
            }
        })
    })
}

copyDir()