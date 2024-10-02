import {
  ModalProps,
  StyleSheet,
  View,
  Modal as RNModal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
type Props = ModalProps & {
  isOpen: boolean;
  withInput?: boolean;
};

const Modal = ({ isOpen, withInput, children, ...rest }: Props) => {
  const content = withInput ? (
    <KeyboardAvoidingView
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
      }}
    >
      {children}
    </View>
  );
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {content}
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({});
