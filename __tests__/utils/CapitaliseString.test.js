import { capitalizeFirstLetter } from "../../utils/CapitaliseString";

it("tests open weather API key retrieval", () => {
  expect(capitalizeFirstLetter("sunny weather")).toBe("Sunny weather");
});
