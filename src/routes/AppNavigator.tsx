import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types';
import MainNavigator from './MainNavigator';
import GuestNavigator from './GuestNavigator';
import { useAuth } from '../hooks/useAuth';

export const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const authContext = useAuth();

    return (
        (authContext?.user) ?
            <MainNavigator></MainNavigator>
            : <GuestNavigator></GuestNavigator>
    );
}

export default AppNavigator
