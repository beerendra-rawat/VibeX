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

const PrivacyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.title}>Privacy Policy</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Intro Card */}
        <View style={styles.card}>
          <Text style={styles.heading}>Your Privacy Matters</Text>
          <Text style={styles.text}>
            VibeX respects your privacy. We do not collect or store personal
            data on external servers.
          </Text>
        </View>

        {/* Permission Section */}
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

        {/* Data Collection Section */}
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

        {/* Offline Section */}
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

        {/* Updates Section */}
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

export default PrivacyScreen;

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

  card: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },

  policyCard: {
    backgroundColor: "#1E293B",
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
    fontSize: 15,
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