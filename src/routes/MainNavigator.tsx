import HomeScreen from '../screens/Home';
import CreditTransferScreen from '../screens/CreditTransfer';
import ReceiptScreen from '../screens/Receipt';
import { Stack } from './AppNavigator';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../hooks/useAuth';


const MainNavigator = () => {
    const authContext = useAuth();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerRight: () =>
                        <TouchableOpacity onPress={authContext?.signOut} style={{ margin: 4 }}>
                            <MaterialIcons name="logout" size={24} color="red" />
                        </TouchableOpacity>,
                }}
            />
            <Stack.Screen name="CreditTransfer" component={CreditTransferScreen} />
            <Stack.Screen name="Receipt" component={ReceiptScreen} />
        </Stack.Navigator>
    );
}

export default MainNavigator
