import database from "../database.json" assert { type: "json" };
import { TerminalController } from "./TerminalController.js";
import { Person } from "./models/Person.js";

const DEFAULT_LANG = "pt-BR";
const STOP_TERMINAL = ":q";

const terminalController = new TerminalController();
terminalController.init(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question(
      "Write -> id_vehicles_distance_from_to \nTypes -> number_text,text,text_number_date(YYYY-MM-DD)_date(YYYY-MM-DD) \nExample -> 1 vehicle1,vehicle2,vehicle3 5000 2023-07-01 2023-07-03 \n"
    );
    if (answer === STOP_TERMINAL) {
      terminalController.close();
      console.log("process finished!");
      return;
    }
    const person = Person.getInstance(answer);
    console.log("person: ", person.formatted(DEFAULT_LANG));
    return mainLoop();
  } catch (error) {
    console.error("ERROR>: ", error);
    return mainLoop();
  }
}

await mainLoop();
