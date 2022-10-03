const { error } = require("./../error/protocols");
const File = require("./file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./../files/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./../files/incorrectSize-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./../files/withoutHeader-invalid.csv";
    const rejection = new Error(error.FILE_HEADERS);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./../files/correctFile-valid.csv";
    const result = await File.csvToJson(filePath);
    const expect = [
      {
        id: 1,
        name: "douglas",
        profession: "dev",
        birthDate: 1995,
      },
      {
        id: 2,
        name: "laura",
        profession: "rh",
        birthDate: 1998,
      },
      {
        id: 3,
        name: "valeria",
        profession: "telemarketing",
        birthDate: 1970,
      },
      {
        id: 4,
        name: "nei",
        profession: "motorista",
        birthDate: 1971,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expect));
  }
})();
