import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import CreditTransferScreen from '../screens/CreditTransferScreen';
import { RootStackParamList } from './types';
import ReceiptScreen from '../screens/ReceiptScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreditTransfer" component={CreditTransferScreen} />
        <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
    </Stack.Navigator>
);

export default AppNavigator
