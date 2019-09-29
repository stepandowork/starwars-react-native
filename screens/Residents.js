import React, { Component } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TextInput,
  StyleSheet
} from "react-native";
import { Resident } from "../components/Resident";

export class Residents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      initialResidents: null,
      residents: null
    };
  }

  componentDidMount() {
    Promise.all(this.props.residents.map(resident => fetch(resident)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(residents => {
        this.setState({
          isLoading: false,
          initialResidents: residents,
          residents: residents
        });
      });
  }

  searchResident(text) {
    let residents = this.state.initialResidents.filter(resident => {
      return resident.name.toUpperCase().indexOf(text.toUpperCase()) !== -1;
    });
    this.setState({
      residents
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : this.state.residents.length === 0 ? (
          <Text>There are no residents on this planet...</Text>
        ) : (
          <View>
            <TextInput
              placeholder="Search resident..."
              onChangeText={text => this.searchResident(text)}
              style={{
                marginLeft: 15,
                borderBottomWidth: 1,
                borderBottomColor: "black",
                paddingVertical: 5
              }}
            />
            <FlatList
              data={this.state.residents}
              renderItem={({ item }) => <Resident resident={item} />}
              keyExtractor={item => item.name}
              extraData={this.state.residents}
            />
          </View>
        )}
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

export default Residents;
