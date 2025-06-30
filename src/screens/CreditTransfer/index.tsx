import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import StyledTextInput from '../../components/StyledTextInput'
import { postCreditTransfer, PostCreditTransferPayload } from '../../services/creditTransferService'
import { ApiResponse } from '../../types/ApiResponse'
import { CreditTransferReceipt } from '../../types/CreditTransferReceipt'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../routes/types'
import { ValidationErrors } from '../../types/ValidationErrors'
import { authoriseWithBiometric } from '../../services/biometricService'
import { themeStyles } from '../../constants/theme'
import { GapFillerVertical } from '../../components/GapFiller'
import { toCurrency } from '../../utils/toCurrency'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { userAction } from '../../redux/user/userSlice'
import { transactionAction } from '../../redux/transactions/transactionSlice'

type CreditTransferScreenRouteProp = RouteProp<RootStackParamList, 'CreditTransfer'>;

const CreditTransferScreen = () => {
    const route = useRoute<CreditTransferScreenRouteProp>();
    const { fromAccount, toAccount, amount, note } = route.params ?? {};
    const user = useSelector((state: RootState) => state.userState.user);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [validationError, setValidationError] = useState<ValidationErrors | undefined>(undefined);
    const [transferPayload, setTransferPayload] = useState<PostCreditTransferPayload>({
        fromAccount: fromAccount ?? user?.accountNumber ?? '',
        toAccount: toAccount ?? '',
        amount: amount ?? 0,
        note: note ?? '',
    });

    const dispatch = useDispatch();

    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>();

    const updatePayload = (input: { fromAccount?: string, toAccount?: string, amount?: number, note?: string }) => {
        setShowError(false);
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
            // Note: normally, the balance is provided from backend
            const response = await postCreditTransfer(transferPayload, user?.balance ?? 0);
            onPostSubmission(response);
            setIsLoading(false);
        }
    }

    /// When the submission has completed. This function is to handle the error, navigation & all
    const onPostSubmission = async (response: ApiResponse<CreditTransferReceipt>) => {
        if (response.status === 200 && response.data != null) {
            dispatch(userAction.updateUserBalance(response.data.amount));
            dispatch(transactionAction.addTransaction(response.data));
            navigator.replace('Receipt', response.data!);
        } else if (response.status === 422) {
            setValidationError(response.errors);
            setShowError(true);
        } else {
            Alert.prompt("Something went wrong :(", "Please wait a few minutes, and then try again");
        }
    }

    return (
        <View style={themeStyles.body}>
            <View style={styles.amountContainer}>
                <Text style={themeStyles.label}>Amount (RM)</Text>
                <TextInput
                    style={styles.amountInput}
                    placeholder='0.00'
                    value={transferPayload.amount?.toFixed(2)}
                    onChangeText={(value) => updatePayload({ amount: parseFloat(toCurrency(value)) })}
                    placeholderTextColor="#999"
                    keyboardType='numeric'
                />
                <Text style={{ ...themeStyles.errorText, textAlign: 'right' }}>{showError ? validationError?.['amount']?.[0] : ''}</Text>
            </View>
            <GapFillerVertical value={8} />
            <View>
                <Text style={themeStyles.label}>Account to transfer</Text>
                <StyledTextInput
                    placeholder='Transfer to'
                    value={transferPayload.toAccount}
                    onChange={(value) => updatePayload({ toAccount: value })}
                    error={validationError?.['toAccount']?.[0]}
                />
            </View>
            <GapFillerVertical value={8} />
            <View>
                <Text style={themeStyles.label}>Note</Text>
                <StyledTextInput
                    placeholder='Note'
                    value={transferPayload.note}
                    onChange={(value) => updatePayload({ note: value })}
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
    )
}

export default CreditTransferScreen

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#3498db',
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
    amountContainer: {
        marginBottom: 16,
    },
    amountInput: {
        borderRadius: 8,
        marginTop: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        textAlign: 'right',
        borderBottomColor: '#e5e7e9',
        borderBottomWidth: 2,
        fontSize: 40,
        color: '#283747',
    }
})
