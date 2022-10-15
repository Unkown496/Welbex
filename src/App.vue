<template >
  <div class="wrapper">
    <app-header></app-header>
    <app-table
      :columns="state.header"
      :items="state.bodyItems"
    ></app-table>
    <app-footer></app-footer>
  </div>
</template>

<script setup>
// import compontents
import AppHeader from "./components/AppHeader.vue";
import AppTable from "./components/AppTable.vue";
import AppFooter from "./components/AppFooter.vue";

// import vue
import { reactive } from "vue";
 
const state = reactive({
  header: [
    {
      text: "Название",
      value: "name"
    },

    {
      text: "Дата",
      value: "date",
      alignCol: "center"
    },


    {
      text: "Количество",
      value: "count", 
      alignCol: "center"
    },

    {
      text: "Расттояние",
      value: "distance"
    }
  ],
  bodyItems: [
    {
      name: "test2",
      distance: "test",
      count: "3",
      date: "test",

    },
    {
      name: "test2",
      distance: "test2",
      count: "2",
      date: "test2"
    },

    {
      name: "tessdasdst3",
      distance: "test3",
      count: "1",
      date: "test3"
    },

    {
      name: "tdasdasdasest3",
      distance: "test3",
      count: "1",
      date: "test3"
    }, 

    {
      name: "tesdasdadt3",
      distance: "test3",
      count: "1",
      date: "test3"
    }, 
    {
      name: "tevst3",
      distance: "test3",
      count: "1",
      date: "test3"
    }, 
    {
      name: "test3",
      distance: "test3",
      count: "1",
      date: "test3"
    },
    {
      name: "test3",
      distance: "tesdsfdsft3",
      count: "1",
      date: "test3"
    }, 
  ]
});

// export default {
//   name: 'App',
//   components: {
//     AppHeader,
//     AppTable,
//   },
//   data() {
//     return {
      // header: [
      //   {
      //     text: "Название",
      //     value: "name"
      //   },

      //   {
      //     text: "Дата",
      //     value: "date",
      //     alignCol: "center"
      //   },


      //   {
      //     text: "Количество",
      //     value: "count", 
      //     alignCol: "center"
      //   },

      //   {
      //     text: "Расттояние",
      //     value: "distance"
      //   }

      // ],

      // bodyItems: [
      //   {
      //     name: "test2",
      //     distance: "test",
      //     count: "3",
      //     date: "test",

      //   },
      //   {
      //     name: "test2",
      //     distance: "test2",
      //     count: "2",
      //     date: "test2"
      //   },

      //   {
      //     name: "tessdasdst3",
      //     distance: "test3",
      //     count: "1",
      //     date: "test3"
      //   },

      //   {
      //     name: "tdasdasdasest3",
      //     distance: "test3",
      //     count: "1",
      //     date: "test3"
      //   }, 

      //   {
      //     name: "tesdasdadt3",
      //     distance: "test3",
      //     count: "1",
      //     date: "test3"
      //   }, 
      //   {
      //     name: "tevst3",
      //     distance: "test3",
      //     count: "1",
      //     date: "test3"
      //   }, 
      //   {
      //     name: "test3",
      //     distance: "test3",
      //     count: "1",
      //     date: "test3"
      //   },
      //   {
      //     name: "test3",
      //     distance: "tesdsfdsft3",
      //     count: "1",
      //     date: "test3"
      //   }, 
      // ]
//     }
//   },
// }
</script>

