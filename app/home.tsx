import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Chat from "./chat";
import { useChatContext } from "./chatContext";
import { styles } from "./homeStyles";

const Home = () => {
  const [chatVisible, setChatVisible] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(false);
  
  const [searchText, setSearchText] = React.useState("");
  const [activeView, setActiveView] = React.useState<"chat" | "notification">("chat");

  const { chatHistory, deleteChat } = useChatContext();

  const filteredHistory = chatHistory.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const HighlightText = ({ text, highlight }: { text: string, highlight: string }) => {
    if (!highlight.trim()) return <Text style={styles.cardTitle}>{text}</Text>;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <Text style={styles.cardTitle}>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlightText}>{part}</Text>
          ) : (
            <Text key={index}>{part}</Text>
          )
        )}
      </Text>
    );
  };

  const renderRightActions = (id: number) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => deleteChat(id)}
    >
      <Ionicons name="trash-outline" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      <View style={styles.container}>

        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveView("chat")}>
            <Image
              source={require("../assets/images/아라봇_로고.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => setChatVisible(true)}>
              <Ionicons name="add" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveView("notification")}>
              <Ionicons name="notifications-outline" size={30} color="#000" />
            </TouchableOpacity>
            <Ionicons name="menu" size={30} color="#000" />
          </View>
        </View>

        {/* 떠있는 카드 */}
        <View style={styles.card}>
          <View style={styles.cardInner}>

            {activeView === "chat" ? (
              <>
                {/* 채팅 내역 타이틀 */}
                {searchVisible ? (
                  <View style={styles.titleRow}>
                    <TouchableOpacity
                      style={{ marginLeft: 15 }}
                      onPress={() => {
                        setSearchVisible(false);
                        setSearchText("");
                      }}
                    >
                      <Ionicons name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="검색어를 입력하세요"
                      placeholderTextColor="#bababa"
                      value={searchText}
                      onChangeText={setSearchText}
                      autoFocus={true}
                    />
                  </View>
                ) : (
                  <View style={styles.titleRow}>
                    <Text style={styles.title}>채팅</Text>
                    <View style={styles.titleIcons}>
                      <TouchableOpacity onPress={() => setSearchVisible(true)}>
                        <Ionicons name="search-outline" size={25} color="#000" />
                      </TouchableOpacity>
                      <Ionicons name="trash-outline" size={25} color="#000" />
                    </View>
                  </View>
                )}

                <View style={styles.divider} />

                {/* 채팅 내역 리스트 */}
                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                  {filteredHistory.map((item) => (
                    <Swipeable
                      key={item.id}
                      renderRightActions={() => renderRightActions(item.id)}
                      containerStyle={{ marginBottom: 9 }}
                    >
                      <TouchableOpacity
                        style={styles.historyCard}
                        onPress={() => setChatVisible(true)}
                      >
                        <View style={styles.cardContent}>
                          <HighlightText text={item.title} highlight={searchText} />
                          <Text style={styles.cardDate}>{item.date}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                      </TouchableOpacity>
                    </Swipeable>
                  ))}
                </ScrollView>

                {/* 채팅 시작하기 버튼 */}
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => setChatVisible(true)}
                >
                  <Text style={styles.startButtonText}>채팅 시작하기</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {/* 알림 화면 */}
                <View style={styles.titleRow}>
                  <Text style={styles.title}>알림</Text>
                  <View style={styles.titleIcons}>
                    <Ionicons name="search-outline" size={25} color="#000" />
                    <Ionicons name="trash-outline" size={25} color="#000" />
                  </View>
                </View>

                <View style={styles.divider} />

                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                </ScrollView>
              </>
            )}

          </View>
        </View>

      </View>

      {/* 채팅 Modal */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Chat onClose={() => setChatVisible(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;