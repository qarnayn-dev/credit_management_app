import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { themeStyles } from '../../constants/theme'
import StyledTextInput from '../../components/StyledTextInput'
import { GapFillerVertical } from '../../components/GapFiller'
import ThemedButton from '../../components/ThemedButton'
import { useAuth } from '../../hooks/useAuth'
import { SignUpPayload } from '../../services/authService'
import { ValidationErrors } from '../../types/ValidationErrors'
import Toast from 'react-native-toast-message'

const SignUpScreen = () => {
    const authContext = useAuth();
    const [signUpPayload, setSignUpPayload] = useState<SignUpPayload>({});
    const [errors, setErrors] = useState<ValidationErrors>();

    const updatePayload = (input: { email?: string, password?: string, full_name?: string }) => {
        setSignUpPayload({
            email: input.email ?? signUpPayload.email,
            password: input.password ?? signUpPayload.password,
            full_name: input.full_name ?? signUpPayload.full_name,
        });
    }

    const signUp = async () => {
        setErrors(undefined); // clear if any cache
        const res = await authContext?.signUp(signUpPayload);
        if (!res?.success) {
            setErrors(res?.errors);
            if (!res?.errors && res?.message)
                Toast.show({ type: 'error', position: 'bottom', text1: res?.message });
        }
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
                    }}>Let's get you set up ✨</Text>
                    <GapFillerVertical value={32} />
                    <Text style={themeStyles.label}>Email</Text>
                    <StyledTextInput
                        value={signUpPayload.email}
                        placeholder='e.g. support@qarnayn.dev'
                        onChange={(value) => updatePayload({ email: value })}
                        error={errors?.['email']?.[0]}
                    />
                    <GapFillerVertical value={8} />
                    <Text style={themeStyles.label}>Password</Text>
                    <StyledTextInput
                        value={signUpPayload.password}
                        placeholder={`Shh... it's a secret 🤫`}
                        onChange={(value) => updatePayload({ password: value })}
                        error={errors?.['password']?.[0]}
                    />
                    <GapFillerVertical value={8} />
                    <Text style={themeStyles.label}>Name</Text>
                    <StyledTextInput
                        value={signUpPayload.full_name}
                        placeholder='e.g. Zuzsend'
                        onChange={(value) => updatePayload({ full_name: value })}
                        error={errors?.['full_name']?.[0]}
                    />
                    <GapFillerVertical value={40} />
                    <ThemedButton title='Sign Up' onPress={signUp} position='relative' />
                    <GapFillerVertical value={4} />
                </View>
            </View>
        </ImageBackground>
    )
}

export default SignUpScreen

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