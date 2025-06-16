export const toCurrency = (rawInput: string | undefined): string => {
    const digitsOnly = (rawInput ?? '').replace(/\D/g, '');

    const number = parseInt(digitsOnly, 10) || 0;

    return (number / 100).toFixed(2);
}