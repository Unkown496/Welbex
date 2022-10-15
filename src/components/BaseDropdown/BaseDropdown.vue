<template>
    <div
        v-click-outside="isClickOutside" 
        class="dropdown"
        :class="sideToOpen"
    >
        <span
            class="flex-1 flex"
            @click="state.isClick = !state.isClick, state.isClickOutside = false"
        >
            <slot
                name="activator"
                :click="state.isClick"
            >

            </slot>
        </span>

        <Transition name="slide-y"> 
            <ul
                v-show="state.isClick && !state.isClickOutside"
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                ref="dropdownElements" 
            >
                <slot name="default"></slot>
            </ul>
        </Transition>
        <!-- <div 
            class="dropdown__activator"
            @click="state.isClick = !state.isClick, state.isClickOutside = false" 
        >
            <slot 
                name="activator" 
                :click="state.isClick"
            />
        </div> 
        <Transition name="slide-y"> 
            <div
                v-show="state.isClick && !state.isClickOutside"
                class="menu-dropdown"
                ref="dropdownElements" 
            >
                <slot 
                    name="default"
                    :class="state.userChoiceClassessOnMenu"
                />
            </div>
        </Transition> -->
    </div>
</template>

<script setup>
    import { defineProps, reactive, ref, toRefs, onMounted } from "vue";
    const props = defineProps({
        sideToOpen: {
            type: String,
            required: false,
            default: () => {
                return ""
            },
        }
    });



    const state = reactive({
        isClick: false, 
        isClickOutside: false,
    });


    const dropdownElements = ref();


    const { classDropdownMenu } = toRefs(props);


    const isClickOutside = () => {
        state.isClickOutside = true;
        state.isClick = false;
    };



    onMounted(() => {
        let copyDropdownEls = [...dropdownElements.value.children];
        
        console.log(dropdownElements);
        // add auto-close after click any dropdown menu item
        return copyDropdownEls.forEach(el => {
            el.addEventListener('click', () => {
                return state.isClick = !state.isClick 
            });
        });
    });
</script>