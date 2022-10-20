<template>
    <div class="table-app__card">
        <div class="card-body p-0">
            <header class="card-header">
                <slot name="header"></slot>
            </header>
            <div class="table-app__placement">

                <table class="table-app">
                    <thead>
                        <tr>
                            <th
                                v-for="(col, i) in columns"
                                :key="col"
                                :class="`!text-${col.alignCol === undefined ? 'left': col.alignCol }`"
                            >
                                <button
                                    class="btn btn-ghost"
                                    @click="$emit('update:columnsValue', { colData: col, index: i })"
                                >
                                   {{ col.text }}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <TransitionGroup 
                        name="slide-x"
                        tag="tbody"
                        mode="in-out"
                        appear
                    >
                        <template v-show="customFilter !== false ? customFilter.length === 0: false">
                            <slot 
                                name="item.notFound"
                            ></slot>
                        </template>

                        <tr
                            v-for="rowData in slicedTableItems[state.currentPage-1]"
                            :key="rowData"
                        >
                            <td
                                v-for="(col, i) in columns"
                                :key="col"
                                :class="[`!text-${col.alignCol === undefined ? 'left': col.alignCol}`, `!bg-${ rowData.foundCol === col.value && customFilter !== false ? colorOnFoundCols : ''}`, { 'text-primary-content': rowData.foundCol === col.value && customFilter !== false } ]"
                            >
                                <div
                                    class="tooltip tooltip-bottom"
                                    :class="{'!tooltip-right': i === 0, '!tooltip-left': i === columns.length-1}"
                                    :data-tip="options.tooltipsItemsText"
                                >
                                    <button
                                        class="btn btn-ghost"
                                        @click="$emit('update:itemsValue', { itemData: rowData[col.value], itemColIndex: i, itemRef: rowData })"
                                    >
                                        {{ rowData[col.value] }}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </TransitionGroup>
                </table>
            </div>
            <footer class="card-footer table-app-footer">
                <div class="card-footer-item">
                    <div class="row">                        
                        <div class="col-12 sm:col-5 gap-2 flex items-center">
                            <span>Количество колонок</span>
                            <BaseDropdown
                                sideToOpen="dropdown-top" 
                            >
                                <template #activator="menu">
                                    <div class="row gx-0">
                                        <button 
                                            class="flex border-b-2 border-gray-500"
                                            
                                        >
                                            {{ state.countRows === null ? "Все" : state.countRows}}
                                            <icon
                                                :icon="menu.click ? 'ChevronUp' : 'ChevronDown'"  
                                            />
                                        </button>
                                    </div>
                                </template>
                                <template #default>
                                    <li>
                                        <button
                                            @click="state.currentPage = 1, state.countRows = null, $emit('update:countRowsOnPage', state.countRows)"
                                            :class="{'menu-dropdown__item-active': state.countRows === null }"
                                        >
                                            <a>
                                                Все
                                            </a>
                                        </button>
                                            
                                    </li>
                                    <li 
                                        v-for="(count) in calculateCountRows"
                                        :key="count"
                                    >
                                        <button
                                            @click="state.currentPage = 1, state.countRows = count, $emit('update:countRowsOnPage', state.countRows)"
                                            :class="{'menu-dropdown__item-active': state.countRows === count }"
                                        >
                                            {{ count }}
                                        </button>
                                    </li>
                                </template> 
                            </BaseDropdown>
                        </div>
                        <div 
                            class="col-12 sm:col-7 my-3"
                        >
                            <BasePagination
                                v-model="state.currentPage"
                                :length="slicedTableItems.length"
                            ></BasePagination>

                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>
<script setup>
    import { slice } from "./func";
    import { defineProps, toRefs, computed, reactive, onBeforeMount, defineEmits, watch } from "vue";
    import BaseDropdown from "../BaseDropdown/BaseDropdown.vue";
    import BasePagination from "../BasePagination/BasePagination.vue";
    import icon from "../mdiIcons/BaseIcon.vue";

    const props = defineProps({
        /*
            text: Name of col, 
            value: Value for code,
            alignCol: All elments in col aligment, default: text-left
        */
        columns: {
            type: Array,
            required: true,
        }, 
        /*
            col 
            [columns.value]: / someValue /
        */
        items: {
            type: Array,
            required: true,
        },

        colorOnFoundCols: {
            type: String,
            required: false,
            default: () => {
                return "primary";
            }
        },

        /*
            itemsPerPage: count element per one table page,
        */
        options: {
            type: [Object, Boolean],
            required: false,
            default: () => {
                return {
                    itemsPerPage: 10,
                };
            },
        },

        "custom-filter": {
            type: [Function, Boolean],
            required: false,
            default: () => {
                return false
            }
        },

        columnsValue: Object,
        itemsValue: Object,
        countRowsOnPage: Number,
    });

    const { columns, items, options, colorOnFoundCols, customFilter } = toRefs(props);

    const emit = defineEmits([
        "update:columnsValue",
        "update:itemsValue",
        "update:countRowsOnPage",
    ]);

    const state = reactive({
        tableItems: "",
        countRows: null,
        currentPage: 1,
    });

    onBeforeMount(() => {
        return state.tableItems = (customFilter !== false) ? customFilter: items.value;
    });

    const calculateCountRows = computed(() => {
        let resArr = []
        if(state.tableItems.length > 1) {
            Array.from(Array(Math.round(state.tableItems.length / 2)).keys()).forEach(item => {
                let num = item + 1;

                if(Number.isInteger(num / 2)) {
                    resArr.push(num);
                };
            });
            return resArr;
        }
        else {
            return;
        }
    });

    const slicedTableItems = computed(() => {
        if(state.countRows === null) {
            return slice(state.tableItems, options.value.itemsPerPage);
        }
        else {
            return slice(state.tableItems, state.countRows)
        }
    });
</script>