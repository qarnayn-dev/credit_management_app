import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home';
import CreditTransferScreen from '../screens/CreditTransfer';
import { RootStackParamList } from './types';
import ReceiptScreen from '../screens/Receipt';
import MainNavigator from './MainNavigator';
import GuestNavigator from './GuestNavigator';

export const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    // <MainNavigator></MainNavigator>
    <GuestNavigator></GuestNavigator>
);

export default AppNavigator
