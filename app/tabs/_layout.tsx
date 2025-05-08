import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="calculator"
        options={{
          title: "Calculator",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calculator" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="history" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
