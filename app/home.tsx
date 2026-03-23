import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as React from "react";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Chat from "./chat";
import { useChatContext } from "./chatContext";
import { styles } from "./homeStyles";

const Home = () => {
  const [chatVisible, setChatVisible] = React.useState(false);

  const { chatHistory, deleteChat } = useChatContext();
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
      <View style={styles.container}>

        {/* 상단 헤더 */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/chat_logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => setChatVisible(true)}>
              <Ionicons name="add" size={30} color="#000" />
            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={30} color="#000" />
            <Ionicons name="menu" size={30} color="#000" />
          </View>
        </View>

        {/* 떠있는 카드 */}
        <View style={styles.card}>
          <View style={styles.cardInner}>

            {/* 채팅 내역 타이틀 */}
            <View style={styles.titleRow}>
              <Text style={styles.title}>채팅 내역</Text>
              <View style={styles.titleIcons}>
                <Ionicons name="search-outline" size={24} color="#000" />
                <Ionicons name="trash-outline" size={24} color="#000" />
              </View>
            </View>

            <View style={styles.divider} />

            {/* 채팅 내역 리스트 */}
            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
              {chatHistory.map((item) => (
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
                      <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
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