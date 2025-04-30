// OrderTicketCard.styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    backgroundColor: "#abc2ff",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketInfo: {
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: "#333",
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  qrSection: {
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
});

export default styles;
