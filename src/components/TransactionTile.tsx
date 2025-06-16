import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CreditTransferReceipt } from '../types/CreditTransferReceipt'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../routes/types';

interface TransactionTileProps {
    item: CreditTransferReceipt,
}

const TransactionTile = (props: TransactionTileProps) => {
    const navigator = useNavigation<StackNavigationProp<RootStackParamList>>();

    const naviToReceiptScreen = () => {
        navigator.navigate('ReceiptScreen', props.item);
    }

    return (
        <TouchableOpacity
            onPress={naviToReceiptScreen}>
            <View style={styles.tile}>
                <View style={styles.topRow}>
                    <Text style={styles.timestamp}>
                        {new Date(props.item.timestamp).toLocaleString()}
                    </Text>
                    <Text style={[styles.status, styles[props.item.status]]}>
                        {props.item.status.toUpperCase()}
                    </Text>
                </View>

                <View style={styles.middleRow}>
                    <Text style={styles.accountLine}>
                        <Text style={styles.label}>Transfer to:</Text> {props.item.toAccount}
                    </Text>
                    <Text style={styles.amount}>RM {props.item.amount.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tile: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a',
    },
    status: {
        fontWeight: 'bold',
        fontSize: 12,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 4,
        overflow: 'hidden',
    },
    success: {
        backgroundColor: '#dcfce7',
        color: '#166534',
    },
    failed: {
        backgroundColor: '#fee2e2',
        color: '#991b1b',
    },
    processing: {
        backgroundColor: '#fef9c3',
        color: '#92400e',
    },
    middleRow: {
        marginBottom: 4,
    },
    accountLine: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 2,
    },
    label: {
        fontWeight: '600',
        color: '#1e293b',
    },
    timestamp: {
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'left',
    },
});

export default TransactionTile;