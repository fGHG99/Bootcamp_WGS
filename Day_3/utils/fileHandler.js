import fs from 'fs'
const dirpath = './data';

const fileHandler = {
    readFile(loc) {
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath)
        }
        if (!fs.existsSync(loc)) {
            fs.writeFileSync(loc, "[]");
            console.log("File not found, created a new file at ", loc);
        }

        return fs.readFileSync(loc, "utf-8");
    },
    writeFile (loc, data) {
        if (!loc) {
            console.log("the file is null");
        }
        fs.writeFileSync(loc, JSON.stringify(data, null, 2));
    },
    readFileArray(loc) {
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath)
        }
        if (!fs.existsSync(loc)) {
            fs.writeFileSync(loc, "[]");
            console.log("File not found, created a new file at ", loc);
        }

        const content = fs.readFileSync(loc, "utf-8");
        return JSON.parse(content);
    },
}

const savingData = (filePath, data) => {
    const file = fileHandler.readFile(filePath);
    const jsonData = JSON.parse(file);
    jsonData.push(data);
    fileHandler.writeFile(filePath, jsonData);
    console.log("Data saved successfully");
}

const updateData = (path, data) => {
    fileHandler.writeFile(path, data);
    console.log('data updated')
}

export { savingData, fileHandler, updateData };