const header1 = "# ";

class Parser {

	splitIntoLines(data) {
		return data.split(/\r?\n/).map(s => s.trimRight());
	}

	getHeaders(lines, headerSign) {
		return lines.filter(s => s.indexOf(headerSign) === 0);
	}

	getArticleName(data) {
		const lines = this.splitIntoLines(data);
		return this.getHeaders(lines, header1)[0].slice(header1.length).trim();
	}

}

module.exports = Parser;