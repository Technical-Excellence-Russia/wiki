const FS = require("./lib/fs")
const Parser = require("./lib/parser")
const Logger = require("./lib/logger")
const Mustache = require("mustache")
const {SitemapStream, streamToPromise} = require("sitemap")
const {Readable} = require("stream")

const fs = new FS()
const parser = new Parser(fs)
const logger = new Logger()

const url = "https://technical-excellence.ru/wiki"
const rootFileName = __dirname + "/docs/" + "README.md"
const sitemapFileName = __dirname + "/docs/" + "sitemap.xml"


logger.info("File generation:")
const articles = parser.filesToArticles(__dirname + "/docs")

const data = {
    currentYear: new Date().getFullYear(),
    articles: parser.articlesToContent(articles)
}

// Generate README.md
const template = fs.readFile(rootFileName + ".template")
let startTime = new Date().getTime()
const content = Mustache.render(template, data)
fs.writeFileContent(rootFileName, content).then(() => logger.infoFile(rootFileName, startTime)).catch(e => logger.error(e))

//Generate sitemap.xml
const links = articles.map((a) => new Object({
    url: url + "/" + a.fileName.replace(".md", ".html"),
    lastmod: a.updated,
    changefreq: "monthly"
}));
startTime = new Date().getTime()
streamToPromise(Readable.from(links).pipe(new SitemapStream({hostname: url}))).then((content) =>
    fs.writeFileContent(sitemapFileName, content).then(() => logger.infoFile(sitemapFileName, startTime)).catch(e => logger.error(e))
)
