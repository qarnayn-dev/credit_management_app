import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain'

const service = 'com.credit_management_app.biometric-key';

const baseOption = {
    service: service,
};

/// To Authorize with biometric.
/// return `true` if it has been authorised
export const authoriseWithBiometric = async (): Promise<boolean> => {
    let isEnabled = await Keychain.hasGenericPassword(baseOption);
    const isPasscodeAvailable = await Keychain.isPasscodeAuthAvailable();
    const biometryTypes = await Keychain.getSupportedBiometryType();

    if (biometryTypes == null && !isPasscodeAvailable) {
        Alert.alert('Authentication is required', 'To use this feature, please enable device passcode or biometric authentication in your settings.',);
        return false;
    } else if (isEnabled) {
        const result = await Keychain.getGenericPassword({
            authenticationPrompt: {
                title: 'Authenticate with biometric',
            },
            service: service,
        });

        console.log(`getGenericPassword ->${JSON.stringify(result)}`);
        return result != false;
    } else {
        const isEnabled = await enableBiometryOrPinAuthorisation();
        return isEnabled;
    }
}

/// A method to first enable the biometric authorisations
export const enableBiometryOrPinAuthorisation = async (): Promise<boolean> => {
    const result = await Keychain.setGenericPassword('biometric-sign-in', service, {
        accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        authenticationPrompt: {
            title: 'Enable biometric authentication',
        },
        service: service,
    });
    console.log(`setGenericPassword -> ${JSON.stringify(result)}`);
    return result != null;
}

/// A method to reset the generic password stored
export const resetGenericPassword = async (): Promise<boolean> => {
    const result = await Keychain.resetGenericPassword(baseOption);
    console.log(JSON.stringify(result));
    return result != null;
}