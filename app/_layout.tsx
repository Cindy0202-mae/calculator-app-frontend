import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Calculator',
          headerShown: true
        }}/>
    </Stack>
  );
}
// This is the root layout for the app. It uses the Stack component from expo-router to define the navigation structure.
// The Stack component allows for easy navigation between different screens in the app.
// The Stack.Screen component defines a screen in the stack, with the name "index" and a title of "Calculator".
// The headerShown option is set to true, which means that the header will be displayed at the top of the screen.
// The root layout is the main entry point for the app and is responsible for rendering the navigation structure.
