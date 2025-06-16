import * as Keychain from 'react-native-keychain'

const service = 'com.credit_management_app.biometric-key';

/// To Authorize with biometric
export const authoriseWithBiometric = async (): Promise<boolean> => {
    const result = await Keychain.getGenericPassword({
        authenticationPrompt: {
            title: 'Authenticate with biometric',
        },
        service: service,
    });

    if (!result) {
        const isEnabled = await enableBiometryOrPinAuthorisation();
        return isEnabled;
    } else {
        return true;
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

    return result != null;
}

/// A method to reset the generic password stored
export const resetGenericPassword = async () => {
    const res = await Keychain.resetGenericPassword(
        {
            service: service,
        }
    );
}