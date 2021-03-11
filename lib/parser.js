const header1 = "# ";
const draft = "[draft]";

class Parser {


    constructor(fs) {
        this.fs = fs;
    }

    splitIntoLines(data) {
        return data.split(/\r?\n/).map(s => s.trimRight());
    }

    getHeaders(lines, headerSign) {
        return lines.filter(s => s.indexOf(headerSign) === 0);
    }

    getArticleName(fileName) {
        const lines = this.splitIntoLines(this.fs.readFile(fileName));
        return this.getHeaders(lines, header1)[0].slice(header1.length).trim();
    }

    filesToArticles(dir) {
        return this.fs.getListOfMDFiles(dir)
            .map(fileName => new Object({fileName: fileName, updated: this.fs.getModificationDate(fileName), articleTitle: this.getArticleName(fileName)}))
            .filter(article => article.articleTitle.indexOf(draft) < 0)
            .sort((a, b) => a.articleTitle.localeCompare(b.articleTitle));
    }

    articlesToContent(articles) {
        return articles.map(article => `- [${article.articleTitle}](${article.fileName})`);
    }

}

module.exports = Parser;