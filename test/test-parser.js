const Parser = require("../lib/parser")

class FS {

    constructor(content) {
        this.content = content
    }

    getListOfMDFiles() {
        return this.content.map((it) => it.fileName)
    }

    getModificationDate(fileName) {
        return this.content.filter((it) => fileName.indexOf(it.fileName) >= 0)[0].modificationDate
    }

    readFile(fileName) {
        return this.content.filter((it) => fileName.indexOf(it.fileName) >= 0)[0].content
    }

}


describe("Parser should", () => {

    const fs = new FS([
            {
                fileName: "fileOne.md",
                content: "# Complete Article\r\nSome Content",
                modificationDate: "2008-10-25"
            },
            {
                fileName: "fileTwo.md",
                content: "# Incomplete Article [draft]\r\nSome Content",
                modificationDate: "2008-10-26"
            },
            {
                fileName: "fileThree.md",
                content: "# Other Article\r\nSome Content",
                modificationDate: "2008-12-25"
            }
        ]
    )
    const parser = new Parser(fs);

    test("return Article Name", () => {
        const result = parser.getArticleName("fileThree.md")

        expect(result).toEqual("Other Article")
    });

    test("return table of contents", () => {
        const result = parser.articlesToContent(parser.filesToArticles("."))

        expect(result).toHaveLength(2)
    });

});
