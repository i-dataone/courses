let fs = require('fs-extra');
let path = require('path');
let marked = require('marked');
const { UV_FS_O_FILEMAP } = require('constants');

createHTMLFiles();

function createHTMLFiles() {
    let articlesFiles = fs.readdirSync('../').filter(RegExp.prototype.test, /^introduction/);
    for (let i = 0; i < articlesFiles.length; i++){
        //記事ファイルの作成
        articlesFilesName = articlesFiles[i];
        fs.mkdir(`./docs/${articlesFilesName}`, { recursive: true }, (err) => {
            if (err) throw err;
        });

        //HTML変換
        let EachFile = fs.readdirSync(`../${articlesFiles[i]}`);
        const charset = 'utf-8';
        for(let j = 0; j < EachFile.length; j++) {
            let eachFileName = EachFile[j].split('.').slice(0, -1).join('.');

            fs.mkdirsSync(`../docs/${articlesFilesName}/${eachFileName}`, { recursive: true }, (err) => {
                if (err) throw err;
            });
            
            let eachFileContent = fs.readFileSync(`../${articlesFiles[i]}/${EachFile[j]}`, 'utf-8');
            let changeToHTML = marked(eachFileContent);


            //CSSがあるか
            // if(fs.stat(`../docs/${articlesFilesName}/${eachFileName}`)){
            //     console.log(`${eachFileName}.cssはすでに存在します`);
            // } else {
            //     const streamCSS = fs.createWriteStream(`../docs/${articlesFilesName}/${eachFileName}/${eachFileName}.css`);
            //     streamCSS.write('', charset);
            // }            

            const streamHTML = fs.createWriteStream(`../docs/${articlesFilesName}/${eachFileName}/${eachFileName}.html`);
            

            streamHTML.write(`<head><title>${eachFileName}</title><link rel="./server/css/index.css"></head>\n`, charset)
            streamHTML.write(changeToHTML, charset);

        }
    }
}