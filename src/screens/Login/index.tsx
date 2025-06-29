import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { themeStyles } from '../../constants/theme'
import StyledTextInput from '../../components/StyledTextInput'
import { GapFillerVertical } from '../../components/GapFiller'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextButton from '../../components/ThemedTextButton'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../routes/types'
import { StackNavigationProp } from '@react-navigation/stack'

const LoginScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const logIn = async () => {
        // TODO: delete once done
        await new Promise((resolve) => setTimeout(resolve, 1000));
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
                    <StyledTextInput placeholder='e.g. support@qarnayn.dev' />
                    <GapFillerVertical value={8} />
                    <Text style={themeStyles.label}>Password</Text>
                    <StyledTextInput placeholder={`Your magic key 🔑`} />
                    <GapFillerVertical value={40} />
                    <ThemedButton title='Log In' onPress={logIn} position='relative' />
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