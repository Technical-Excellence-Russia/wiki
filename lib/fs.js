const fs = require("fs");
const extension = ".md";

class FS {

	getListOfMDFiles(directory) {
		return fs.readdirSync(directory).filter(f => f.indexOf(extension) >= 0 && f.indexOf("README") < 0);
	}

	getModificationDate(fileName) {
		return fs.statSync(fileName).mtime.toISOString();
	}

	readFile(fileName) {
		return fs.readFileSync(fileName, "utf8");
	}

	writeFileContent(fileName, data) {
		return new Promise((resolve, reject) => {
			fs.writeFile(fileName, data, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

}

module.exports = FS;