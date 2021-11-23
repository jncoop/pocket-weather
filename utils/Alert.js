import { Alert } from "react-native";

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
