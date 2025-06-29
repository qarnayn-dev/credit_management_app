import { Stack } from './AppNavigator';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/SignUp';


const GuestNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
);

export default GuestNavigator
