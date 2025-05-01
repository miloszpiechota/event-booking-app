import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#fff",
    elevation: 4,
    position: "relative",
  },

  cardImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  cardDate: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },

  vipBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    zIndex: 10,
  },

  vipText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000",
  },

  quantityBadge: {
    position: "absolute",
    bottom: 20, // przesunięcie wyżej, by nie wchodził w overlay
    right: 12,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    opacity: 0.8,
    zIndex: 5,
  },

  quantityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2D0C57",
    textAlign: "center",
  },

  modalText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },

  qrContainer: {
    marginTop: 20,
    backgroundColor: "#F6F6F6",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  qrNote: {
    marginTop: 10,
    fontSize: 13,
    color: "#999",
    textAlign: "center",
  },

  modalButton: {
    marginTop: 20,
    backgroundColor: "#2D0C57",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
