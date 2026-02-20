import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function HelpAndSupportScreen({ navigation }){
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@vibexmusic.com");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnWrap}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.heading}>Need Help?</Text>
          <Text style={styles.text}>
            If you're experiencing issues with VibeX, we’re here to help you
            quickly and smoothly.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqCard}>
          <View style={styles.faqRow}>
            <Ionicons name="musical-notes-outline" size={18} color="#6366F1" />
            <Text style={styles.question}>Songs not loading?</Text>
          </View>
          <Text style={styles.answer}>
            Make sure storage permission is granted in device settings.
          </Text>
        </View>
        <View style={styles.faqCard}>
          <View style={styles.faqRow}>
            <Ionicons name="play-circle-outline" size={18} color="#22D3EE" />
            <Text style={styles.question}>Music not playing?</Text>
          </View>
          <Text style={styles.answer}>
            Check if the file is corrupted and ensure volume is up.
          </Text>
        </View>
        <View style={styles.faqCard}>
          <View style={styles.faqRow}>
            <Ionicons name="cloud-offline-outline" size={18} color="#F472B6" />
            <Text style={styles.question}>Does VibeX work offline?</Text>
          </View>
          <Text style={styles.answer}>
            Yes! VibeX is designed as a fully offline music player.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            If your issue is not resolved, feel free to contact us.
          </Text>
          <TouchableOpacity style={styles.contactBtn} onPress={handleEmailPress}>
            <Ionicons name="mail" size={18} color="#FFFFFF" />
            <Text style={styles.contactText}> Email Support</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            We usually respond within 24–48 hours.
          </Text>
        </View>
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
  heading: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  text: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },
  faqCard: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 14,
    marginBottom: 15,
  },
  faqRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  question: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  answer: {
    color: "#94A3B8",
    fontSize: 13,
    marginLeft: 26,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
  },
  contactText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  footerText: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
});