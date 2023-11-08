//Todo: Instalaciones
//* Navigation
// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/stack
// npx expo install react-native-gesture-handler
//* Storage
// npx expo install expo-secure-store

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppContextProvider } from './src/context/AppContext';
import { NavigationHolder } from './src/routes/NavigationHolder';

export default function App() {
  return (
    <AppContextProvider>
      <NavigationHolder/>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
