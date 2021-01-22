const Parser = require("../lib/parser");
const {expect} = require("chai");
require("mocha");

class FS {

    constructor(content) {
        this.content = content;
    }

    getListOfMDFiles(dirName) {
        return Object.keys(this.content);
    }

    readFile(fileName) {
        return this.content[fileName];
    }

}


describe("Parser should", () => {

    const fs = new FS({
            "fileOne.md": "# Complete Article\r\nSome Content",
            "fileTwo.md": "# Incomplete Article [draft]\r\nSome Content",
            "fileThree.md": "# Other Article\r\nSome Content"
        }
    );
    const parser = new Parser(fs);

    it("return Article Name", () => {
        const result = parser.getArticleName("fileThree.md");

        expect(result).is.equal("Other Article");
    });

    it("return table of contents", () => {
        const result = parser.filesToContent(".");

        expect(result).has.length(2);
    });

});
