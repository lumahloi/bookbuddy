import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { useUser } from '../contexts/UserContext';

const Feed = () => {
  const { user, toggleFollow } = useUser();

  const [posts, setPosts] = useState([
    {
      id: '1',
      user: {
        name: 'Ana Claudia',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      book: {
        title: 'O Nome do Vento',
        author: 'Patrick Rothfuss',
        cover: 'https://covers.openlibrary.org/b/id/8158573-L.jpg',
      },
      content: 'Finalmente terminei essa obra-prima da fantasia! A escrita do Rothfuss é simplesmente magnífica.',
      date: '2 horas atrás',
      likes: 24,
      liked: false,
    },
    {
      id: '2',
      user: {
        name: 'Carlos Eduardo',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      book: {
        title: '1984',
        author: 'George Orwell',
        cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      },
      content: 'Relendo esse clássico e percebendo como ele continua atual. Alguma sugestão de livros similares?',
      date: '1 dia atrás',
      likes: 18,
      liked: false,
    },
    {
      id: '3',
      user: {
        name: 'Mariana Santos',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      book: {
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        cover: 'https://covers.openlibrary.org/b/id/8311288-L.jpg',
      },
      content: '"Tu te tornas eternamente responsável por aquilo que cativas." ❤️ Essa mensagem nunca perde o significado.',
      date: '3 dias atrás',
      likes: 42,
      liked: false,
    },
  ]);

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const handleFollow = (userName) => {
    toggleFollow(userName);
    const action = user.followingUsers.includes(userName) ? 'deixou de seguir' : 'seguiu';
    Alert.alert('Sucesso', `Você ${action} ${userName}`);
  };

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.postDate}>{item.date}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.followButton,
            user.followingUsers.includes(item.user.name) && styles.unfollowButton,
          ]}
          onPress={() => handleFollow(item.user.name)}
        >
          <Text style={styles.followButtonText}>
            {user.followingUsers.includes(item.user.name) ? 'Desseguir' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.bookContainer}>
        <Image source={{ uri: item.book.cover }} style={styles.bookCover} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.book.title}</Text>
          <Text style={styles.bookAuthor}>{item.book.author}</Text>
        </View>
      </View>
      
      <View style={styles.postFooter}>
        <TouchableOpacity
          onPress={() => toggleLike(item.id)}
          style={styles.actionButton}
        >
          <Text style={[styles.actionText, item.liked && styles.likedText]}>
            {item.liked ? '❤️' : '🤍'} {item.likes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.feedContainer}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    paddingVertical: 15,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postDate: {
    color: '#666',
    fontSize: 12,
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },
  bookContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  bookCover: {
    width: 50,
    height: 70,
    borderRadius: 4,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 3,
  },
  bookAuthor: {
    color: '#666',
    fontSize: 13,
  },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginBottom: 10,
  },
  actionButton: {
    marginRight: 20,
  },
  actionText: {
    fontSize: 14,
  },
  likedText: {
    color: '#e74c3c',
  },
  followButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  unfollowButton: {
    backgroundColor: '#e74c3c',
  },
  followButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Feed;