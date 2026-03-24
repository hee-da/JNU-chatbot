import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  headerLogo: {
    width: 150,
    height: 57,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  cardInner: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  cardHeader: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 5,
  },
  profileRow: {
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  profileName: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 4,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 12,
  },
  divider: {
    height: 3,
    backgroundColor: "#c4c4c4",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  jerokMessageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    marginBottom: 8,
  },
  avatarIcon: {
    width: 40,
    height: 40,
  },
  messageContent: {
    maxWidth: "95%",
    gap: 8,
  },
  messageBubbles: {
    gap: 4,
  },
  bubble: {
    backgroundColor: "#e9e9eb",
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  bubbleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  userMessageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: "#004099",
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxWidth: "75%",
  },
  userBubbleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  timestamp: {
    fontSize: 12,
    color: "#828282",
    textAlign: "center",
    marginVertical: 8,
  },
  messageTime: {
    fontSize: 10,
    color: "#828282",
    alignSelf: "flex-end",
    marginRight: 6,
    marginBottom: 2,
  },
  quickButtons: {
    gap: 8,
  },
  quickBtn: {
    backgroundColor: "#eee",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  quickBtnText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#979c9e",
    borderRadius: 48,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 16,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  sendIcon: {
    fontSize: 18,
    color: "#979c9e",
  },
});