# Pocket Weather

Pocket Weather is an example app to put weather forecasts in your pocket.

## Description

The Pocket Weather project is a simple React Native Expo application. The app uses [React Navigation](https://reactnavigation.org/) for its core navigation functionality and [Async Storage](https://react-native-async-storage.github.io/async-storage/) for data persistence between sessions. Retrieves weather forecast and geolocation information from the [Open Weather Map API](https://openweathermap.org/api).

## Getting Started

### Prerequisites

To run Pocket weather in development mode on your machine, you will first need to install the following:

1. npm package manager

   ```
   npm install npm@latest -g
   ```

2. Expo command-line tools:

   ```
   $ npm install --global expo-cli
   ```

   See [Expo getting started guide for guidance and requirements](https://docs.expo.dev/get-started/installation/)

<br>

## Installation

<br>

1. Get a free API Key at [Open Weather Map API](https://openweathermap.org/api) to retrieve weather forecasts and geolocation (Account creation required).

2. Clone this repo

   ```
   https://github.com/jncoop/pocket-weather.git
   ```

3. Navigate to the project directory, and install npm packages

   ```
   npm install
   ```

4. Enter your API key in [OpenWeatherAPIKey](./utils/OpenWeatherAPIKey.js)

5. The fastest way to run the app is to use the Expo Go app on your iOS or Android device. Install from your device app store:

   - For Android [visit the Google PlayStore](https://play.google.com/store/apps/details?id=host.exp.exponent)

   - For iOS [visit the App Store](https://itunes.com/apps/exponent)

6. In the project directory, start the Expo server

   ```
   npm start
   ```

7. To run the app on a device, follow the CLI instructions

   ```
   Press a | open on Android
   Press i | open on iOS
   ```

## Functionality

- [Home Screen] Pull the latest weeks forecast from your chosen location search result or select a previously selected location if present.
- [Forecast Result] View the weekly forecast results and select a forecast day to view further information.
- [Day Forecast] View forecast information for a given day, and change location
- [Favourite cities] Save and view your favourite cities weekly weather forecast

## Authors

Contributors names:

- @jncoop

## Version History

- 0.1
  - Initial Release

## License

This project is licensed and distributed under the MIT License. See [LICENSE.txt](./LICENSE.txt) file for details
