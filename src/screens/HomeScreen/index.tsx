import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <Text>HomeScreen</Text>
            <Button title='press me' onPress={() => navigation.navigate('CreditTransfer')}>
            </Button>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})