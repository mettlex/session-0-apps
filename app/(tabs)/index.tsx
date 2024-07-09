import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Button, TextInput, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [text, setText] = useState("");

  const colorScheme = useColorScheme();

  let textColor = "text-black";

  if (colorScheme === "dark") textColor = "text-slate-50";

  let boderColor = "border-black";

  if (colorScheme === "dark") boderColor = "border-white";

  useEffect(() => {
    async function load() {
      const savedText = await AsyncStorage.getItem("note");

      if (savedText) {
        setText(savedText);
      }
    }

    load();
  }, []);

  return (
    <View>
      <SafeAreaView>
        <View className="dark:bg-blue-300"></View>

        <TextInput
          className={`border-2 border-black p-2 px-4 mx-2 text-2xl rounded-full ${textColor} ${boderColor}`}
          value={text}
          onChangeText={(value) => {
            setText(value);
          }}
        />

        <Button
          title="Save"
          onPress={async () => {
            try {
              await AsyncStorage.setItem("note", text.toUpperCase());

              Alert.alert("Saved!");

              setText("");
            } catch (error) {
              Alert.alert(error as string);
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}
