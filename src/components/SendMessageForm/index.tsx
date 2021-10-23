import React, { useState } from 'react';

import {
  Alert,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import { api } from '../../services/api';
import { COLORS } from '../../theme';
import { Button } from '../Button';
import { styles } from './style';


export function SendMessageForm(){
  const [message, setMessage] = useState('');
  const [sendingMessage, setSendigMessage] = useState(false);

  async function handleMessageSubmit() {
    const messageFormatted = message.trim();

    if(messageFormatted.length > 0) {
      try {
        setSendigMessage(true);
        await api.post('messages', {
          message
        });

        setMessage('');
        Keyboard.dismiss();
        Alert.alert('Mensagem enviada com sucesso!');
      } catch (err) {
        console.log(err)
        Alert.alert('Ocorreu um erro ao enviar sua mensagem!');
      } finally {
        setSendigMessage(false);
      }
    } else {
      Alert.alert('Escreva a mensagem para enviar.');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento?"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />
    
      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}