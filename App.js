import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Router, Scene, Tabs, Stack, Actions } from "react-native-router-flux";
import Planets from "./screens/Planets";
import Residents from "./screens/Residents";
import Character from "./screens/Character";
import Favs from "./screens/Favs";

export default function App() {
  return (
    <Router>
      <Scene key="root">
        <Tabs hideNavBar>
          <Stack title="List" key="list">
            <Scene component={Planets} title="Planets" key="planets" />
            <Scene
              component={Residents}
              title="Residents"
              key="residents"
              back
            />
            <Scene
              component={Character}
              title="Character"
              key="character"
              back
              rightTitle="Add to fav"
            />
          </Stack>

          <Scene component={Favs} title="Fav" key="fav" />
        </Tabs>
      </Scene>
    </Router>
  );
}
