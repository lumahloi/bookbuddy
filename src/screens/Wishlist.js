import ScreenWrapper from '../components/ScreenWrapper';
import { useUser } from '../contexts/UserContext';
import { Feather } from '@expo/vector-icons';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

export default function Wishlist({ navigation }) { // Adicionei navigation nas props
  const { user, removeFromWishlist } = useUser();

  const renderBook = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetails', { book: item })} // Adicionei o redirecionamento
    >
      {item.volumeInfo?.imageLinks?.thumbnail && (
        <Image
          source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
          style={styles.bookImage}
        />
      )}
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.volumeInfo?.title}</Text>
        <Text style={styles.bookAuthor}>
          {item.volumeInfo?.authors
            ? item.volumeInfo.authors.join(', ')
            : 'Autor desconhecido'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={(e) => {
          e.stopPropagation(); // Impede que o clique no ícone de lixeira redirecione para BookDetails
          removeFromWishlist(item.id);
        }}
      >
        <Feather name="trash-2" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>❤️ Meus Favoritos</Text>
        <FlatList
          data={user.wishlist}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={
            user.wishlist?.length === 0 ? styles.emptyContainer : null
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Sua lista de desejos está vazia.
            </Text>
          }
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  bookImage: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 40,
  },
});