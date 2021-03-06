import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import VueVisible from "vue-visible";

import "vue-material/dist/vue-material.min.css"


//Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueVisible);

new Vue({
	render: h => h(App)
}).$mount("#app");