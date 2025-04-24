import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.quotable.io/random?tags=literature'
      );
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        text: 'A leitura é para o intelecto o que o exercício é para o corpo.',
        author: 'Joseph Addison',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao BookBuddy</Text>
        <Text style={styles.subtitle}>
          Compartilhe suas leituras, descubra novos livros e conecte-se com
          outros amantes da literatura
        </Text>

        <View style={styles.quoteContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.quoteText}>"{quote.text}"</Text>
              <Text style={styles.quoteAuthor}>— {quote.author}</Text>
              <TouchableOpacity
                onPress={fetchQuote}
                style={styles.refreshButton}>
                <Feather name="refresh-cw" size={20} color="#fff" />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('Authentication', { mode: 'signup' })
            }>
            <Text style={styles.primaryButtonText}>
              Cadastre-se gratuitamente
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate('Authentication', { mode: 'login' })
            }>
            <Text style={styles.secondaryButtonText}>
              Já tem conta? Faça login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  quoteContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 18,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 26,
  },
  quoteAuthor: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'right',
    width: '100%',
  },
  refreshButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  buttonsContainer: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#2a5298',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
