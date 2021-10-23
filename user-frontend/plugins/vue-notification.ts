import Vue from "vue";
import VueNotification from "@kugatsu/vuenotification";

Vue.use(VueNotification, {
  timer: 10,
  position: "bottomRight",
  showLeftIcn: false,
  showCloseIcn: true,
  primary: {
    color: "white",
    background: "#0657a9",
  },
  warning: {
    color: "black",
    background: "#ffbd59",
  },
  error: {
    color: "white",
    background: "#a90606",
  },
});
