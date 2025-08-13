const fs = require('fs')

const fileHandler = {
    readFile: (loc) => {
        if (!loc) {
            console.error("the file is null")
        }

        if (!fs.existsSync(loc)) {
            fs.writeFileSync(loc, "[]");
        }

        return fs.readFileSync(loc, "utf-8");
    },
    writeFile: (loc, data) => {
        if (!loc) {
            console.error("the file is null");
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

module.exports = { savingData };
