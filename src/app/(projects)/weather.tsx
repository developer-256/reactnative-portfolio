import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [array, setArray] = useState<string[]>([]);
  const show = () => {
    setArray((prev) => [...prev, search]);
    setSearch("");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        style={{ flex: 1, opacity: 20, paddingHorizontal: 12, paddingTop: 20 }}
        colors={["#2E3358", "#1C1B33"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StatusBar backgroundColor={"#2E3358"} />
        <Text style={{ color: "#ffffff", fontSize: 32, fontWeight: 600 }}>
          Weather
        </Text>

        <LinearGradient
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 16,
          }}
          colors={["#1C1B33", "#1C1B33"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.1, y: 1 }}
        >
          <AntDesign name="search1" size={20} color="#EBEBF5" />
          <TextInput
            style={{ flex: 1, color: "#EBEBF5" }}
            placeholder="Search"
            placeholderTextColor={"#EBEBF5"}
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={show}
          />
        </LinearGradient>

        <ScrollView
          style={{
            marginTop: 40,
          }}
          contentContainerStyle={{ rowGap: 20 }}
        >
          {array.map((item, i) => (
            <Text key={i} style={{ color: "#ffffff", fontSize: 30 }}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Weather;
