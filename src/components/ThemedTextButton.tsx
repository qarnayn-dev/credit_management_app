import { StyleSheet, Text, TextStyle, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

interface iThemedTextButton {
    text: string,
    color?: string,
    fontWeight?: string,
    fontSize?: number,
    style?: TextStyle,
    position?: "absolute" | "relative" | "static" | undefined,
    top?: number | undefined,
    bottom?: number | undefined,
    left?: number | undefined,
    right?: number | undefined,
    onPress?: () => Promise<void>,
}

const ThemedTextButton = (props: iThemedTextButton) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onPress = async () => {
        setIsLoading(true);
        if (props.onPress) await props.onPress();
        setIsLoading(false);
    }

    return (
        <TouchableOpacity
            onPress={(!isLoading) ? onPress : undefined}
            disabled={isLoading}
            aria-expanded={true}>
            <Text style={{
                ...(props.style) ?? {},
                color: props.color ?? '#3498db',
                textAlign: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default ThemedTextButton