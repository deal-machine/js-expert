import { faker } from "@faker-js/faker";
import { join } from "path";
import { writeFile } from "fs/promises";
import { Car, Category, Customer } from "../../entities";

const cars: Car[] = [];
const customers: Customer[] = [];
const category = new Category({
  id: Number(faker.random.numeric(3)),
  name: faker.name.firstName(),
  carIds: [],
  price: Number(faker.finance.amount()),
});

for (let index = 0; index < 2; index++) {
  const car = new Car({
    id: Number(faker.random.numeric(3)),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });

  category.carIds.push(car.id);
  cars.push(car);

  const customer = new Customer({
    id: Number(faker.random.numeric(3)),
    name: faker.name.firstName(),
    age: Number(faker.random.numeric(2)),
  });
  customers.push(customer);
}

interface IWriteFile {
  filename: string;
  data: any;
}
const write = async ({ filename, data }: IWriteFile): Promise<void> => {
  const seedDatabase = join(__dirname, "../", "database");
  const filePath = join(seedDatabase, filename);
  await writeFile(filePath, JSON.stringify(data));
};

(async () => {
  await write({ filename: "cars.json", data: cars });
  await write({ filename: "category.json", data: [category] });
  await write({ filename: "customers.json", data: customers });
  console.log("Seed success!");
})();
