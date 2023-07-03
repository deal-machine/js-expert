export class Person {
  constructor({ id, vehicles, from, to, distance }) {
    this.id = id;
    this.vehicles = vehicles;
    this.from = from;
    this.to = to;
    this.distance = distance;
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicles),
      distance: new Intl.NumberFormat(language, {
        style: "unit",
        unit: "kilometer",
      }).format(this.distance),
      from: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.to)),
    };
  }

  static getInstance(text) {
    const EMPTY_SPACE = " ";
    const [id, vehicles, distance, from, to] = text.split(EMPTY_SPACE);
    return new Person({
      id,
      distance,
      from,
      to,
      vehicles: vehicles.split(","),
    });
  }
}
