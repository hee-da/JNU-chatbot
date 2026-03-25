import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const Booting = () => {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <ImageBackground
        source={require("../assets/images/booting (1).png")}
        style={styles.container}
        resizeMode="cover"
      >
        <View style={styles.footer}>
          <Text style={styles.copyright}>
            Copyright (c) 2024 JEJU NATIONAL UNIVERSITY. ALL RIGHTS RESERVE.
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  copyright: {
    fontSize: 8,
    color: "#fff",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});

export default Booting;