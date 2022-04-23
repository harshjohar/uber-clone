import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const data = [
    {
        id: "1",
        icon: "briefcase",
        location: "College",
        destination: "Punjab Engineering College, Sector 12, Chandigarh, India",
    },
    {
        id: "2",
        icon: "home",
        location: "Hostel",
        destination: "SHIVALIK HOSTEL, Sector 12, Chandigarh, India",
    },
];

const NavFavourites = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
                <TouchableOpacity style={tw`flex-row items-center p-5`}>
                    <Icon
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={item.icon}
                        type={"ionicon"}
                        color={"white"}
                        size={18}
                    />
                    <View>
                        <Text style={tw`font-semibold text-lg`}>
                            {item.location}
                        </Text>
                        <Text style={tw`text-gray-500`}>
                            {item.destination}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
                <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
            )}
        />
    );
};

export default NavFavourites;
