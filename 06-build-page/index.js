const fs = require('fs')
const { COPYFILE_EXCL } = fs.constants;
const path = require('path')
const folderAssets = path.join(__dirname, 'assets')
const folderDist = path.join(__dirname, 'project-dist')
const folderAssetsDist = path.join(__dirname, 'project-dist', 'assets')

const StyleCssFile = fs.createWriteStream(path.join(folderDist, 'style.css'))
const folderComponents = path.join(__dirname, 'components')

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
})
fs.mkdir(path.join(folderDist, 'assets'), { recursive: true }, (err) => {
    if (err) throw err;
})

fs.readdir(folderAssets, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        const pathFolder = path.join(folderAssets, file.name)
        const pathFolderNew = path.join(folderAssetsDist, file.name)
        fs.mkdir(path.join(folderAssetsDist, file.name), { recursive: true }, (err) => {
            if (err) throw err;
        })
        fs.readdir(pathFolder, { withFileTypes: true }, (err, files) => {
            if (err) throw err;
            for (let file of files) {
                const currentPathFile = path.join(pathFolder, file.name)
                const currentPathFileNew = path.join(pathFolderNew, file.name)
                fs.stat(currentPathFile, (err, stats) => {
                    if (err) throw err;
                    if (stats.isFile()) {
                        fs.copyFile(currentPathFile, currentPathFileNew, (err) => {
                            if (err) throw err;
                        })
                    }
                })
            }
        })
    }
})

const indexHtmlFile = path.join(folderDist, 'index.html');
const rsTemplate = fs.createReadStream(path.join(__dirname, 'template.html'), { encoding: 'utf-8' });

rsTemplate.on('data', (chunk) => {                   // читаем template.html
    data = chunk;                                // здесь инфа из template.html
    const sectionTag = data.match(/{{\w+}}/gm);  // {{...}} x3
    sectionTag.forEach((tag) => {
        const tagTmp = tag.slice(2, -2)
        const tagPath = path.join(folderComponents, `${tagTmp}.html`);
        const rs = fs.createReadStream(path.join(tagPath), { encoding: 'utf-8' })
        rs.on('data', (chunks) => {
            data = data.replace(tag, chunks);
            fs.rm(indexHtmlFile, { recursive: true, force: true }, (err) => {
                if (err) {
                return console.error(err);
                }
                const index = fs.createWriteStream(indexHtmlFile);
                index.write(data);
            });
        })
    })
})

const fileStyleCss = fs.createWriteStream(path.join(folderDist, 'style.css'))
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
                    fileStyleCss.write(data.shift())
                    fileStyleCss.write('\n')
                })
                rs.on('error', (err) => {
                    if (err) throw err;
                })
            }
        }
    }
})