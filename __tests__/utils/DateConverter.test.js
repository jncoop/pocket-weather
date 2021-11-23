import { convertUnixDateTime } from "../../utils/DateConverter";

it("tests unix date converter", () => {
  const dummyDate = {
    y: 2021,
    m: "Apr",
    day: "Tues",
    date: 13,
    hour: 10,
    min: 0,
    sec: 0,
  };
  expect(convertUnixDateTime("1618308000").y).toBe(dummyDate.y);
  expect(convertUnixDateTime("1618308000").m).toBe(dummyDate.m);
  expect(convertUnixDateTime("1618308000").date).toBe(dummyDate.date);
  expect(convertUnixDateTime("1618308000").day).toBe(dummyDate.day);
});
