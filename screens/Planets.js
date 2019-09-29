import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
  AsyncStorage
} from "react-native";
import Planet from "../components/Planet";
import { Actions } from "react-native-router-flux";

export class Planets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      next: "https://swapi.co/api/planets",
      initialPlanets: [],
      planets: []
    };
  }

  loadNextPlanets() {
    if (!this.state.next) return;
    fetch(this.state.next)
      .then(response => response.json())
      .then(data =>
        this.setState({
          isLoading: false,
          planets: [...this.state.planets, ...data.results],
          initialPlanets: [...this.state.initialPlanets, ...data.results],
          next: data.next
        })
      )
      .catch(error => console.log("ERROR APPEARED!!!", error));
  }

  componentDidMount() {
    this.loadNextPlanets();
  }

  onScrollEnd() {
    this.loadNextPlanets();
  }

  searchPlanet(text) {
    let planets = this.state.initialPlanets.filter(planet => {
      return planet.name.toUpperCase().indexOf(text.toUpperCase()) !== -1;
    });
    this.setState({
      planets
    });
  }

  render() {
    return this.state.isLoading ? (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    ) : (
      <View style={styles.container}>
        <TextInput
          placeholder="Search planet..."
          onChangeText={text => this.searchPlanet(text)}
          style={{
            marginLeft: 15,
            borderBottomWidth: 1,
            borderBottomColor: "black",
            paddingVertical: 5
          }}
        />
        <FlatList
          data={this.state.planets}
          renderItem={({ item }) => <Planet planet={item} />}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state.planets}
          onEndReached={() => this.onScrollEnd()}
          onEndReachedThreshold={1}
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

export default Planets;
