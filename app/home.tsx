import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Animated, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Chat from "./chat";
import { useChatContext } from "./chatContext";
import { styles } from "./homeStyles";

const Home = () => {
  const [chatVisible, setChatVisible] = React.useState(false);
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [activeView, setActiveView] = React.useState<"chat" | "notification">("chat");
  const [selectedChatId, setSelectedChatId] = React.useState<number | null>(null);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [displayOpen, setDisplayOpen] = React.useState(false);
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const router = useRouter();

  const { chatHistory, deleteChat } = useChatContext();
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = React.useRef(new Animated.Value(screenWidth)).current;

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

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const deleteSelected = () => {
    selectedIds.forEach(id => deleteChat(id));
    setSelectedIds([]);
    setDeleteMode(false);
  };

  const cardAnim = React.useRef(new Animated.Value(600)).current;

  // chatVisible이 바뀔 때마다 애니메이션 실행
  React.useEffect(() => {
    if (chatVisible) {
      Animated.timing(cardAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      cardAnim.setValue(600);
    }
  }, [chatVisible]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />
      <View style={styles.container}>

        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveView("chat")}>
            <Image
              source={require("../assets/images/아라톡_로고_흰.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => {
              setSelectedChatId(null);
              setChatVisible(true);
            }}>
              <Ionicons name="add" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveView("notification")}>
              <Ionicons name="notifications-outline" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openMenu}>
              <Ionicons name="menu" size={30} color="#000" />
            </TouchableOpacity>
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
                      <TouchableOpacity onPress={() => {
                        setDeleteMode(!deleteMode);
                        setSelectedIds([]);
                      }}>
                        <Ionicons name="trash-outline" size={25} color={deleteMode ? "#ff4444" : "#000"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View style={styles.divider} />

                {/* 채팅 내역 리스트 */}
                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                  {filteredHistory.map((item) => (
                    deleteMode ? (
                      <TouchableOpacity
                        key={item.id}
                        style={[styles.historyCard, { marginBottom: 9 }]}
                        onPress={() => toggleSelect(item.id)}
                      >
                        <Ionicons
                          name={selectedIds.includes(item.id) ? "checkbox" : "square-outline"}
                          size={22}
                          color={selectedIds.includes(item.id) ? "#004099" : "#999"}
                          style={{ marginRight: 10 }}
                        />
                        <View style={styles.cardContent}>
                          <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                          <Text style={styles.cardDate}>{item.date}</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Swipeable
                        key={item.id}
                        renderRightActions={() => renderRightActions(item.id)}
                        containerStyle={{ marginBottom: 9 }}
                      >
                        <TouchableOpacity
                          style={styles.historyCard}
                          onPress={() => {
                            setSelectedChatId(item.id);
                            setChatVisible(true);
                          }}
                        >
                          <View style={styles.cardContent}>
                            <HighlightText text={item.title} highlight={searchText} />
                            <Text style={styles.cardDate}>{item.date}</Text>
                          </View>
                          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
                        </TouchableOpacity>
                      </Swipeable>
                    )
                  ))}
                </ScrollView>

                {/* 채팅 시작하기 / 삭제 버튼 */}
                {deleteMode ? (
                  <TouchableOpacity
                    style={[styles.startButton, { backgroundColor: selectedIds.length > 0 ? "#ff4444" : "#999" }]}
                    onPress={deleteSelected}
                    disabled={selectedIds.length === 0}
                  >
                    <Text style={styles.startButtonText}>
                      {selectedIds.length > 0
                        ? `${selectedIds.length}개 삭제하기`
                        : chatHistory.length === 0
                        ? "삭제할 채팅이 없습니다"
                        : "삭제할 항목을 선택해주세요"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                      setSelectedChatId(null);
                      setChatVisible(true);
                    }}
                  >
                    <Text style={styles.startButtonText}>채팅 시작하기</Text>
                  </TouchableOpacity>
                )}
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
        animationType="none"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setChatVisible(false)}
          />
          <Animated.View style={[styles.modalCard, { transform: [{ translateY: cardAnim }] }]}>
            <Chat onClose={() => setChatVisible(false)} chatId={selectedChatId} />
          </Animated.View>
        </View>
      </Modal>

      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={closeMenu}
          />
          <Animated.View style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>MENU</Text>
            </View>

            <View style={styles.menuItems}>
              <Text style={styles.menuSectionTitle}>Account</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="person-outline" size={22} color="#292929" />
                <Text style={styles.menuItemText}>계정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="notifications-outline" size={22} color="#292929" />
                <Text style={styles.menuItemText}>알림 설정</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => setDisplayOpen(!displayOpen)}>
                <Ionicons name="phone-portrait-outline" size={22} color="#292929" />
                <Text style={styles.menuItemText}>디스플레이</Text>
                <Ionicons
                  name={displayOpen ? "chevron-up-outline" : "chevron-down-outline"}
                  size={16}
                  color="#999"
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
              {displayOpen && (
                <View style={styles.subMenuItems}>
                  <TouchableOpacity style={styles.subMenuItem}>
                    <Ionicons name="globe-outline" size={18} color="#666" />
                    <Text style={styles.subMenuItemText}>언어</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subMenuItem}>
                    <Ionicons name="text-outline" size={18} color="#666" />
                    <Text style={styles.subMenuItemText}>텍스트 크기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subMenuItem}>
                    <Ionicons name="moon-outline" size={18} color="#666" />
                    <Text style={styles.subMenuItemText}>화면 모드</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="chatbubbles-outline" size={22} color="#292929" />
                <Text style={styles.menuItemText}>채팅 서랍</Text>
              </TouchableOpacity>

              <Text style={[styles.menuSectionTitle, { marginTop: 20 }]}>Community</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="library-outline" size={22} color="#292929" />
                <Text style={styles.menuItemText}>책물림</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.logoutItem}
              onPress={() => router.replace("/login")}
            >
              <Ionicons name="log-out-outline" size={22} color="#292929" />
              <Text style={styles.menuItemText}>로그아웃</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default Home;