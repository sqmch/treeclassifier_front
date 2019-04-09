<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-small-hide"></div>
    <div
      class="md-layout-item md-xlarge-size-50 md-large-size-50 md-medium-size-80 md-small-size-100"
    >
      <md-app md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-primary md-small">
          <div class="md-toolbar-row">
            <span class="md-title">Tree Classifier</span>
          </div>
        </md-app-toolbar>
      </md-app>
      <md-card class="tabs md-medium-size-80">
        <md-tabs class="md-transparent" md-alignment="fixed">
          <!-- START OF The main tab containing the classifier -->
          <md-tab id="tab-home" md-label="Home" md-icon="home">
            <Takepicture :key="componentKey"/>
            <md-button :md-ripple="true" class="analyzebtn md-accent" v-on:click="forceRerender()">
              <md-icon>refresh</md-icon>
            </md-button>
          </md-tab>
          <!-- ///END OF the main tab containing the classifier -->
          <!-- START OF the Info tab  -->
          <md-tab id="tab-pages" md-label="Info" md-icon="info">
            <Info/>
          </md-tab>
          <!-- ///END OF the Info tab -->
        </md-tabs>
      </md-card>
    </div>
    <div class="md-layout-item md-small-hide"></div>
  </div>
</template>

<script>
import Takepicture from "./components/Takepicture";
import Info from "./components/Info";

export default {
  name: "app",
  components: {
    Takepicture,
    Info
  },
  data: () => ({
    url: null,
    file: null,
    componentKey: 0
  }),
  methods: {
    forceRerender() {
      this.componentKey += 1;
    }
  }
};
</script>





<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(green, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200),
    theme: dark
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>