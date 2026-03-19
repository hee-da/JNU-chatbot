import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");

const Login = () => {
	const router = useRouter();

  return (
	<>
		<Stack.Screen options={{ headerShown: false }} />
		<LinearGradient	
		style={styles.container}
		colors={["#4a89c5", "#004099"]}
		start={{ x: 0, y: 0 }}
		end={{ x: 0, y: 1 }}
		>
		{/* 제주대 로고 */}
		<Image
			source={require("../assets/images/login_logo.png")}
			style={styles.logo}
			resizeMode="contain"
		/>

		{/* 타이틀 */}
		<Text style={styles.title}>LOG IN</Text>

		{/* ID 입력 */}
		<Text style={styles.label}>ID (학번)</Text>
		<View style={styles.inputBox}>
			<Text style={styles.inputText}></Text>
		</View>

		{/* PW 입력 */}
		<Text style={styles.label}>PASSWORD</Text>
		<View style={styles.inputBox}>
			<Text style={styles.inputText}></Text>
		</View>

		{/* 로그인 버튼 */}
		<TouchableOpacity style={styles.button} onPress={() => router.replace("/chat")}>
 			<Text style={styles.buttonText}>로그인</Text>
		</TouchableOpacity>
		</LinearGradient>
	</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 50,
    paddingTop: 150,
  },
  logo: {
    width: 220,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 40,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  inputBox: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputText: {
    fontSize: 16,
    color: "#000",
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
    fontWeight: "700",
    color: "#4a89c5",
  },
});

export default Login;