import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  headerLogo: {
    width: 150,
    height: 65,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 25,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4.5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  cardInner: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    padding: 0,  // 패딩 제거
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#292929",
    textAlign: "center",
  },
  titleIcons: {
    flexDirection: "row",
    gap: 15,
    position: "absolute",
    right: 20,
  },
  divider: {
    height: 3,
    backgroundColor: "#c4c4c4",
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  historyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9e9eb",
    borderRadius: 13,
    padding: 16,
    height: 70,
  },
  cardContent: {
    flex: 1,
    gap: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#292929",
  },
  cardDate: {
    fontSize: 10,
    color: "#6e6e6e",
  },
  startButton: {
    backgroundColor: "#000",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 40,
    paddingTop: 140,
  },
  modalCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4.5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    overflow: "hidden",
  },
  deleteButtonContainer: {
    justifyContent: "center",
    marginBottom: 9,
    height: 70,  // historyCard랑 같은 높이
  },
  deleteButton: {
    backgroundColor: "#ff4444",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    borderRadius: 13,
    height: 70,  // historyCard랑 같은 높이
  },
});