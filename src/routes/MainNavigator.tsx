import HomeScreen from '../screens/Home';
import CreditTransferScreen from '../screens/CreditTransfer';
import ReceiptScreen from '../screens/Receipt';
import { Stack } from './AppNavigator';


const MainNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreditTransfer" component={CreditTransferScreen} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} />
    </Stack.Navigator>
);

export default MainNavigator
