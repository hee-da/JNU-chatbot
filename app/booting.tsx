import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Booting = () => {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000); // 2초 후 로그인으로 이동

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={require("../assets/images/booting.png")}
        style={styles.container}
        resizeMode="cover"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Booting;