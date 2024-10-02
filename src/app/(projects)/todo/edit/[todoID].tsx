import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useTodoStore } from "@/src/Stores/TodoStore";
import { StatusBar } from "expo-status-bar";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Modal from "@/src/components/Modal";

const TodoEdit = () => {
  // getting params
  const { todoID } = useLocalSearchParams<{ todoID: string }>();

  // fetching data and functions from zustand
  const thisTODO = useTodoStore((state) => state.todos).find(
    (item) => item.id === Number(todoID)
  );
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  // defining states
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // setting data in states on first render
  useEffect(() => {
    if (thisTODO) {
      setTitle(thisTODO.title);
      setTask(thisTODO.task);
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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Link href={"/todo"}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Link>

          <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
            Edit
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <MaterialCommunityIcons
            name="delete"
            size={22}
            color="white"
            disabled={!thisTODO}
            onPress={() => {
              setIsModalOpen(true);
            }}
          />

          <Entypo
            name="save"
            size={21}
            color="white"
            disabled={!thisTODO}
            onPress={() => {
              console.log("pressed");

              if (!!thisTODO) {
                if (thisTODO.title !== title || thisTODO.task !== task) {
                  updateTodo(title, task, thisTODO.id).then((status) => {
                    console.log("status", status);

                    if (status === "success") {
                      router.push("/(projects)/todo");
                    }
                  });
                } else {
                  console.log("Nothing changed");
                }
              }
            }}
          />
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
            value={task}
            onChangeText={setTask}
          />
        </ScrollView>
      </View>

      <Modal isOpen={isModalOpen}>
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            padding: 20,
            width: "90%",
            minHeight: 150,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16 }}>
            Are you sure you want to{" "}
            <Text style={{ color: "red" }}>delete</Text>
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
              marginTop: 24,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 6,
                paddingVertical: 8,
                paddingHorizontal: 15,
                backgroundColor: "#ccc",
                justifyContent: "center",
                alignItems: "center",
              }}
              activeOpacity={0.6}
              onPress={() => setIsModalOpen(false)}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderRadius: 6,
                paddingVertical: 8,
                paddingHorizontal: 15,
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (!!thisTODO) {
                  deleteTodo(thisTODO.id).then((status) => {
                    console.log("status", status);

                    if (status === "success") {
                      setIsModalOpen(false);
                      router.push("/(projects)/todo");
                    }
                  });
                }
              }}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
