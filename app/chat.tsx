import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as React from "react";
import { Image, Keyboard, KeyboardEvent, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./chatStyles";

type Message = {
  text: string;
  isUser: boolean;
  time: string;
};

const Chat = () => {
  const greetings = [
    { msg1: "안녕! 나 제록이야!🦌✨", msg2: "오늘은 어떤 게 궁금해서 나를 찾아왔니?" },
    { msg1: "반가워! 제록이가 도와줄게!😊", msg2: "무엇이든 물어봐!" },
    { msg1: "어서와! 제주대 전문가 제록이야!🌿", msg2: "궁금한 거 있으면 말해줘!" },
    { msg1: "안녕하세요! 제록이예요!🦌", msg2: "오늘도 좋은 하루 되세요!" },
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [inputText, setInputText] = React.useState("");
  const [showQuickButtons, setShowQuickButtons] = React.useState(true);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);

  React.useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const getTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours < 12 ? "오전" : "오후";
    const hour12 = hours % 12 || 12;
    const formatted = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 ${ampm} ${hour12}:${minutes}`;
    return formatted;
  };

  const getShortTime = (fullTime: string) => {
    // "2026년 3월 19일 목요일 오후 7:48" → "오후 7:48"
    const parts = fullTime.split(" ");
    return parts.slice(4).join(" ");
  };

  const getDateOnly = (fullTime: string) => {
    // "2026년 3월 19일 목요일 오후 7:48" → "2026년 3월 19일 목요일"
    const parts = fullTime.split(" ");
    return parts.slice(0, 4).join(" ");
  };

  const sendMessage = (text: string) => {
    if (text.trim().length === 0) return;
    const time = getTime();
    setMessages(prev => [...prev, { text, isUser: true, time }]);
    setShowQuickButtons(false);
    setInputText("");

    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "답변을 불러오는 중...🔍",
        isUser: false,
        time: getTime(),
      }]);
    }, 1000);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { marginBottom: keyboardHeight }]}>

        {/* 상단 헤더 */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/chat_logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.headerIcons}>
            <Ionicons name="add" size={30} color="#000" />
            <Ionicons name="notifications-outline" size={30} color="#000" />
            <Ionicons name="menu" size={30} color="#000" />
          </View>
        </View>

        {/* 채팅 카드 */}
        <View style={styles.card}>
          <View style={styles.cardInner}>

            {/* 카드 상단 - 제록이 프로필 + X버튼 */}
            <View style={styles.cardHeader}>
              <View style={styles.profileRow}>
                <Image
                  source={require("../assets/images/제록이_얼굴.png")}
                  style={styles.profileImage}
                  resizeMode="contain"
                />
                <Text style={styles.profileName}>제록이</Text>
              </View>
              <TouchableOpacity style={styles.closeButton}>
                <Ionicons name="close" size={30} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* 스크롤 채팅 영역 */}
            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {/* 초기 인사 말풍선 */}
              <View style={styles.messageRow}>
                <Image
                  source={require("../assets/images/제록이_기본.png")}
                  style={styles.avatarIcon}
                  resizeMode="contain"
                />
                <View style={styles.messageContent}>
                  <View style={styles.messageBubbles}>
                    <View style={styles.bubble}>
                      <Text style={styles.bubbleText}>{randomGreeting.msg1}</Text>
                    </View>
                    <View style={styles.bubble}>
                      <Text style={styles.bubbleText}>{randomGreeting.msg2}</Text>
                    </View>
                  </View>
                  {showQuickButtons && (
                    <View style={styles.quickButtons}>
                      <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("📅 학사일정 확인하기")}>
                        <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>📅 학사일정 확인하기</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("🍱 오늘 학식 메뉴 뭐야?")}>
                        <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>🍱 오늘 학식 메뉴 뭐야?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("🎡 주변 맛집/편의시설")}>
                        <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>🎡 주변 맛집/편의시설</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("☎️ 학과 사무실 번호")}>
                        <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>☎️ 학과 사무실 번호</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              {/* 대화 메세지들 */}
              {messages.map((msg, index) => (
                <View key={index}>
                  {index === 0 && (
                    <Text style={styles.timestamp}>{getDateOnly(msg.time)}</Text>
                  )}
                  {msg.isUser ? (
                    <View style={styles.userMessageRow}>
                      <Text style={styles.messageTime}>{getShortTime(msg.time)}</Text>
                      <View style={styles.userBubble}>
                        <Text style={styles.userBubbleText}>{msg.text}</Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.jerokMessageRow}>
                      <Image
                        source={require("../assets/images/제록이_기본.png")}
                        style={styles.avatarIcon}
                        resizeMode="contain"
                      />
                      <View style={styles.bubble}>
                        <Text style={styles.bubbleText}>{msg.text}</Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>

            {/* 입력창 */}
            <View style={styles.inputBar}>
              <TextInput
                style={styles.inputText}
                placeholder="메세지를 입력하세요"
                placeholderTextColor="#979c9e"
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity onPress={() => sendMessage(inputText)}>
                <Text style={styles.sendIcon}>➤</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </View>
    </>
  );
};

export default Chat;