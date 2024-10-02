import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTodoStore } from "@/src/Stores/TodoStore";
import { router } from "expo-router";

const Todo = () => {
  const [search, setSearch] = useState("");
  const fetchTodo = useTodoStore((state) => state.fetchTodos);
  const todos = useTodoStore((state) => state.todos) || [];
  const [loading, setloading] = useState(true);

  useEffect(() => {
    fetchTodo().then(() => setloading(false));
  }, [fetchTodo]);

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
          Todo
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
            placeholder="Search Todos"
            placeholderTextColor={"#EBEBF5"}
            value={search}
            onChangeText={setSearch}
            // onSubmitEditing={show}
          />
        </LinearGradient>

        {loading ? (
          <Text style={{ color: "#ffffff", fontSize: 20 }}>Loading...</Text>
        ) : (
          <ScrollView
            style={{
              marginTop: 40,
            }}
            contentContainerStyle={{ rowGap: 20 }}
            showsVerticalScrollIndicator={false}
          >
            {todos.length === 0 ? (
              <Text style={{ color: "#ffffff", fontSize: 20 }}>
                No Todos Available
              </Text>
            ) : (
              todos.map((item) => {
                let date = new Date(item.updatedAt);
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.id}
                    style={{
                      backgroundColor: "rgba(126, 100, 255, 1)",
                      borderRadius: 8,
                      padding: 16,
                    }}
                    onPress={() =>
                      router.push({
                        pathname: "/(projects)/todo/edit/[todoID]",
                        params: { todoID: item.id },
                      })
                    }
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{
                        color: "white",
                        minHeight: 50,
                        fontSize: 14,
                        marginTop: 12,
                      }}
                    >
                      {item.task}
                    </Text>
                    <Text
                      style={{ color: "white", marginTop: 12, fontSize: 10 }}
                    >
                      {date.toLocaleTimeString()}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
            <View style={{ height: 20 }}></View>
          </ScrollView>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Todo;
