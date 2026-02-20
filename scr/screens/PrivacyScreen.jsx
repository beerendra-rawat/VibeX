import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function PrivacyScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnWrap}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>Your Privacy Matters</Text>
          <Text style={styles.text}>
            VibeX respects your privacy. We do not collect or store personal
            data on external servers.
          </Text>
        </View>
        <View style={styles.policyCard}>
          <View style={styles.row}>
            <Ionicons name="folder-open-outline" size={20} color="#6366F1" />
            <Text style={styles.subHeading}>Permissions</Text>
          </View>
          <Text style={styles.text}>
            VibeX requests storage permission only to access and play music
            stored on your device. Files are never uploaded.
          </Text>
        </View>
        <View style={styles.policyCard}>
          <View style={styles.row}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#22D3EE" />
            <Text style={styles.subHeading}>Data Collection</Text>
          </View>
          <Text style={styles.text}>
            We do not collect personal information such as name, email, or
            location without your consent.
          </Text>
        </View>
        <View style={styles.policyCard}>
          <View style={styles.row}>
            <Ionicons name="cloud-offline-outline" size={20} color="#F472B6" />
            <Text style={styles.subHeading}>Offline Usage</Text>
          </View>
          <Text style={styles.text}>
            VibeX is designed as a fully offline music player. Your data stays
            completely on your device.
          </Text>
        </View>
        <View style={styles.policyCard}>
          <View style={styles.row}>
            <Ionicons name="refresh-outline" size={20} color="#FACC15" />
            <Text style={styles.subHeading}>Policy Updates</Text>
          </View>
          <Text style={styles.text}>
            This privacy policy may be updated in future versions. Please
            review this page periodically.
          </Text>
        </View>
        <Text style={styles.footer}>
          For privacy concerns, contact VibeX Support.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  btnWrap: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  policyCard: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeading: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  text: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
    marginTop: 15,
  },
});