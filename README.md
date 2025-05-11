# Calculator App Frontend

This is the frontend of a **Calculator App** built with **React Native** and **Expo**. The app allows users to perform basic arithmetic operations, view their calculation history, and manage the history entries, including deleting individual or multiple entries.

## Features

### 1. Calculator
- Perform basic arithmetic operations: addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`).
- Input validation for ensuring the input consists of valid numbers.
- Displays the result of calculations in a user-friendly format.

### 2. History Management
- View a list of past calculations, including the month for each.
- Display the month of each calculation.
- Delete individual history entries.
- Multi-select and delete multiple history entries at once, streamlining history management.

### 3. Responsive UI
- Interactive, user-friendly design with intuitive buttons and icons.
- Highlight selected history items for easy identification and management.

## Technologies Used
- **React Native**: For building the mobile app with a native feel.
- **Expo**: For quick development, testing, and deployment of React Native apps.
- **Axios**: For making API requests.
- **React Native Vector Icons**: For various icons (e.g., trash icon for delete operations).
- **TypeScript**: For type safety and improved maintainability of the codebase.

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js**: You can download it from [here](https://nodejs.org/).
- **Expo CLI**: To install Expo CLI globally, run:
  ```bash
  npm install -g expo-cli

### Setting Up the Project Locally
1. Clone the repository:
  ```bash
git clone https://github.com/your-username/calculator-app-frontend.git
cd calculator-app-frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
expo start
```
4. Open the app:
- Use the [Expo Go](https://expo.dev/client) app on your mobile device to scan the QR code displayed in the terminal.
- Alternatively, you can run the app on an [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) or [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/).

## License
This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.
