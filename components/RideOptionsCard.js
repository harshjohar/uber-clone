import {
    FlatList,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../redux/slices/navSlice";
import { useSelector } from "react-redux";

const data = [
    {
        id: "1",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn",
    },
    {
        id: "2",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8",
    },
    {
        id: "3",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf",
    },
];

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation)
    return (
        <View style={tw`bg-white flex-grow`}>
            {Platform.OS === "ios" && (
                <View style="">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("NavigateCard")}
                        style={tw`absolute top-2 left-5 p-3 py-2 z-50 rounded-full`}
                    >
                        <Icon name="chevron-left" type="fontawesome" />
                    </TouchableOpacity>
                    <Text style={tw`text-center py-2 text-xl`}>
                        Select a Ride - {travelTimeInformation?.distance?.text}
                    </Text>
                </View>
            )}
{/* 6,9 rupees/km */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${
                            item.id === selected?.id ? "bg-gray-200" : ""
                        }`}
                    >
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain",
                            }}
                            source={{ uri: item.image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>
                                {item.title}
                            </Text>
                            <Text>{travelTimeInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>&#x20B9; {Math.floor((travelTimeInformation?.distance?.value/100)*(item.multiplier))} </Text>
                    </TouchableOpacity>
                )}
            />
            {
                <View>
                    <TouchableOpacity
                        disabled={!selected}
                        style={tw`bg-black py-3 m-2 mb-10 ${
                            !selected ? "bg-gray-300" : ""
                        }`}
                    >
                        <Text style={tw`text-white text-xl text-center`}>
                            Choose {selected?.title}
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default RideOptionsCard;
