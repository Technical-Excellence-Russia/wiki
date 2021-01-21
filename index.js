const fs = require("./lib/fs");
const Logger = require("./lib/logger");

const rootFileName = __dirname + "/" + "README.md";
const EOL = "\r\n";

const logger = new Logger();
logger.info("File spellchecking and generation:");

let readMeContents = [];
readMeContents.push("# Wiki");
readMeContents.push("");
readMeContents.push("Подборка материалов по техническому совершенству.");
readMeContents.push("");
readMeContents.push("## Оглавление");
readMeContents.push("");
readMeContents = readMeContents.concat(fs.getListOfMDFiles(__dirname).map(filename => `- [${filename.split(".")[0]}](${filename})`));
readMeContents.push("");
readMeContents.push("Copyright (c) 2021 Technical Excellence Russia");

let startTime = new Date().getTime();
fs.writeFileContent(rootFileName, readMeContents.join(EOL))
    .then(() => logger.infoFile(rootFileName, startTime))
    .catch(e => logger.error(e));

