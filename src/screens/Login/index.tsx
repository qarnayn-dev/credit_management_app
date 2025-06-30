import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
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
import { ValidationErrors } from '../../types/ValidationErrors'


const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authContext = useAuth();
    const [errors, setErrors] = useState<ValidationErrors>();
    const [loginPayload, setLoginPayoload] = useState<LoginPayload>({});


    const updatePayload = (input: { email?: string, password?: string }) => {
        setLoginPayoload({
            email: input.email ?? loginPayload.email,
            password: input.password ?? loginPayload.password,
        });
    }

    const submitLogin = async () => {
        setErrors(undefined); // clear if any cache
        if (authContext?.logIn) {
            const res = await authContext?.logIn(loginPayload);
            if (!res?.success) {
                setErrors(res?.errors);
                if (!res?.errors && res?.message)
                    Toast.show({ type: 'error', position: 'bottom', text1: res?.message });
            }
        }

    }

    const navToSignUpPage = async () => {
        navigation.navigate('SignUp');
    }

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
                        placeholder='e.g. zuszend@gmail.com'
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