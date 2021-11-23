import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "react-native-gesture-handler/jestSetup";
import fetchMock from "jest-fetch-mock";

//async storage
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

//react native navigation
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

jest.mock("@react-navigation/native/lib/commonjs/useLinking.native", () => ({
  default: () => ({ getInitialState: { then: jest.fn() } }),
  __esModule: true,
}));

fetchMock.enableMocks();
