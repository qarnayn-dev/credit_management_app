import React, { useEffect, useState } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface iStyledTextInput {
    value?: string,
    placeholder?: string,
    onChanged?: (input: string) => void,
    isDigitOnly?: boolean,
    decimal?: number,
    error?: string,
    direction?: 'column' | 'row',
}

const StyledTextInput = (props: iStyledTextInput) => {
    const [value, setValue] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(true);

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
        props?.onChanged?.(value);
        setShowError(false);

        return () => { }
    }, [value])

    useEffect(() => {
        setShowError(true);

        return () => { }
    }, [props.error])


    return (
        <View style={{ ...styles.container, flex: (props.direction === 'row') ? 1 : undefined }}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                value={value}
                onChangeText={handleChange}
                placeholderTextColor="#999"
                keyboardType={props.isDigitOnly ? 'numeric' : undefined}
            />
            <Text style={styles.errorText}>{showError ? props.error : ''}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
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
    'errorText': {
        fontSize: 12,
        color: 'red',
        height: 14,
        paddingLeft: 2,
    }
});

export default StyledTextInput;
