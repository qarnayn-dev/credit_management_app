/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useAppDispatch } from './src/hooks/reduxHook';
import { useEffect, useState } from 'react';
import { rehydrateUser } from './src/redux/user/userSlice';
import { rehydrateTransactions } from './src/redux/transactions/transactionSlice';

const RehydrationWrapper = () => {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      await dispatch(rehydrateUser());
      await dispatch(rehydrateTransactions());
      setReady(true);
    };
    hydrate();
  }, []);

  return (ready) ?
    <AppNavigator />
    :
    <View style={style.indicator}>
      <ActivityIndicator size="large" />
    </View>;
};


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RehydrationWrapper />
      </NavigationContainer>
    </Provider>
  );
}

export default App;


const style = StyleSheet.create({
  'indicator': {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
},);
