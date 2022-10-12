import { faker } from "@faker-js/faker";

console.log({
  id: faker.random.numeric(),
  name: faker.name.firstName(),
  phone: faker.phone.number(),
});
