/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
    // <Navigation />
    // <NavigationContainer>
    //   <SafeAreaProvider>
    //     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
    //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    //       <HomeScreen />
    //     </SafeAreaView>
    //   </SafeAreaProvider>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
