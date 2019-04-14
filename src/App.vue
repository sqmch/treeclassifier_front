<template>
  <v-app dark>
    <v-layout>
      <v-flex lg6 xs12 sm8 offset-sm2 offset-lg3>
        <v-toolbar app>
          <v-toolbar-title class="headline text-uppercase">
            <span class="light-green--text">TREE</span>
            <span class="font-weight-light">CLASSIFIER</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-content>
          <div>
            <v-tabs
              icons-and-text
              centered
              color="gray"
              dark
              grow
              slider-color="light-green"
              fixed-tabs
            >
              <v-tab ripple>
                Home
                <v-icon>home</v-icon>
              </v-tab>

              <v-tab-item>
                <Classify/>
              </v-tab-item>
              <v-tab ripple>
                Info
                <v-icon>info</v-icon>
              </v-tab>
              <v-tab-item>
                <Info/>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-content>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Classify from "./components/Classify";
import Info from "./components/Info";

export default {
  name: "App",
  components: { Classify, Info },
  data() {
    return {};
  }
};
</script>
<style>
</style>