import {
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    StatusBar,
} from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./screens/MapScreen";
import EatScreen from "./screens/EatScreen";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaView style={styles.AndroidSafeArea}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={
                            Platform.OS === "android" ? "height" : "padding"
                        }
                        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
                    >
                        <Stack.Navigator>
                            <Stack.Screen
                                name="HomeScreen"
                                component={HomeScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="MapScreen"
                                component={MapScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="EatScreen"
                                component={EatScreen}
                                options={{ headerShown: false }}
                            />
                        </Stack.Navigator>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </NavigationContainer>
        </Provider>
    );
}

// for the safe area in android
const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "white",
        paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    },
});
