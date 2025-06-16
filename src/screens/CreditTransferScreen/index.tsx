import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import StyledTextInput from '../../components/StyledTextInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { postCreditTransfer, PostCreditTransferPayload } from '../../services/creditTransferService'
import { ApiResponse } from '../../types/ApiResponse'
import { CreditTransferReceipt } from '../../types/CreditTransferReceipt'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../routes/types'
import { ValidationErrors } from '../../types/ValidationErrors'
import { authoriseWithBiometric } from '../../services/biometricService'

const CreditTransferScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<ValidationErrors | undefined>(undefined);
    const [transferPayload, setTransferPayload] = useState<PostCreditTransferPayload>({
        fromAccount: "",
        toAccount: "",
        amount: 0,
        note: "",
    });

    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>();

    const updatePayload = (input: { fromAccount?: string, toAccount?: string, amount?: number, note?: string }) => {
        setTransferPayload(
            {
                fromAccount: input.fromAccount ?? transferPayload.fromAccount,
                toAccount: input.toAccount ?? transferPayload.toAccount,
                amount: input.amount ?? transferPayload.amount,
                note: input.note ?? transferPayload.note,
            }
        );
    }

    /// A function to submit the request
    const submitRequest = async () => {
        const isAuthorised = await authoriseWithBiometric();
        if (isAuthorised) {
            setIsLoading(true);
            setValidationError(undefined);
            const response = await postCreditTransfer(transferPayload);
            onPostSubmission(response);
            setIsLoading(false);
        }
    }

    /// When the submission has completed. This function is to handle the error, navigation & all
    const onPostSubmission = async (response: ApiResponse<CreditTransferReceipt>) => {
        if (response.status === 200 && response.data != null) {
            navigator.replace('ReceiptScreen', response.data!);
        } else if (response.status === 422) {
            setValidationError(response.errors);
        } else {
            Alert.prompt("Something went wrong :(", "Please wait a few minutes, and then try again");
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.body}>
                <View style={styles.field}>
                    <Text>Account to transfer</Text>
                    <StyledTextInput
                        placeholder='Transfer to'
                        onChanged={(value) => updatePayload({ toAccount: value })}
                        error={validationError?.['toAccount']?.[0]}
                    />
                </View>
                <View style={styles.field}>
                    <Text>Amount</Text>
                    <View style={styles.row}>
                        <Text style={styles.prefixBox}>RM</Text>
                        <StyledTextInput
                            direction='row'
                            isDigitOnly={true}
                            decimal={2}
                            placeholder='Enter amount'
                            onChanged={(value) => updatePayload({ amount: Number.parseFloat(value) })}
                            error={validationError?.['amount']?.[0]}
                        />
                    </View>
                </View>
                <View style={styles.field}>
                    <Text>Note</Text>
                    <StyledTextInput
                        placeholder='Note'
                        onChanged={(value) => updatePayload({ note: value })}
                    />
                </View>
                <TouchableOpacity
                    style={{ ...styles.bottomButton, backgroundColor: isLoading ? "#D1D5DB" : styles.bottomButton.backgroundColor }}
                    onPress={(!isLoading) ? submitRequest : undefined}
                    disabled={isLoading}>
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
                {isLoading ? <ActivityIndicator size="large" color="#0EA5E9" /> : <View />}
            </View>
        </SafeAreaView>
    )
}

export default CreditTransferScreen

const styles = StyleSheet.create({
    'body': {
        paddingHorizontal: 20,
        paddingVertical: 24,
        height: '100%',
    },
    'field': {
        paddingBottom: 16,
    },
    'row': {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'prefixBox': {
        paddingRight: 8,
        paddingTop: 4,
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#0284C7',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
})
