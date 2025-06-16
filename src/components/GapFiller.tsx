import { StyleSheet, View } from 'react-native'
import React from 'react'

/// A 4-grid design system
interface FourGridSystem {
    value: 2 | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 72 | 80 | 96 | 120 | 160 | 200;
}

/// For `flesDirection` : 'column'
export const GapFillerVertical = (gap: FourGridSystem) => {
    return (
        <View style={{ height: gap.value }} />
    )
}

/// For `flesDirection` : 'row'
export const GapFillerHorizontal = (gap: FourGridSystem) => {
    return (
        <View style={{ width: gap.value }} />
    )
}