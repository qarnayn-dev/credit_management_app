import React, { useEffect, useState } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { themeStyles } from '../constants/theme';

interface iStyledTextInput {
    value?: string,
    placeholder?: string,
    onChange?: (input: string) => void,
    isDigitOnly?: boolean,
    decimal?: number,
    error?: string,
    direction?: 'column' | 'row',
}

const StyledTextInput = (props: iStyledTextInput) => {
    const [value, setValue] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);

    const handleChange = (text: string) => {
        let digitsOnly = text.replace(/[^0-9\.]/g, '');
        const parts = digitsOnly.split('.');
        const allowableDecimal = props.decimal ?? 10;
        if (parts.length > 2) {
            digitsOnly = parts[0] + '.' + parts.slice(1).join('');
        } else if (parts.length == 2 && parts[1].length > allowableDecimal) {
            digitsOnly = digitsOnly.slice(0, digitsOnly.length - (parts[1].length - allowableDecimal));
        }

        (props.isDigitOnly === true) ? setValue(digitsOnly) : setValue(text);
    };

    useEffect(() => {
        props?.onChange?.(value);
        setShowError(false);

        return () => { }
    }, [value])

    useEffect(() => {
        setValue(props.value ?? '');
        return () => { }
    }, [props.value])

    useEffect(() => {
        if (props.error) setShowError(true);
        else setShowError(false);
        return () => { }
    }, [props.error])


    return (
        <View style={{ ...styles.container, flex: (props.direction === 'row') ? 1 : undefined }}>
            <TextInput
                style={{ ...styles.input, borderColor: (showError) ? 'red' : styles.input.borderColor }}
                placeholder={props.placeholder}
                value={value}
                onChangeText={handleChange}
                placeholderTextColor="#999"
                keyboardType={props.isDigitOnly ? 'numeric' : undefined}
            />
            <Text style={themeStyles.errorText}>{showError ? props.error : ''}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ebedef',
        borderRadius: 8,
        marginTop: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: 'white',
        fontSize: 16,
        color: '#111827',
        height: 40,
        minHeight: 40,
    },
});

export default StyledTextInput;
