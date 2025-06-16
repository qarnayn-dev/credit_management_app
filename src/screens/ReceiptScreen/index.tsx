import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';

type ReceiptScreenRouteProp = RouteProp<RootStackParamList, 'ReceiptScreen'>;

const ReceiptScreen = () => {
    const route = useRoute<ReceiptScreenRouteProp>();
    const { transactionId, status, amount, fromAccount, toAccount, timestamp } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Transfer Receipt</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Transaction ID:</Text>
                    <Text style={styles.value}>{transactionId}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={[styles.value, styles.statusSuccess]}>{status}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>From Account:</Text>
                    <Text style={styles.value}>{fromAccount}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>To Account:</Text>
                    <Text style={styles.value}>{toAccount}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Amount:</Text>
                    <Text style={styles.value}>RM {amount.toFixed(2)}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Timestamp:</Text>
                    <Text style={styles.value}>{new Date(timestamp).toLocaleString()}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',

    },
    card: {
        marginHorizontal: 20,
        marginVertical: 24,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: '#0F172A',
    },
    row: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
    },
    statusSuccess: {
        color: '#1d8348',
    },
});