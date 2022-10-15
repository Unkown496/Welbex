<template>
    <header class="navbar shadow-lg bg-base-100 px-5">
        <p class="normal-case text-xl flex-1 px-0 justify-start">Тз для Welbex</p>
        <button 
            class="btn btn-primary"
            :data-set-theme="state.isDarkTheme ? 'night': 'winter'"
            @click="state.isDarkTheme = !state.isDarkTheme"
        >
            <icon
                :icon="state.isDarkTheme ? 'WeatherNight' : 'WeatherSunny'"
                color="white"
            />
        </button>
    </header>
</template>
<script setup>
    import icon from "./mdiIcons/BaseIcon.vue";
    import { onMounted, reactive } from 'vue';
    import { themeChange } from 'theme-change';

    onMounted(() => {

        themeChange(state.isDarkTheme);
    });
    
    const state = reactive({
        isDarkTheme: false,
    });
</script>
