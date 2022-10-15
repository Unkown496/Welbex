// import vue
import { createApp } from 'vue';


// import vue components
import App from './App.vue';


// import tailwind css and bulma
import './assets/tailwind.css';


// import custom directives
import { vClickOutside } from "./directives/click-outside/vClickOutside.js";



createApp(App)
.directive("click-outside", vClickOutside)
.mount('#app');
