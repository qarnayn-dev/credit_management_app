import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

interface iThemedButton {
    title?: string,
    position?: "absolute" | "relative" | "static" | undefined,
    onPress?: () => Promise<void>,
    top?: number | undefined,
    bottom?: number | undefined,
    left?: number | undefined,
    right?: number | undefined,
}

const ThemedButton = (props: iThemedButton) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onPress = async () => {
        setIsLoading(true);
        if (props.onPress) await props.onPress();
        setIsLoading(false);
    }

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: isLoading ? "#D1D5DB" : styles.button.backgroundColor,
                position: props.position ?? 'absolute',
                top: props.top,
                bottom: props.bottom,
                left: props.left,
                right: props.right,
            }}
            onPress={(!isLoading) ? onPress : undefined}
            disabled={isLoading}>
            <Text style={styles.text}>{props.title ?? 'Confirm'}</Text>
        </TouchableOpacity>
        // { isLoading ? <ActivityIndicator size="large" color="#0EA5E9" /> : <View /> }
    )
}

export default ThemedButton

const styles = StyleSheet.create({
    button: {
        position: 'relative',
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
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
})