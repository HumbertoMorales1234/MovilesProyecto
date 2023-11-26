//Todo: Instalaciones
//* Navigation
// npm install @react-navigation/native
// npx expo install react-native-screens react-native-safe-area-context
// npm install @react-navigation/stack
// npx expo install react-native-gesture-handler
// npm install @react-navigation/drawer
// npm install react-native-gesture-handler react-native-reanimated
//* Storage
// npx expo install expo-secure-store

import { AppContextProvider } from './src/context/AppContext';
import { KartContextProvider } from './src/context/KartContext';
import { NavigationHolder } from './src/routes/NavigationHolder';

export default function App() {
  return (
    <AppContextProvider>
       {/* <KartContextProvider> */}
        <NavigationHolder/>
       {/* </KartContextProvider>  */}
    </AppContextProvider>
  );
}

