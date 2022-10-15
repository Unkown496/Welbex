<template>
    <ul 
        class="pagination"
    >

        <li class="flex">
            <button
                :class="{'pagination__btn-disabled': state.activePage <= 1 }"
                @click="$emit('update:modelValue', state.activePage--)"
                class="pagination__btn"
            >
                <icon 
                    icon="ChevronLeft"
                    :color="state.activePage <= 1 ? '#9ca3af': ''"
                />
            </button>
        </li>

        <li class="cursor-pointer">
            {{ state.activePage }} / {{ length }}
        </li> 

        <li class="flex">
            <button
                :class="{ 'pagination__btn-disabled': state.activePage === length }"
                @click="$emit('update:modelValue', state.activePage++)"
                class="pagination__btn"
            >
                <icon
                    icon="ChevronRight"
                    :color="state.activePage === length ? '#9ca3af': ''"
                />   
            </button>
        </li>
    </ul>
</template>
<script setup>
    import icon from "../mdiIcons/BaseIcon.vue";
    import { defineProps, defineEmits, toRefs, reactive } from "vue";
    
    const props = defineProps({
        length: {
            type: [String, Number],
            required: true,
        },
        hasArrow: {
            type: Boolean, 
            required: false,
        },
        currentPage: String,
        modelValue: {
          type: [String, Number]
        },
    });

    const { length, hasArrow, currentPage } = toRefs(props);
    
    defineEmits([
        'update:modelValue',
    ]);

    const state = reactive({
        activePage: 1,
    });

    // const selectPage = (pageNumber, event) => {
    //     const targetClasses = event.target.classList;
    //     if(targetClasses.contains("pagination__item-active")) {

    //     } 
    // }
</script>