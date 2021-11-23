import { API_KEY } from "../../utils/OpenWeatherAPIKey";

it("tests open weather API key retrieval", () => {
  expect(API_KEY.length).toBeGreaterThan(0);
  expect(typeof API_KEY).toBe("string");
});
