//coursesディレクトリの中のmdファイルをhtmlファイルに変換し、docsディレクトリにコピーする。
"use strict";

const fs = require("fs")
const path = require("path")

const marked = require("marked")
const jsdom = require("jsdom");
const hljs = require("highlight.js");
const { JSDOM } = jsdom;

const inputRootPath = "./courses"
const outputRootPath = "./docs"
const templatePath = "./template.html"
const cssPath = "./style.css"

const courseNames = fs.readdirSync(inputRootPath)
const template = fs.readFileSync(templatePath, "utf-8")

fs.copyFileSync(cssPath, path.join(outputRootPath, "style.css"))

marked.setOptions({
    langPrefix: '',
    highlight(code, lang) {
    return hljs.highlightAuto(code, [lang]).value
    }
});

for(let courseName of courseNames){
    const inputCoursePath = path.join(inputRootPath, courseName)
    const outputCoursePath = path.join(outputRootPath, courseName)

    if (!fs.existsSync(outputCoursePath)){
        fs.mkdirSync(outputCoursePath)
    }

    const articleNames = fs.readdirSync(inputCoursePath)

    for(let articleName of articleNames){
        const inputArticlePath = path.join(inputCoursePath, articleName)
        const articleNameStem = articleName.slice(0, -3)
        const outputArticlePath = path.join(outputCoursePath, articleNameStem+'.html')

        const inputArticleContent = fs.readFileSync(inputArticlePath, 'utf-8')
        const outputArticleContent = marked(inputArticleContent)

        const dom = new JSDOM(template)

        dom.window.document.body.innerHTML = outputArticleContent
        const articleTitle = dom.window.document.getElementsByTagName('h1')[0].textContent
        dom.window.document.title = articleTitle

        fs.writeFileSync(outputArticlePath, dom.serialize())
    }
}