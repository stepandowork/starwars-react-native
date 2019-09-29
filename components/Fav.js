import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import Swipeable from "react-native-gesture-handler/Swipeable";

const RightDelete = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 30
      }}
    >
      <Text style={{ color: "white", padding: 15 }}>Delete from favs</Text>
    </View>
  );
};

export class Fav extends Component {
  goToCharacter() {
    Actions.jump("character", { character: this.props.fav });
  }

  render() {
    let imageUri =
      this.props.fav.gender === "male"
        ? require("../assets/male.png")
        : require("../assets/female.png");
    return (
      <Swipeable
        renderRightActions={RightDelete}
        onSwipeableRightOpen={() => this.props.onSwipeFromRight(this.props.fav)}
      >
        <TouchableOpacity onPress={() => this.goToCharacter()}>
          <View style={styles.container}>
            <Image
              style={{ width: 40, height: 40, marginRight: 10 }}
              source={imageUri}
            />
            <Text>{this.props.fav.name}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
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

export default Fav;
