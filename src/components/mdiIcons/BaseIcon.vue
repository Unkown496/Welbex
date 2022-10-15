<template>
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path :fill="color" :d="mdi[`mdi${icon}`]" />
   </svg>
</template>
<script setup>
    import * as mdi from "@mdi/js";
    import { defineProps, toRefs } from "vue";

    const props = defineProps({
        icon: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: false,
            default() {
                return "currentColor"
            }
        },
    });

    const { icon, color } = toRefs(props);

</script>