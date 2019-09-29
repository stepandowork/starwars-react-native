import React, { Component } from "react";
import { Text, View, AsyncStorage, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { FrameAttribute } from "expo/build/AR";
import { Card, Image } from "react-native-elements";

export class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: null,
      favsUpdated: false
    };
    this.setFavs = this.setFavs.bind(this);
    this.changeRightTitle = this.changeRightTitle.bind(this);
  }

  async getFavs() {
    let favs = await AsyncStorage.getItem("favs");
    this.setState({
      favs
    });
  }

  static onRight() {
    const c = Actions.refs.character;
    c.setFavs();
  }

  setFavs() {
    let favsContainCharacter;
    if (
      !this.state.favs ||
      this.state.favs === "null" ||
      this.state.favs === "undefined"
    ) {
      favsContainCharacter = [];
    } else {
      favsContainCharacter = this.state.favs.filter(
        fav => fav.name === this.props.character.name
      );
    }
    if (favsContainCharacter.length > 0) {
      let favs = this.state.favs.filter(
        fav => fav.name !== this.props.character.name
      );
      this.setState({ favs, favsUpdated: !this.state.favsUpdated });
    } else {
      let favs = this.state.favs;
      if (!favs || favs === "null") {
        favs = [this.props.character];
      } else {
        favs = [...favs, this.props.character];
      }
      this.setState({
        favs,
        favsUpdated: !this.state.favsUpdated
      });
    }
    let rightTitle =
      this.props.rightTitle === "Add to Fav" ? "Remove from Fav" : "Add to Fav";
    Actions.refresh({ rightTitle });
  }

  componentDidMount() {
    AsyncStorage.getItem("favs").then(favs =>
      this.setState({
        favs: JSON.parse(favs),
        favsUpdated: !this.state.favsUpdated
      })
    );
  }

  static onEnter() {
    Actions.refs.character.changeRightTitle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.favsUpdated !== this.state.favsUpdated &&
      this.state.favs !== null
    ) {
      AsyncStorage.setItem("favs", JSON.stringify(this.state.favs));
      this.changeRightTitle();
    }
  }

  changeRightTitle() {
    if (
      this.state.favs.filter(fav => fav.name === this.props.character.name)
        .length > 0
    ) {
      Actions.refresh({ rightTitle: "Remove from Fav" });
    } else {
      Actions.refresh({ rightTitle: "Add to Fav" });
    }
  }

  render() {
    let imageUri =
      this.props.character.gender === "male"
        ? require("../assets/male.png")
        : require("../assets/female.png");
    return (
      <View>
        <Card title={this.props.character.name}>
          <View style={styles.row}>
            <Image style={{ width: 100, height: 100 }} source={imageUri} />
          </View>
          <View style={styles.row}>
            <Text style={styles.category}>Height</Text>
            <Text style={styles.value}>{this.props.character.height}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.category}>Mass</Text>
            <Text style={styles.value}>{this.props.character.mass}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.category}>Hair color</Text>
            <Text style={styles.value}>{this.props.character.hair_color}</Text>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingVertical: 5
  },
  category: {
    flex: 1,
    textAlign: "left",
    paddingLeft: 15,
    fontWeight: "bold"
  },
  value: {
    flex: 1,
    textAlign: "center"
  }
});
export default Character;
