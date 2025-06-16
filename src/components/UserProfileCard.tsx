import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store';

const UserProfileCard = () => {
  const user = useSelector((state: RootState) => state.userState.user);

  return (
    <ImageBackground
      source={require('../assets/images/profile-card-bg.jpg')}
      style={styles.card}
      imageStyle={styles.cardBackground}
    >
      <View style={styles.topContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <View>
          <Text style={styles.value}>{user?.accountNumber}</Text>
          <Text style={styles.label}>Account Number</Text>
        </View>
      </View>
      <Text style={styles.balanceValue}>RM {user?.balance.toFixed(2)}</Text>
    </ImageBackground>
  )
}

export default UserProfileCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#212f3c',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    height: 140,
    flexDirection: 'column',
  },
  cardBackground: {
    resizeMode: 'cover',
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    padding: 20,
  },
  nameContainer: {
    fontSize: 24,
    fontWeight: '600',
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: '300',
    marginBottom: 12,
    color: '#212f3c',
  },
  label: {
    fontSize: 12,
    color: '#707b7c',
    textAlign: 'right',
  },
  value: {
    marginTop: 6,
    fontSize: 16,
    color: '#212f3c',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '600',
    color: '#212f3c',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  topContainer: {
    flexDirection: 'row',
    position: 'relative',
    height: 'auto',
    width: "100%",
    maxHeight: 80,
  },
});