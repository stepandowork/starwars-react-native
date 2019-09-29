import React, { Component } from "react";
import { Text, View, AsyncStorage, FlatList, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import Fav from "../components/Fav";

export class Favs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favs: null,
      favsUpdated: false
    };
  }

  removeFromFavs = favToDelete => {
    let favs = this.state.favs.filter(fav => fav.name !== favToDelete.name);
    this.setState({ favs, favsUpdated: !this.state.favsUpdated });
  };

  async getFavs() {
    let favs = await AsyncStorage.getItem("favs");
    this.setState({ favs: JSON.parse(favs) });
  }

  static onEnter() {
    const c = Actions.refs.fav;
    c.getFavs();
  }

  componentDidMount() {
    this.getFavs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.favsUpdated !== this.state.favsUpdated) {
      AsyncStorage.setItem("favs", JSON.stringify(this.state.favs));
    }
  }

  renderItem = ({ item }) => (
    <Fav fav={item} onSwipeFromRight={this.removeFromFavs} />
  );

  render() {
    return !this.state.favs || !this.state.favs.length ? (
      <View style={styles.container}>
        <Text> Currently there are no favs... </Text>
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={this.state.favs}
          renderItem={this.renderItem}
          keyExtractor={item => item.name}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingBottom: 30,
    paddingTop: 15
  }
});

export default Favs;
