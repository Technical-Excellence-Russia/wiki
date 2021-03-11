const Parser = require("../lib/parser");

class FS {

    constructor(content) {
        this.content = content;
    }

    getListOfMDFiles() {
        return Object.keys(this.content);
    }

    getModificationDate(fileName) {
        return this.content[fileName].modificationDate
    }

    readFile(fileName) {
        return this.content[fileName].content;
    }

}


describe("Parser should", () => {

    const fs = new FS({
            "fileOne.md": {content: "# Complete Article\r\nSome Content", modificationDate: "2008-10-25"},
            "fileTwo.md": {content: "# Incomplete Article [draft]\r\nSome Content", modificationDate: "2008-10-26"},
            "fileThree.md": {content: "# Other Article\r\nSome Content", modificationDate: "2008-12-25"}
        }
    );
    const parser = new Parser(fs);

    test("return Article Name", () => {
        const result = parser.getArticleName("fileThree.md");

        expect(result).toEqual("Other Article");
    });

    test("return table of contents", () => {
        const result = parser.articlesToContent(parser.filesToArticles("."));

        expect(result).toHaveLength(2);
    });

});
