import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";

const index = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        gap: 25,
        paddingHorizontal: 20,
      }}
    >
      {routes.map((Item, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18 }}>{Item.Name}</Text>
          <Link href={Item.Route} style={{ fontSize: 20 }}>
            Click Here
          </Link>
        </View>
      ))}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: { fontSize: 20 },
});

const routes: { Name: string; Route: Href }[] = [
  { Name: "Background Color: ", Route: "/(projects)/color" },
  { Name: "Weather App: ", Route: "/(projects)/weather" },
  { Name: "Todo App: ", Route: "/(projects)/todo" },
];
