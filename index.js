const FS = require("./lib/fs");
const Parser = require("./lib/parser");
const Logger = require("./lib/logger");
const Mustache = require("mustache");

const fs = new FS();
const parser = new Parser(fs);
const logger = new Logger();

const rootFileName = __dirname + "/" + "README.md";
const templateFileName = __dirname + "/" + "README.template";

logger.info("File generation:");

const data = {
    currentYear: new Date().getFullYear(),
    articles: parser.filesToContent(__dirname)
}

const template = fs.readFile(templateFileName);

let startTime = new Date().getTime();
const content = Mustache.render(template, data);
fs.writeFileContent(rootFileName, content)
    .then(() => logger.infoFile(rootFileName, startTime))
    .catch(e => logger.error(e));

