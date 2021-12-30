<template>
  <div class="inputdiv">
    <div class="preview">
      <md-empty-state
        class="emptystate"
        v-if="url === null"
        md-label="Take a picture"
        md-description="Tap anywhere on the screen to take a picture of the leaf you wish to identify."
        md-icon="add_a_photo"
      ></md-empty-state>

      <input
        type="file"
        accept="image/*"
        capture="camera"
        id="file"
        ref="file"
        class="fileinput"
        v-on:change="handleFileUpload()"
      >
    </div>
    <div class="preview-container">
      <img class="imgpreview" v-if="url" :src="url">
    </div>
    <div class="analyzebtn-container">
      <md-button
        class="analyzebtn md-primary md-raised"
        v-if="file != null"
        @click="submitFile(); showResultDialog = true"
      >Identify</md-button>
    </div>
    <!-- RESULT DIALOG -->
    <md-dialog :md-active.sync="showResultDialog">
      <md-dialog-title>
        <div class="upperclosebtn">
          <md-button class="md-icon-button" @click="showResultDialog = false">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-dialog-title>

      <md-card class="resultcard">
        <div class="md-layout">
          <div class="preview-container md-layout-item md-size-100">
            <img class="imgpreview" v-if="url" :src="url">
          </div>

          <md-card-content class="md-layout-item">
            Prediction:
            <div v-visible="haveResult">
              <md-progress-bar v-visible="isLoading" md-mode="indeterminate"></md-progress-bar>
              <div class="md-title">
                <strong>{{ this.result }}</strong>
              </div>
            </div>

            <md-content v-visible="haveResult" class="md-scrollbar wikip">
              <p>{{ this.wikiString }}</p>
            </md-content>
          </md-card-content>
        </div>
        <md-card-actions md-alignment="space-between">
          <div v-visible="haveResult">
            <md-button target="_blank" :href="resultWiki + this.result">
              Wikipedia
              <md-tooltip md-delay="300" md-direction="right">Opens a separate Wikipedia tab</md-tooltip>
            </md-button>
            <md-button class="md-accent" @click="showResultDialog = false">Close</md-button>
          </div>
        </md-card-actions>
      </md-card>
    </md-dialog>
    <!-- /// RESULT DIALOG -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Takepicture",
  data: () => ({
    url: null,
    file: null,
    result: null,
    showResultDialog: false,
    imageFile: null,
    isLoading: false,
    haveResult: false,
    wikiString: null,
    resultWiki: "https://en.wikipedia.org/wiki/",
    apiexamplestring1:
      "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&origin=*&format=json&search=",
    apiexamplestring2:
      "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=java"
  }),
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    submitFile() {
      let formData = new FormData();
      this.haveResult = false;
      this.isLoading = true;
      formData.append("file", this.file);
      axios
        .post("https://treeclassifier.herokuapp.com/get_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.isLoading = false;
          this.haveResult = true;
          this.result = response.data[0].result;
          this.getWikiP();
        });
    },
    getWikiP() {
      const url = this.apiexamplestring1 + this.result;
      axios.get(url).then(response => (this.wikiString = response.data[2][0]));
    }
  }
};
</script>

<style lang="scss">
.md-layout-item {
  &:after {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.emptystate {
  width: 300px;
  height: 300px;
  margin: 10px;
  position: relative;
  overflow: hidden;
}
.fileinput {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  padding: 0 20%;
  margin-top: -420px;
  color: #fff;
  font-weight: bold;
  font-size: 400px;
  opacity: 0;
}
.analyzebtn {
  width: 97.5%;
}
.analyzebtn-container {
  margin-top: 40px;
  margin-bottom: 15px;
}
.imgpreview {
  max-width: 325px;
  max-height: 220px;
}
.preview-container {
  text-align: center;
}
.resultmsg {
  margin-left: 10px;
  margin-right: 10px;
}

.dialogbtn {
  margin-bottom: 25px;
}
.md-dialog {
  width: 768px;
}
.cardcontent {
  text-align: center;
}
.upperclosebtn {
  text-align: right;
}
.wikip {
  height: 150px;
  overflow: auto;
  margin-top: 5px;
}
.preview {
  text-align: center;
  margin: auto;
}
</style>
