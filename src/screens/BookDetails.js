import { useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { useUser } from '../contexts/UserContext';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function BookDetails({ route }) {
  const { book } = route.params;
  const { addToWishlist, removeFromWishlist } = useUser();
  const info = book.volumeInfo;
  const [isInWishlist, setIsInWishlist] = useState(false); // Estado para controlar o toggle

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(book.id);
    } else {
      addToWishlist(book);
    }
    setIsInWishlist(!isInWishlist); // Alterna o estado
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Capa do Livro */}
        {info?.imageLinks?.thumbnail && (
          <Image
            source={{ uri: info.imageLinks.thumbnail }}
            style={styles.coverImage}
          />
        )}

        {/* Título */}
        <Text style={styles.title}>{info?.title}</Text>

        {/* Autor */}
        {info?.authors && (
          <Text style={styles.author}>
            {info.authors.join(', ')}
          </Text>
        )}

        {/* Categoria */}
        {info?.categories && (
          <Text style={styles.category}>{info.categories.join(', ')}</Text>
        )}

        {/* Descrição */}
        {info?.description && (
          <Text style={styles.description}>{info.description}</Text>
        )}

        {/* Informações adicionais */}
        <View style={styles.metaInfo}>
          {info?.publishedDate && (
            <Text style={styles.metaText}>
              📅 Publicado em: {info.publishedDate}
            </Text>
          )}
          {info?.pageCount && (
            <Text style={styles.metaText}>
              📖 {info.pageCount} páginas
            </Text>
          )}
          {info?.publisher && (
            <Text style={styles.metaText}>
              🏢 Editora: {info.publisher}
            </Text>
          )}
        </View>

        {/* Botão de toggle da wishlist */}
        <TouchableOpacity
          style={[
            styles.wishlistButton,
            isInWishlist ? styles.removeButton : styles.addButton
          ]}
          onPress={toggleWishlist}
        >
          <Feather 
            name="heart" 
            size={20} 
            color="#fff" 
            style={{ marginRight: 8 }} 
            fill={isInWishlist ? '#fff' : 'none'}
          />
          <Text style={styles.wishlistButtonText}>
            {isInWishlist ? 'Remover da lista de desejos' : 'Adicionar à lista de desejos'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  coverImage: {
    width: 150,
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 6,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#9b59b6',
    marginBottom: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  description: {
    fontSize: 15,
    color: '#34495e',
    textAlign: 'justify',
    lineHeight: 22,
    marginBottom: 16,
  },
  metaInfo: {
    width: '100%',
    marginBottom: 20,
  },
  metaText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  wishlistButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#e74c3c', // Vermelho para adicionar
  },
  removeButton: {
    backgroundColor: '#95a5a6', // Cinza para remover
  },
  wishlistButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});