import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";

export class Planet extends Component {
  goToResident() {
    Actions.jump("residents", { residents: this.props.planet.residents });
  }

  render() {
    let imageUri =
      this.props.planet.surface_water > 50
        ? require("../assets/planet.jpg")
        : require("../assets/desertPlanet.png");
    return (
      <TouchableOpacity onPress={() => this.goToResident()}>
        <View style={styles.container}>
          <Image source={imageUri} style={{ width: 40, height: 40 }} />
          <Text style={{ textAlign: "left", paddingLeft: 15 }}>
            {this.props.planet.name}
          </Text>
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

export default Planet;
