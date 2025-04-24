import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useUser } from '../contexts/UserContext';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function Authentication({ route, navigation }) {
  const { mode } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { updateUserName } = useUser();

  const handleAuthentication = () => {
    if (mode === 'login') {
      if (email && password) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabNavigator' }]
        });
      }
    } else {
      if (email && password && name) {
        updateUserName(name); // Adicione esta linha para atualizar o nome no contexto
        navigation.navigate('Authentication', {
          mode: 'login',
        });
        setEmail('');
        setPassword('');
      }
    }
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {mode === 'signup' ? 'Cadastro' : 'Bem-vindo de volta'}
        </Text>

        <View style={styles.formContainer}>
          {mode === 'signup' && (
            <View style={styles.inputContainer}>
              <Feather name="user" size={20} color="#fff" style={styles.icon} />
              <TextInput
                placeholder="Nome completo"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Feather name="mail" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Feather name="lock" size={20} color="#fff" style={styles.icon} />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleAuthentication}>
            <Text style={styles.primaryButtonText}>
              {mode === 'signup' ? 'Cadastrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            const newMode = mode === 'login' ? 'signup' : 'login';
            navigation.navigate('Authentication', { mode: newMode });
          }}>
          <Text style={styles.secondaryButtonText}>
            {mode === 'signup'
              ? 'Já tem conta? Faça login'
              : 'Não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#2a5298',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    padding: 10,
  },
  secondaryButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});
