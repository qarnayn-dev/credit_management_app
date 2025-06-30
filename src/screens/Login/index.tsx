import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeStyles } from '../../constants/theme'
import StyledTextInput from '../../components/StyledTextInput'
import { GapFillerVertical } from '../../components/GapFiller'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextButton from '../../components/ThemedTextButton'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../routes/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { LoginPayload } from '../../services/authService'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../hooks/useAuth'


const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authContext = useAuth();
    const [error, setError] = useState<string | null>();
    const [loginPayload, setLoginPayoload] = useState<LoginPayload>({});


    const updatePayload = (input: { email?: string, password?: string }) => {
        setLoginPayoload({
            email: input.email ?? loginPayload.email,
            password: input.password ?? loginPayload.password,
        })
        if (error) setError(null); // reset
    }

    const submitLogin = async () => {
        if (authContext?.logIn) {
            const res = await authContext?.logIn(loginPayload);
            if (!res.success) {
                setError(res.message);
            } else {
                setError(null);
            }
        }
    }

    const navToSignUpPage = async () => {
        navigation.navigate('SignUp');
    }

    useEffect(() => {
        if ((error?.length ?? 0) > 0 && error) {
            Toast.show({ type: 'error', position: 'bottom', text1: error });
            updatePayload({ password: '' });
        }
    }, [error]);

    return (
        <ImageBackground
            source={require('../../assets/images/background-2.jpg')}
            imageStyle={styles.imageStyle}>
            <View style={styles.page}>
                <View style={styles.container}>
                    <Text style={{
                        fontSize: 20,
                        textAlign: 'center',
                    }}>Good to see you again 👋🏼</Text>
                    <GapFillerVertical value={32} />
                    <Text style={themeStyles.label}>Email</Text>
                    <StyledTextInput
                        value={loginPayload.email}
                        placeholder='e.g. support@qarnayn.dev'
                        onChange={(value) => updatePayload({ email: value })} />
                    <GapFillerVertical value={8} />
                    <Text style={themeStyles.label}>Password</Text>
                    <StyledTextInput
                        value={loginPayload.password}
                        placeholder={`Your magic key 🔑`}
                        onChange={(value) => updatePayload({ password: value })} />
                    <GapFillerVertical value={40} />
                    <ThemedButton title='Log In' onPress={submitLogin} position='relative' />
                    <GapFillerVertical value={24} />
                    <View style={styles.signUpSection}>
                        <Text style={themeStyles.secondaryText}>Or</Text>
                        <ThemedTextButton
                            text=' Sign Up '
                            onPress={navToSignUpPage} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    imageStyle: {
        resizeMode: 'cover',
    },
    page: {
        ...themeStyles.body,
        justifyContent: 'center',
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 20 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 2,
    },
    signUpSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
})