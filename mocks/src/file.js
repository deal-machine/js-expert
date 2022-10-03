const { readFile } = require("fs/promises");
const User = require("./user");
const { error } = require("./../error/protocols");

const DEFAULT_OPTIONS = {
  maxLines: 5,
  fields: ["id", "name", "profession", "age"],
};

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);

    const validation = File.isValid(content);
    if (!validation.valid) {
      throw new Error(validation.error);
    }
    const users = File.parseCSVtoJSON(content);

    return users;
  }

  static async getFileContent(filePath) {
    // const filename = join(__dirname, filePath);
    return (await readFile(filePath)).toString("utf-8");
  }

  static isValid(csvContent, options = DEFAULT_OPTIONS) {
    const [header, ...lines] = csvContent.split("\n");

    const isHeaderValid = header === options.fields.join(",");
    if (!isHeaderValid) {
      return {
        error: error.FILE_HEADERS,
        valid: false,
      };
    }

    const isContentLengthAcceptable =
      lines.length > 0 && lines.length <= options.maxLines;
    if (!isContentLengthAcceptable) {
      return {
        error: error.FILE_LENGTH,
        valid: false,
      };
    }

    return { lines, valid: true };
  }

  static parseCSVtoJSON(csvString) {
    const lines = csvString.split("\n");
    const firstLine = lines.shift();
    const header = firstLine.split(",");
    const users = lines.map((line) => {
      const columns = line.split(",");
      let user = {};
      for (const index in columns) {
        user[header[index]] = columns[index];
      }
      return new User(user);
    });
    return users;
  }
}

module.exports = File;
