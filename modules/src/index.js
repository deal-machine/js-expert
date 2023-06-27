import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";

import database from "../database.json" assert { type: "json" };
import { Person } from "./models/Person.js";

const DEFAULT_LANG = "pt-BR";

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 5,
  columns: [
    { field: "id", name: chalk.cyan("ID") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "distance", name: chalk.red("Distance") },
    { field: "from", name: chalk.blue("From") },
    { field: "to", name: chalk.blueBright("To") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatted(DEFAULT_LANG))
);
console.draft(table);
