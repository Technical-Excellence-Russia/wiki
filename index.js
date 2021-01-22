const FS = require("./lib/fs");
const Parser = require("./lib/parser");
const Logger = require("./lib/logger");

const fs = new FS();
const parser = new Parser(fs);
const logger = new Logger();

const rootFileName = __dirname + "/" + "README.md";
const EOL = "\r\n";

logger.info("File spellchecking and generation:");


let readMeContents = [];
readMeContents.push("# Wiki");
readMeContents.push("");

readMeContents.push("Подборка материалов по техническому совершенству.");
readMeContents.push("");

readMeContents.push("## Оглавление");
readMeContents.push("");

readMeContents = readMeContents.concat(parser.filesToContent(__dirname));
readMeContents.push("");

readMeContents.push("Остались вопросы? Задавай в [нашем чате](https://t.me/technicalexcellenceru).");
readMeContents.push("");

readMeContents.push("Copyright (c) 2021 Technical Excellence Russia");
readMeContents.push("");

let startTime = new Date().getTime();
fs.writeFileContent(rootFileName, readMeContents.join(EOL))
    .then(() => logger.infoFile(rootFileName, startTime))
    .catch(e => logger.error(e));

