import React from "react";
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

const AboutAppScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.title}>About VibeX</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoCircle}>
            <Ionicons name="musical-notes" size={40} color="#22D3EE" />
          </View>
          <Text style={styles.appName}>VibeX</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* About Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About App</Text>
          <Text style={styles.text}>
            VibeX is a lightweight offline music player designed to give
            smooth and powerful listening experience.
          </Text>
        </View>

        {/* Features Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Features</Text>

          <View style={styles.featureRow}>
            <Ionicons name="play-circle" size={22} color="#6366F1" />
            <Text style={styles.featureText}>Offline Playback</Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons name="shuffle" size={22} color="#22D3EE" />
            <Text style={styles.featureText}>Shuffle & Repeat</Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons name="headset" size={22} color="#F472B6" />
            <Text style={styles.featureText}>Background Support</Text>
          </View>

          <View style={styles.featureRow}>
            <Ionicons name="sparkles" size={22} color="#FACC15" />
            <Text style={styles.featureText}>Modern UI</Text>
          </View>
        </View>

        {/* Developer Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Developer</Text>
          <Text style={styles.text}>
            Developed with ❤️ for music lovers.
          </Text>
        </View>

        <Text style={styles.footer}>
          © 2026 VibeX Music Player
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  logoSection: {
    alignItems: "center",
    marginVertical: 25,
  },

  logoCircle: {
    width: 85,
    height: 85,
    borderRadius: 42,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },

  version: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  text: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  featureText: {
    color: "#E2E8F0",
    fontSize: 14,
    marginLeft: 12,
  },

  footer: {
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});