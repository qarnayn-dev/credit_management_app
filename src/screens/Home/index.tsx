import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import UserProfileCard from '../../components/UserProfileCard';
import { themeStyles } from '../../constants/theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TransactionTile from '../../components/TransactionTile';
import { GapFillerVertical } from '../../components/GapFiller';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const transactions = useSelector((state: RootState) => state.transactionState.transactions);

    const naviToCreditTransfer = () => {
        navigation.navigate('CreditTransfer');
    }

    return (
        <View style={themeStyles.body}>
            <GapFillerVertical value={4} />
            <UserProfileCard />
            <GapFillerVertical value={40} />{
                (transactions.length > 0) ?
                    <>
                        <Text style={themeStyles.label}>Transactions</Text>
                        <GapFillerVertical value={12} />
                        <View style={styles.divider} />
                        <FlatList
                            data={transactions}
                            keyExtractor={(item) => item.transactionId}
                            renderItem={(value) => <TransactionTile item={value.item} />}
                        />
                    </>
                    :
                    <></>
            }
            <TouchableOpacity
                style={styles.bottomButton}
                onPress={naviToCreditTransfer}>
                <MaterialIcons name="add-to-home-screen" size={30} color="#fdfefe" />
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    bottomButton: {
        position: 'absolute',
        height: 60,
        width: 60,
        bottom: 40,
        left: 20,
        backgroundColor: '#d6eaf8',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#99a3a4',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    divider: {
        borderBottomWidth: 1,
        borderColor: '#e5e7eb',
    }
})