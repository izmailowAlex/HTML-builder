const path = require('path')
const fs = require('fs')
const pathSecretFolder = path.join(__dirname, 'secret-folder')

fs.readdir(pathSecretFolder, (err, files) => {
    if (err) throw err;
    
    for (let item of files) {
        const pathFile = path.join(__dirname, 'secret-folder', item)
        fs.stat(pathFile, (err, stats) => {
            if (err) throw err;
            if (stats.isFile()) {
                const itemName = item.split('.').splice(0, 1).join()
                const itemExt = item.split('.').slice(1).join()
                const itemSize = stats.size / 1024
                console.log(`${itemName} - ${itemExt} - ${itemSize}kb`)
            }
        })
    }
})