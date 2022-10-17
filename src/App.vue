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
      value: "distance",
      alignCol: "right"
    }
  ],
  bodyItems: [
    {
      name: "test2",
      distance: "test",
      count: "3",
      date: "12.5.12",

    },
    {
      name: "test2",
      distance: "test2",
      count: "2",
      date: "12.12.12"
    },

    {
      name: "tessdasdst3",
      distance: "1000",
      count: "1",
      date: "12.12.12"
    },

    {
      name: "tdasdasdasest3",
      distance: "1003",
      count: "5",
      date: "12.10.12"
    }, 

    {
      name: "tesdasdadt3",
      distance: "2000",
      count: "1",
      date: "10.10.10"
    }, 
    {
      name: "tevst3",
      distance: "3000",
      count: "3",
      date: "12.9.12"
    }, 
    {
      name: "test3",
      distance: "4000",
      count: "1",
      date: "12.12.10"
    },
    {
      name: "test3",
      distance: "5000",
      count: "7",
      date: "12.8.12"
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

