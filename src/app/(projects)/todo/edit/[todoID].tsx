import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useTodoStore } from "@/src/Stores/TodoStore";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

const TodoEdit = () => {
  const { todoID } = useLocalSearchParams<{ todoID: string }>();
  const thisTODO = useTodoStore((state) => state.todos).find(
    (item) => item.id === Number(todoID)
  );
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (thisTODO) {
      setTitle(thisTODO.title);
      setBody(thisTODO.task);
    }
  }, [thisTODO]);

  return (
    <View style={styles.wrapper}>
      <StatusBar style="light" backgroundColor="#7E64FF" />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Link href={"/todo"}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </Link>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <MaterialCommunityIcons name="delete" size={22} color="white" />
          <Pressable
            disabled={!thisTODO}
            onPress={() => {
              if (!!thisTODO) {
                updateTodo(title, body, thisTODO.id).then((status) => {
                  console.log("status", status);

                  if (status === "success") {
                    router.push("/(projects)/todo");
                  }
                });
              }
            }}
          >
            <Entypo name="save" size={21} color="white" />
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 24, flex: 1 }}>
        <TextInput
          placeholder="Add title"
          placeholderTextColor={"white"}
          style={{ fontSize: 20, color: "white" }}
          maxLength={60}
          value={title}
          onChangeText={setTitle}
        />

        <ScrollView
          contentContainerStyle={{
            marginTop: 12,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            placeholder="Add Your Task"
            style={{
              fontSize: 16,
              color: "white",
              height: "100%",
              textAlignVertical: "top",
            }}
            placeholderTextColor={"white"}
            multiline
            value={body}
            onChangeText={setBody}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default TodoEdit;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#7E64FF",
    flex: 1,
    paddingHorizontal: 24,
  },
});
