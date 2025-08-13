const fs = require('fs')

const fileHandler = {
    readFile: (loc) => {
        if (!fs.existsSync(loc)) {
            fs.writeFileSync(loc, "[]");
            console.log("File not found, created a new file at ", loc);
        }

        return fs.readFileSync(loc, "utf-8");
    },
    writeFile: (loc, data) => {
        if (!loc) {
            console.log("the file is null");
            return;
        }
        fs.writeFileSync(loc, JSON.stringify(data, null, 2));
    }
}

const savingData = (filePath, data) => {
    const file = fileHandler.readFile(filePath);
    const jsonData = JSON.parse(file);
    jsonData.push(data);
    fileHandler.writeFile(filePath, jsonData);
}

module.exports = { savingData, fileHandler };
