<template>
  <div>
    <v-flex xs12 sm12>
      <v-card flat>
        <v-content>
          <v-card-text>
            <span class="headline">What is Tree Classifier?</span>
            <p></p>
            <p>
              The Tree Classifier app attempts to identify trees based on a picture of their leaves.
              The app currently generalises to the common English name of the genus. For example, the app will simply predict
              <i>Willow</i> instead of
              <i>Salix alba</i>.
              Most of the trees the app currently supports are some of the more common trees in Europe.
              See below for a list of currently supported trees.
            </p>
          </v-card-text>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <div>Supported trees</div>
              </template>
              <v-card>
                <v-card-title>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="supportedTrees" :search="search">
                  <template v-slot:items="props">
                    <td>{{ props.item.name }}</td>
                  </template>
                  <v-alert
                    v-slot:no-results
                    :value="true"
                    color="error"
                    icon="warning"
                  >Your search for "{{ search }}" found no results.</v-alert>
                </v-data-table>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-card-text>
            <span class="headline">How to use?</span>
          </v-card-text>
          <v-list subheader>
            <v-list-tile v-for="item in howToItems" :key="item.title" avatar>
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-text>
            <span class="headline">How does it work?</span>
            <p class="body-2">
              The app uses machine learning to classify the images. The machine learning model was built using the
              <a
                href="https://www.fast.ai/"
                target="_blank"
              >Fastai</a> library.
            </p>
            <span class="headline">Contact</span>
            <p class="body-2">
              Contact the author on
              <a href="https://github.com/sqmch" target="_blank">GitHub</a>
            </p>
          </v-card-text>
        </v-content>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "Classify",
  data() {
    return {
      text: "info stuff",
      search: "",
      howToItems: [
        {
          icon: "add_a_photo",
          iconClass: "white--text",
          title: "Tap",
          subtitle: "Tap anywhere on the screen under the Home tab"
        },
        {
          icon: "center_focus_strong",
          iconClass: " white--text",
          title: "Snap",
          subtitle: "Take a picture of a leaf"
        },
        {
          icon: "check",
          iconClass: "white--text",
          title: "Verify",
          subtitle: "Verify the picture you took"
        },
        {
          icon: "image_search",
          iconClass: "white--text",
          title: "Identify",
          subtitle: "Press the Identify button"
        }
      ],
      headers: [{ text: "Tree", value: "name" }],
      supportedTrees: [
        { name: "Alder" },
        { name: "Apple" },
        { name: "Ash" },
        { name: "Beech" },
        { name: "Birch" },
        { name: "Box" },
        { name: "Cherry" },
        { name: "Elm" },
        { name: "Hawthorn" },
        { name: "Hazel" },
        { name: "Holly" },
        { name: "Hornbeam" },
        { name: "Juniper" },
        { name: "Linden" },
        { name: "Oak" },
        { name: "Pine" },
        { name: "Poplar" },
        { name: "Rowan" },
        { name: "Whitebeam" },
        { name: "Willow" },
        { name: "Yew" },
        { name: "Spindle" },
        { name: "Dogwood" },
        { name: "Buckthorn" },
        { name: "Larch" },
        { name: "Hemlock" },
        { name: "Horse-chestnut" },
        { name: "Spruce" }
      ]
    };
  }
};
</script>