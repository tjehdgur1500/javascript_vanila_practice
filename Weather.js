import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

export default function Weather({temp}){
    return <View style={styles.container}><Text>{temp}</Text></View>
}

Weather.propTypes = {
    temp : PropTypes.number
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : "center",
        justifyContent : "center"
    }
})