import {
  setStoreItem,
  getStoreItem,
} from "../../coordinators/AsyncStoreCoord.js";

it("tests setting store item ", () => {
  return setStoreItem("@testkey", "testitem").then((response) => {
    expect(response).toBe(true);
  });
});

it("tests getting store item ", () => {
  return getStoreItem("@testkey").then((response) => {
    expect(response).toBe("testitem");
  });
});
