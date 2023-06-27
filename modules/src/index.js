import DraftLog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";

import database from "../database.json" assert { type: "json" };
import { Person } from "./models/Person.js";

DraftLog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: chalk.cyan("Identification") },
    { field: "vehicles", name: chalk.magenta("Vehicles") },
    { field: "distance", name: chalk.red("Distance") },
    { field: "from", name: chalk.blue("From") },
    { field: "to", name: chalk.blueBright("To") },
  ],
};

const table = chalkTable(
  options,
  database.map((item) => new Person(item).formatted("pt-BR"))
);
const print = console.draft(table);
