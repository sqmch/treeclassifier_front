<template>
  <div class="infocontainer">
    <span class="md-headline">About Tree Classifier</span>
    <p class="md-body-2">
      The Tree Classifier app attempts to identify a tree based on a picture of it's leaves.
      The app currently generalises to the common English name of the genus. For example, the app will simply predict
      <i>Willow</i>
      instead of
      <i>Salix alba</i> or any of the other 400 species in the
      <i>Salix</i> genus.
      Most of the trees the app currently supports are some of the more common trees in Europe.
      See below for a list of currently supported trees.
    </p>
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>
          <div class="upperclosebtn">
            <md-button class="md-icon-button" @click="showDialog = false">
              <md-icon>close</md-icon>
            </md-button>
          </div>Supported Trees
        </md-dialog-title>
        <p class="supportedmsg">List of currently supported tree genera.</p>
        <div class="full-control">
          <md-table
            class="treeTable"
            v-model="searched"
            md-sort="name"
            md-sort-order="asc"
            md-fixed-header
          >
            <md-table-toolbar>
              <div class="md-toolbar-section-start"></div>

              <md-field md-clearable class="md-toolbar-section-end">
                <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable"/>
              </md-field>
            </md-table-toolbar>

            <md-table-empty-state
              md-label="No trees found"
              :md-description="`No tree found for this '${search}' query.`"
            ></md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="Name" md-sort-by="name" md-numeric>{{ item.name }}</md-table-cell>
            </md-table-row>
          </md-table>
        </div>
        <md-dialog-actions>
          <!--<md-button class="md-accent md-raised closebtn" @click="showDialog = false">Close</md-button>-->
        </md-dialog-actions>
      </md-dialog>
      <div class="dialogbtn">
        <md-button class="md-primary md-raised" @click="showDialog = true">Supported trees</md-button>
      </div>
    </div>
    <span class="md-headline">How to use it?</span>
    <p class="md-body-2">
      1. Tap anywhere on the screen under the Home tab to open up the camera
      <br>2. Point the camera at a leaf of the tree you wish to identify and take a picture
      <br>3. Verify the picture you took to return back to the app
      <br>4. Press "Identify"
      <br>
      <br>Tree Classifier is built to be used on a phone, however it also works on a computer.
      You can upload a picture of a leaf by clicking anywhere under the Home tab.
    </p>
    <span class="md-headline">How does it work?</span>
    <p class="md-body-2">
      The app uses machine learning to classify the images. The machine learning model was built using the
      <a
        href="https://www.fast.ai/"
        target="_blank"
      >Fastai</a> library.
    </p>
    <span class="md-headline">Contact</span>
    <p class="md-body-2">
      Contact the author on
      <a href="https://github.com/sqmch" target="_blank">GitHub</a>
    </p>
  </div>
</template>

<script>
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "Info",
  data: () => ({
    search: null,
    searched: [],
    showDialog: false,
    supportedTrees: [
      { id: 1, name: "Alder" },
      { id: 2, name: "Apple" },
      { id: 3, name: "Ash" },
      { id: 4, name: "Beech" },
      { id: 5, name: "Birch" },
      { id: 6, name: "Box" },
      { id: 7, name: "Cherry" },
      { id: 8, name: "Elm" },
      { id: 9, name: "Hawthorn" },
      { id: 10, name: "Hazel" },
      { id: 11, name: "Holly" },
      { id: 12, name: "Hornbeam" },
      { id: 13, name: "Juniper" },
      { id: 14, name: "Linden" },
      { id: 15, name: "Oak" },
      { id: 16, name: "Pine" },
      { id: 17, name: "Poplar" },
      { id: 18, name: "Rowan" },
      { id: 19, name: "Whitebeam" },
      { id: 20, name: "Willow" },
      { id: 21, name: "Yew" },
      { id: 22, name: "Spindle" },
      { id: 23, name: "Dogwood" },
      { id: 24, name: "Buckthorn" },
      { id: 25, name: "Larch" },
      { id: 26, name: "Hemlock" },
      { id: 27, name: "Horse-chestnut" },
      { id: 28, name: "Spruce" }
    ]
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.supportedTrees, this.search);
    }
  },
  created() {
    this.searched = this.supportedTrees;
  }
};
</script>
<style lang="scss">
.treeTable {
  height: 350px;
  width: 100%;
  margin-right: 10%;
  margin-left: 10%;
}
.md-field {
  max-width: 300px;
}
.closebtn {
  width: 50%;
}
.dialogbtn {
  margin-bottom: 25px;
}
.md-dialog {
  max-width: 768px;
}
.treelist {
  overflow: auto;
}
$list-width: 100%;
.full-control {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
}
.full-control > .md-list {
  width: $list-width;
  max-width: 100%;
  height: 400px;
  display: inline-block;
  overflow: auto;
  vertical-align: top;
}
.supportedmsg {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
