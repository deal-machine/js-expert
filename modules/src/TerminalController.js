import readline from "readline";
import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import { Person } from "./models/Person.js";

export class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  init(database, language) {
    DraftLog(console).addLineListener(process.stdin);
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.initializeTable(database, language);
  }

  close() {
    this.terminal.close();
  }

  initializeTable(database, language) {
    const data = database.map((item) => new Person(item).formatted(language));
    const table = chalkTable(this.getTableOptions(), data);
    this.print = console.draft(table);
    this.data = data;
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  getTableOptions() {
    return {
      leftPad: 5,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.magenta("Vehicles") },
        { field: "distance", name: chalk.red("Distance") },
        { field: "from", name: chalk.blue("From") },
        { field: "to", name: chalk.blueBright("To") },
      ],
    };
  }
}
