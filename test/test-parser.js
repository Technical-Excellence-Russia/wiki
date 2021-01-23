const Parser = require("../lib/parser");

class FS {

    constructor(content) {
        this.content = content;
    }

    getListOfMDFiles() {
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

    test("return Article Name", () => {
        const result = parser.getArticleName("fileThree.md");

        expect(result).toEqual("Other Article");
    });

    test("return table of contents", () => {
        const result = parser.filesToContent(".");

        expect(result).toHaveLength(2);
    });

});
