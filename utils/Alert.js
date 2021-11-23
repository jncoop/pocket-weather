import { Alert } from "react-native";

/**
 * Returns device-specific alert modal
 * @param {string=} title - alert title
 * @param {string=} message - alert message
 **/

export const showAlert = (title, message) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: "Dismiss",
        onPress: () => {},
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {},
    }
  );
