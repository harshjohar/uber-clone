import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../redux/slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <View style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good Morning!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        styles={toInputBoxStyles}
                        placeholder="Where to?"
                        debounce={400}
                        nearbyPlacesAPI={"GooglePlacesSearch"}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: "en",
                        }}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description,
                                })
                            );

                            navigation.navigate("RideOptionsCard");
                        }}
                    />
                </View>
                <NavFavourites />
            </View>

            <View
                style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("RideOptionsCard")}
                    style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
                >
                    <Icon
                        type="font-awesome"
                        name="car"
                        size={16}
                        color={"white"}
                    />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={tw`flex flex-row w-24 px-4 py-3 rounded-full justify-between`}
                >
                    <Icon
                        type="ionicon"
                        name="fast-food-outline"
                        size={16}
                        color={"black"}
                    />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 10,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});
