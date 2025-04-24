import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../contexts/UserContext';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Profile = () => {
  const { user } = useUser();
  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: user.photo }} style={styles.profileImage} />
          <Text style={styles.userName}>{user.name}</Text>

          <View style={styles.statsContainer}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => navigation.navigate('Followers')}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statItem}
              onPress={() => navigation.navigate('Following')}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Seguindo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statItem}
              onPress={() => navigation.navigate('Wishlist')}>
              <Text style={styles.statNumber}>{user.wishlistCount}</Text>
              <Text style={styles.statLabel}>Livros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
    padding: 10,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
});

export default Profile;
