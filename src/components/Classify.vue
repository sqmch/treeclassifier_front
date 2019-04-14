<template>
  <div>
    <v-flex xs12 sm12>
      <v-card flat>
        <v-content>
          <v-container fluid>
            <div class="text-xs-center">
              <div v-if="imageUrl === ''">
                <v-icon color="grey darken-1" size="150">add_a_photo</v-icon>
                <div class="title">
                  <p>Take a picture</p>
                </div>
                <v-flex xs6 offset-xs3>
                  <div class="body-2">
                    <p>Tap here to take a picture of the leaf you wish to identify.</p>
                  </div>
                </v-flex>
              </div>
              <div class="preview-container" v-if="imageUrl">
                <img :src="imageUrl" height="220">
              </div>
            </div>
            <v-text-field
              class="fileinput-textfield"
              label="Take picture or select image"
              @click="pickFile"
              v-model="imageName"
              prepend-icon="attach_file"
            ></v-text-field>
            <input
              class="fileinput"
              type="file"
              ref="file"
              accept="image/*"
              @change="getImageFile"
              capture
            >

            <div class="text-xs-center">
              <v-btn
                :disabled="imageUrl === ''"
                :loading="dialog"
                @click="submitFile(); dialog = true"
                block
                color="light-green"
                large
              >Identify</v-btn>

              <v-dialog
                v-model="dialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
              >
                <v-card dark>
                  <v-toolbar dark>
                    <v-toolbar-title>Result</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="dialog = false">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <div class="text-xs-center">
                    <v-content>
                      <v-card-text>
                        <div class="result-preview-container" v-if="imageUrl">
                          <img :src="imageUrl" height="180">
                        </div>
                        <p v-if="isLoading" class="body-2">Classifying image...</p>
                        <v-progress-circular
                          size="64"
                          v-if="isLoading"
                          indeterminate
                          color="light-green"
                        ></v-progress-circular>
                        <p v-if="haveResult" class="headline">{{ this.result }}</p>
                        <div class="wikiparagraph">
                          <p v-if="haveResult" class="body-2">{{this.wikiParagraph}}</p>
                        </div>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                          v-if="haveResult"
                          color="light-green"
                          flat
                          target="_blank"
                          :href="resultWiki + this.result"
                        >Wikipedia</v-btn>
                        <v-btn color="red" flat @click="dialog = false">Close</v-btn>
                      </v-card-actions>
                    </v-content>
                  </div>
                </v-card>
              </v-dialog>
            </div>
          </v-container>
        </v-content>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    title: "Image Upload",
    dialog: false,
    imageName: "",
    imageUrl: "",
    file: null,
    isLoading: false,
    result: "",
    haveResult: false,
    resultWiki: "https://en.wikipedia.org/wiki/",
    wikiParagraph: null,
    wikiApiResult:
      "https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&origin=*&format=json&search="
  }),
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    getImageFile() {
      this.file = this.$refs.file.files[0];
      this.imageUrl = URL.createObjectURL(this.file);
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
          this.getWikiParagraph();
        });
    },
    getWikiParagraph() {
      const url = this.wikiApiResult + this.result;
      axios
        .get(url)
        .then(response => (this.wikiParagraph = response.data[2][0]));
    }
  }
};
</script>
<style>
.fileinput {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
  padding: 0 20%;
  margin-top: -420px;
  color: #fff;
  font-weight: bold;
  font-size: 200px;
  opacity: 0;
}
.fileinput-textfield {
  opacity: 0;
}
.preview-container {
  height: 240px;
}
.result-preview-container {
  height: 200px;
}
.wikiparagraph {
  height: 150px;
  overflow: auto;
}
</style>