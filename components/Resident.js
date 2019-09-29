import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Actions } from "react-native-router-flux";
import { Image } from "react-native-elements";

export class Resident extends Component {
  goToCharacter() {
    Actions.jump("character", {
      character: this.props.resident,
      title: this.props.resident.name
    });
  }

  render() {
    let imageUri =
      this.props.resident.gender === "male"
        ? require("../assets/male.png")
        : require("../assets/female.png");
    return (
      <TouchableOpacity onPress={() => this.goToCharacter()}>
        <View style={styles.container}>
          <Image
            style={{ width: 40, height: 40, marginRight: 10 }}
            source={imageUri}
          />
          <Text>{this.props.resident.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 15
  }
});

export default Resident;
