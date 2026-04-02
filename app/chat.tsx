import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { Image, Keyboard, KeyboardEvent, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useChatContext } from "./chatContext";
import { styles } from "./chatStyles";

const BACKEND_URL = "http://여기에_백엔드_주소"; // 배포 후 변경

type Message = {
  text: string;
  isUser: boolean;
  time: string;
  image?: any;
};

type Props = {
  onClose?: () => void;
  chatId?: number | null;
};

const Chat = (props: Props) => {
  const greetings = [
    { msg1: "안녕! 나 제록이야!🦌✨", msg2: "오늘은 어떤 게 궁금해서 나를 찾아왔니?" },
    { msg1: "반가워! 제록이가 도와줄게!😊", msg2: "무엇이든 물어봐!" },
    { msg1: "어서와! 제주대 전문가 제록이야!🌿", msg2: "궁금한 거 있으면 말해줘!" },
    { msg1: "안녕하세요! 제록이예요!🦌", msg2: "오늘도 좋은 하루 되세요!" },
  ];

  const jerokImages = [
    require("../assets/images/제록이_기본.png"),
    require("../assets/images/제록이_공부.png"),
    require("../assets/images/제록이_귤.png"),
    require("../assets/images/제록이_기대.png"),
    require("../assets/images/제록이_반짝.png"),
    require("../assets/images/제록이_점프.png"),
    require("../assets/images/제록이_학잠.png"),
    require("../assets/images/제록이_하트.png"),
  ];

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  const scrollViewRef = React.useRef<ScrollView>(null);
  const [inputText, setInputText] = React.useState("");
  const [showQuickButtons, setShowQuickButtons] = React.useState(true);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [currentChatId, setCurrentChatId] = React.useState<number | null>(null);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const { addChat, updateChatContent, addMessage, chatHistory } = useChatContext();

  React.useEffect(() => {
    if (props.chatId) {
      const existing = chatHistory.find(c => c.id === props.chatId);
      if (existing && existing.messages.length > 0) {
        setMessages(existing.messages);
        setShowQuickButtons(false);
      }
    }
  }, [props.chatId]);

  React.useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e: KeyboardEvent) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0)
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
    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일 ${ampm} ${hour12}:${minutes}`;
  };

  const getShortTime = (fullTime: string) => fullTime.split(" ").slice(4).join(" ");
  const getDateOnly = (fullTime: string) => fullTime.split(" ").slice(0, 4).join(" ");

  const sendMessage = async (text: string, isQuickBtn: boolean = false) => {
    if (text.trim().length === 0) return;
    const time = getTime();
    let chatId = props.chatId ?? currentChatId;

    if (messages.length === 0 && !props.chatId) {
      const newId = addChat(
        isQuickBtn ? text : (text.length > 20 ? text.slice(0, 20) + "..." : text),
        time,
        text
      );
      setCurrentChatId(newId);
      chatId = newId;
    } else if (props.chatId) {
      updateChatContent(props.chatId, text);
    } else if (currentChatId !== null) {
      updateChatContent(currentChatId, text);
    }

    const userMessage: Message = { text, isUser: true, time };
    setMessages(prev => [...prev, userMessage]);
    if (chatId) addMessage(chatId, userMessage);
    setShowQuickButtons(false);
    setInputText("");

    // 로딩 메시지 먼저 표시
    const randomImage = jerokImages[Math.floor(Math.random() * jerokImages.length)];
    const loadingMessage: Message = {
      text: "답변을 불러오는 중...🔍",
      isUser: false,
      time: getTime(),
      image: randomImage,
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await response.json();

      const botMessage: Message = {
        text: data.answer,
        isUser: false,
        time: getTime(),
        image: randomImage,
      };
      // 로딩 메시지를 실제 답변으로 교체
      setMessages(prev => [...prev.slice(0, -1), botMessage]);
      if (chatId) addMessage(chatId, botMessage);

    } catch (error) {
      const errorMessage: Message = {
        text: "답변을 불러오지 못했어요 😢 다시 시도해줘!",
        isUser: false,
        time: getTime(),
        image: randomImage,
      };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
      if (chatId) addMessage(chatId, errorMessage);
    }
  };

  return (
    <View style={[styles.cardInner, { marginBottom: keyboardHeight }]}>

      {/* 카드 상단 - 제록이 프로필 + 더보기 버튼 */}
      <View style={styles.cardHeader}>
        <View style={styles.profileRow}>
          <Image
            source={require("../assets/images/제록이_얼굴.png")}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <Text style={styles.profileName}>제록이</Text>
        </View>
        <TouchableOpacity style={styles.popupButton} onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* 팝업 메뉴 */}
      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.menuBackdrop}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
          <View style={styles.popupMenu}>
            <TouchableOpacity style={styles.popupItem} onPress={() => {
              setMenuVisible(false);
              props.onClose?.();
            }}>
              <Text style={styles.popupItemText}>채팅창 닫기</Text>
            </TouchableOpacity>
            <View style={styles.popupDivider} />
            <TouchableOpacity style={styles.popupItem} onPress={() => setMenuVisible(false)}>
              <Text style={styles.popupItemText}>채팅 보관하기</Text>
            </TouchableOpacity>
            <View style={styles.popupDivider} />
            <TouchableOpacity style={styles.popupItem} onPress={() => setMenuVisible(false)}>
              <Text style={styles.popupItemText}>답변 수정 요청</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

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
            source={require("../assets/images/제록이_학잠.png")}
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
                <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("📅 학사일정 확인하기", true)}>
                  <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>📅 학사일정 확인하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("🍱 오늘 학식 메뉴 뭐야?", true)}>
                  <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>🍱 오늘 학식 메뉴 뭐야?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("☔ 지금 학교 날씨 알려줘!", true)}>
                  <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>☔ 지금 학교 날씨 알려줘!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickBtn} onPress={() => sendMessage("📊 내 성적 분석 & 목표 세우기", true)}>
                  <Text style={styles.quickBtnText} adjustsFontSizeToFit numberOfLines={1}>📊 내 성적 분석 & 목표 세우기</Text>
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
                  source={msg.image ?? require("../assets/images/제록이_기본.png")}
                  style={styles.avatarIcon}
                  resizeMode="contain"
                />
                <View style={{ flexShrink: 1 }}>
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>{msg.text}</Text>
                  </View>
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
  );
};

export default Chat;