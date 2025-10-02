import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COLORS = {
  deepGreen: '#2C6E49',
  mediumGreen: '#4C956C', 
  cream: '#FEFEE3',
  coral: '#FFC9B9',
  gold: '#D68C45',
};

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatbotDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatbotDialogRN({ isOpen, onClose }: ChatbotDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Wayonara, your AI travel assistant. How can I help you plan your perfect trip today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');

  const predefinedResponses = [
    "That sounds like an amazing destination! I'd love to help you plan that trip.",
    "Great choice! Here are some recommendations for your travel plans...",
    "I can help you find the best flights, accommodations, and activities for that location.",
    "Let me suggest some hidden gems and local experiences you might enjoy!",
    "That's a wonderful time to visit! The weather should be perfect for exploring."
  ];

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: predefinedResponses[Math.floor(Math.random() * predefinedResponses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <LinearGradient
        colors={[COLORS.deepGreen, COLORS.mediumGreen]}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <BlurView intensity={80} style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <View style={styles.avatar}>
                <MaterialIcons name="chat" size={24} color={COLORS.deepGreen} />
              </View>
              <View>
                <Text style={styles.headerTitle}>Wayonara</Text>
                <Text style={styles.headerSubtitle}>AI Travel Assistant</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={24} color={COLORS.cream} />
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Messages */}
        <ScrollView 
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageWrapper,
                message.isUser ? styles.userMessageWrapper : styles.botMessageWrapper,
              ]}
            >
              <BlurView
                intensity={80}
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.isUser ? styles.userText : styles.botText,
                  ]}
                >
                  {message.text}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    message.isUser ? styles.userTime : styles.botTime,
                  ]}
                >
                  {formatTime(message.timestamp)}
                </Text>
              </BlurView>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.inputContainer}
        >
          <BlurView intensity={80} style={styles.inputWrapper}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Ask me about your travel plans..."
                placeholderTextColor={`${COLORS.cream}99`}
                multiline
                returnKeyType="send"
                onSubmitEditing={sendMessage}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  inputText.trim() ? styles.sendButtonActive : {},
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <MaterialIcons 
                  name="send" 
                  size={20} 
                  color={inputText.trim() ? COLORS.deepGreen : `${COLORS.cream}66`} 
                />
              </TouchableOpacity>
            </View>
          </BlurView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: `${COLORS.deepGreen}33`,
    borderBottomWidth: 1,
    borderBottomColor: `${COLORS.cream}1A`,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.cream,
  },
  headerSubtitle: {
    fontSize: 14,
    color: `${COLORS.cream}CC`,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.cream}1A`,
    borderWidth: 1,
    borderColor: `${COLORS.cream}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
    gap: 16,
  },
  messageWrapper: {
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  botMessageWrapper: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  userBubble: {
    backgroundColor: `${COLORS.coral}33`,
    borderColor: `${COLORS.coral}4D`,
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: `${COLORS.cream}1A`,
    borderColor: `${COLORS.cream}33`,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: COLORS.cream,
  },
  botText: {
    color: COLORS.cream,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 8,
  },
  userTime: {
    color: `${COLORS.cream}99`,
    textAlign: 'right',
  },
  botTime: {
    color: `${COLORS.cream}99`,
  },
  inputContainer: {
    paddingBottom: 20,
  },
  inputWrapper: {
    margin: 20,
    borderRadius: 16,
    backgroundColor: `${COLORS.cream}1A`,
    borderWidth: 1,
    borderColor: `${COLORS.cream}33`,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    gap: 12,
  },
  textInput: {
    flex: 1,
    color: COLORS.cream,
    fontSize: 16,
    maxHeight: 100,
    minHeight: 24,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${COLORS.cream}1A`,
    borderWidth: 1,
    borderColor: `${COLORS.cream}33`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});