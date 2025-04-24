import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Feather } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Search({ navigation }) {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlist = [] } = useUser();
  const [favoritedBooks, setFavoritedBooks] = useState({}); // Estado local para controlar visualização

  const searchBooks = async () => {
    if (!query) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      const data = await response.json();

      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error(error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (item) => {
    if (favoritedBooks[item.id]) {
      removeFromWishlist(item.id);
      setFavoritedBooks((prev) => ({ ...prev, [item.id]: false }));
    } else {
      addToWishlist(item);
      setFavoritedBooks((prev) => ({ ...prev, [item.id]: true }));
    }
  };

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => navigation.navigate('BookDetails', { book: item })}>
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
        style={styles.heartButton}
        onPress={() => toggleFavorite(item)}>
        <Feather
          name="heart"
          size={24}
          color={favoritedBooks[item.id] ? '#e74c3c' : 'gray'}
          fill={favoritedBooks[item.id] ? '#e74c3c' : 'none'}
          style={{
            stroke: favoritedBooks[item.id] ? '#e74c3c' : '#e74c3c',
            strokeWidth: 2,
          }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper showHeader={false}>
      <View style={styles.content} showHeader={false}>
        <Text style={styles.title}>🔍 Buscar Livros</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite o título ou autor do livro"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Buscar" onPress={searchBooks} />

        {loading && <Text>Carregando...</Text>}

        <FlatList
          data={books}
          renderItem={renderBook}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showHeader={false}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 15,
    borderRadius: 3,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  heartButton: {
    marginLeft: 'auto',
    padding: 8,
  },
});
