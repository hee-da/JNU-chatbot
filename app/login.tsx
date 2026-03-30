import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

const Login = () => {
  const router = useRouter();
  const [autoLogin, setAutoLogin] = React.useState(false);
  const scrollRef = React.useRef<ScrollView>(null);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {/* 아라봇 로고 */}
        <Image
          source={require("../assets/images/아라톡_로고_흰.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 타이틀 */}
        <Text style={styles.title}>LOG IN</Text>

        {/* ID 입력 */}
        <TextInput
          style={styles.inputBox}
          placeholder="ID (학번)"
          placeholderTextColor="#7aaace"
          onFocus={() => scrollRef.current?.scrollToEnd({ animated: true })}
        />

        {/* PW 입력 */}
        <TextInput
          style={styles.inputBox}
          placeholder="PASSWORD"
          placeholderTextColor="#7aaace"
          secureTextEntry={true}
          onFocus={() => scrollRef.current?.scrollToEnd({ animated: true })}
        />

        {/* 자동 로그인 체크박스 */}
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setAutoLogin(!autoLogin)}
        >
          <Ionicons
            name={autoLogin ? "checkbox" : "square-outline"}
            size={20}
            color="#004099"
          />
          <Text style={styles.checkLabel}>자동 로그인</Text>
        </TouchableOpacity>

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.button} onPress={() => router.replace("/home")}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 50,
    paddingTop: 120,
    paddingBottom: 300,
    backgroundColor: "#d4e4f0",
  },
  logo: {
    width: 220,
    height: 105,
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#004099",
    marginBottom: 40,
  },
  inputBox: {
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 18,
    color: "#292929",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  checkLabel: {
    fontSize: 16,
    color: "#004099",
    fontWeight: "700",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#004099",
  },
});

export default Login;