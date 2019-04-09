import Vue from "vue";
import App from "./App.vue";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import VueVisible from "vue-visible";

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.use(VueVisible);

new Vue({
	render: h => h(App)
}).$mount("#app");
