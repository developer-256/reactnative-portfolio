import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const ColorChangerApp = () => {
  const [activeColor, setActiveColor] = useState("#ffffff");
  const bg = (color: string) => {
    if (activeColor === color) {
      return color;
    }
    return "#eeeeee";
  };
  return (
    <SafeAreaView style={{ backgroundColor: activeColor, flex: 1 }}>
      <StatusBar backgroundColor={activeColor} />
      <View
        style={{
          flex: 1,
          gap: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          paddingHorizontal: 12,
        }}
      >
        {colors.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={{
              alignItems: "center",
              width: 108,
              backgroundColor: bg(item.color),
              borderRadius: 5,
              paddingVertical: 10,
              paddingHorizontal: 4,
            }}
            onPress={() => setActiveColor(item.color)}
            activeOpacity={0.8}
          >
            <SingleColor color={item.color} />
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 500,
                marginTop: 8,
                color: "#333",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 20, marginHorizontal: 12 }}>
        <Text style={{ fontSize: 20 }}>Selected Color: {activeColor}</Text>
      </View>
    </SafeAreaView>
  );
};
export default ColorChangerApp;

const SingleColor = ({ color }: { color: string }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: 40,
        width: 40,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black",
      }}
    />
  );
};

const colors = [
  { name: "Vibrant Orange", color: "#FF5733" },
  { name: "Fresh Green", color: "#33FF57" },
  { name: "Bright Blue", color: "#3357FF" },
  { name: "Hot Pink", color: "#FF33A8" },
  { name: "Aqua Blue", color: "#33FFF6" },
  { name: "Deep Purple", color: "#A833FF" },
  { name: "Warm Tangerine", color: "#FF8C33" },
  { name: "Mint Green", color: "#33FFBE" },
  { name: "Electric Violet", color: "#5733FF" },
  { name: "Neon Pink", color: "#FF33D4" },
  { name: "Golden Yellow", color: "#FFD633" },
  { name: "Sky Blue", color: "#33D4FF" },
  { name: "Lime Green", color: "#A8FF33" },
  { name: "Coral Red", color: "#FF5733" },
  { name: "Neon Green", color: "#57FF33" },
  { name: "Magenta", color: "#FF33FF" },
  { name: "Cerulean", color: "#33A8FF" },
  { name: "Vivid Violet", color: "#D433FF" },
  { name: "Strawberry Red", color: "#FF3357" },
  { name: "Jade Green", color: "#33FF83" },
  { name: "White", color: "#ffffff" },
];
