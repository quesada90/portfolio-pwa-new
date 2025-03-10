import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

// Import global styles
import "./assets/styles/styles.css";
import "./assets/styles/index.css";
import "./assets/styles/projects.css";
import "./assets/styles/contact.css";
import "./assets/styles/responsive.css";

const app = createApp(App);

// Register global properties
app.config.globalProperties.$appName = "Javier Quesada Portfolio";

// Use plugins
app.use(router);

// Mount the app
app.mount("#app");
