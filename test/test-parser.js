const Parser = require("../lib/parser");
const {expect} = require("chai");
require("mocha");


describe("Parser should", () => {

	const parser = new Parser();

	it("return Article Name", () => {
		const arrange = "# Main Header\r\n## Header 1 \r\n## Header 2 \n## Header 3";

		const result = parser.getArticleName(arrange);

		expect(result).is.equal("Main Header");
	});

});
