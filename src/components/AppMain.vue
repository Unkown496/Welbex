<template>
    <main>
        <app-table
            :columns="state.header"
            :items="state.bodyItems"
            :options="state.configTable"
            :custom-filter="filterItems"
            color-on-found-cols="primary"

            v-model:columnsValue="state.selectedCol"
            v-model:itemsValue="state.selectedItem"
            v-model:countRowsOnPage="state.countRows"
        >
            <template #header>
                <div class="row flex-1">    
                    <div class="col-12">
                        <div class="row sm:items-center">
                            <div class="col-6 sm:col-4 md:col-3 lg:col-2">
                                <BaseDropdown
                                >
                                    <template #activator="menu">
                                        <button 
                                            class="btn btn-primary flex-1"
                                        >
                                            {{ state.dropdownRow !== null ? state.header[state.dropdownRow].text : "Выберите колонку" }}
                                        </button>
                                    </template>
                                    <template #default>
                                        <li 
                                            v-for="(col, i) in state.header"
                                            :key="col"
                                        >
                                            <button
                                                @click="state.dropdownRow = i, removeItem(i, 'dropdownRow', $event)"
                                                :class="{'menu-dropdown__item-active': i === state.dropdownRow }"

                                            >
                                                {{ col.text }}
                                            </button>
                                        </li>
                                    </template>
                                </BaseDropdown>

                            </div>

                            <div class="col-6 sm:col-4 md:col-3 lg:col-2">
                                <BaseDropdown>
                                    <template #activator="menu">
                                        <button 
                                            class="btn btn-primary flex-1"
                                        >
                                            {{ state.dropdownCondition !== null ? state.conditionFilter[state.dropdownCondition].text : "Выберите условие" }}
                                        </button>
                                    </template>
                                    <template #default>
                                        <li
                                            v-for="(condition, i) in state.conditionFilter"
                                            :key="condition"
                                        >
                                            <button
                                                @click="state.dropdownCondition = i, removeItem(i, 'dropdownCondition', $event)"
                                                :class="{'menu-dropdown__item-active': i === state.dropdownCondition }"
                                            >
                                                {{ condition.text }}
                                            </button>
                                        </li>
                                    </template>
                                </BaseDropdown>
                            </div>
                            <div class="my-3 col-12 sm:col-4 md:col-6 lg:col-8">
                                <div class="form-control">
                                    <label class="input-group">
                                        <span>
                                            <icon
                                                v-show="state.dropdownRow === null || state.dropdownCondition === null && (state.searchOfTable !== '' || state.searchOfTable !== ' ')"
                                                icon="Magnify"
                                            />
                                            <div class="tooltip tooltip-bottom flex" data-tip="Нажмите, чтобы очистить все">
                                                <button
                                                    v-show="state.dropdownRow !== null && state.dropdownCondition !== null && (state.searchOfTable !== '' || state.searchOfTable !== ' ')"
                                                    @click="state.dropdownRow = null, state.dropdownCondition = null, state.searchOfTable = ''"
                                                >
                                                    <icon
                                                        icon="CloseCircleOutline"
                                                    />
                                                </button>
                                            </div>
                                        </span>
                                        <input type="text" placeholder="Введите значение" class="input input-bordered !outline-none !w-[90%]" v-model="state.searchOfTable">
                                        <span v-show="state.searchOfTable !== '' && state.searchOfTable !== ' '">
                                            <div class="tooltip tooltip-left flex" data-tip="Нажмите, чтобы очистить ввод">
                                                <button
                                                    @click="state.searchOfTable = ''"
                                                >
                                                    <icon 
                                                        icon="Close"
                                                    />
                                                </button>
                                            </div>
                                        </span>
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #item.notFound>
                <tr class="w-full">
                    <td :colspan="state.header.length">
                        <div class="flex justify-center items-center gap-4">
                            <icon
                                icon="Help"
                            />
                            <span class="font-semibold">
                                Ничего не найдено, может стоит 
                                <button 
                                    class="btn btn-link"
                                    @click="state.searchOfTable = ''"
                                >
                                    очистить
                                </button>
                                поиск
                            </span>
                        </div>
                    </td>
                </tr>
            </template>
        </app-table>
    </main>
</template>
<script setup>
    import AppTable from "./AppTable/AppTable.vue";
    import BaseDropdown from "./BaseDropdown/BaseDropdown.vue";
    import icon from "./mdiIcons/BaseIcon.vue";
    // import vue
    import { reactive, computed, onBeforeMount, watch } from "vue";
 
    const state = reactive({
        configTable: {
            itemsPerPage: 10,
            tooltipsItemsText: "Кликните, чтобы найти похожее"
        },
        dropdownRow: null,
        dropdownCondition: null,
        conditionFilter: [
            {
                text: "Равно",
                value: "==="
            },

            {
                text: "Содержит",
                value: "By"
            },

            {
                text: "Больше",
                value: ">"
            },

            {
                text: "Меньше",
                value: "<"
            }
        ],

        searchOfTable: "",
        selectedCol: null,
        selectedItem: null,
        countRows: null,
        pageActive: null,

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
    const removeItem = function (index, reactiveStateOfEl, event) {
        const targetClasses = event.target.classList;


        if(targetClasses.contains("menu-dropdown__item-active")) {
            return state[reactiveStateOfEl] = null;
        }

        else {
            return state[reactiveStateOfEl] = index;
        };

    };

    // adding color on foundCol object props 
    onBeforeMount(() => {
        state.bodyItems = state.bodyItems.map( col => ({ ...col, foundCol: null }));
    });

    const filterItems = computed(() => {
        let rowSelected = state.dropdownRow !== null ? state.header[state.dropdownRow].value: null;
        let actionsSelected = state.dropdownCondition !== null ? state.conditionFilter[state.dropdownCondition].value: null;
        // if row not selected and search on table equal a null
        if(!((rowSelected && actionsSelected) && (state.searchOfTable !== "" && state.searchOfTable !== " "))) {
            return state.bodyItems.map(col => ({ ...col, foundCol: null }) );
        }

        else {
            let filterItems = [...state.bodyItems].filter(col => {
                let rowSelectedValueCheckOfData = (rowSelected === "date") ? new Date(col[rowSelected]): col[rowSelected];
                let searchOfTableDataCheckOfData = (rowSelected === "date") ? new Date(state.searchOfTable): state.searchOfTable;

                console.log(col[rowSelected] === state.searchOfTable ? col.foundCol = rowSelected : col.foundCol = null);
                switch(actionsSelected) {
                    case "===": 
                        col[rowSelected] === state.searchOfTable ? col.foundCol = rowSelected : col.foundCol = null;
                        return col[rowSelected] === state.searchOfTable
                    case ">":
                        rowSelectedValueCheckOfData > searchOfTableDataCheckOfData ? col.foundCol = rowSelected : col.foundCol = null;
                        return rowSelectedValueCheckOfData > searchOfTableDataCheckOfData;
                    case "<": 
                        rowSelectedValueCheckOfData < searchOfTableDataCheckOfData ? col.foundCol = rowSelected : col.foundCol = null;
                        return rowSelectedValueCheckOfData < searchOfTableDataCheckOfData;
                    case "By":
                        col[rowSelected].includes(state.searchOfTable) ? col.foundCol = rowSelected : col.foundCol = null;
                        return col[rowSelected].includes(state.searchOfTable);
                    default:
                        // clear before search res
                        return state.bodyItems;
                };
            });
            return filterItems;
        };
    });

    // for adding some includes items before click on items, in table
    watch(state, (value) => {
        if(state.selectedItem !== null) {
            // update state for dropdown's and input fields
            state.searchOfTable = state.selectedItem.itemData;
            state.dropdownRow = state.selectedItem.itemColIndex;
            state.dropdownCondition = 1;

            // item 'update', for now select-click
            return state.selectedItem = null;
        }

        else if(state.selectedCol !== null) {
            state.dropdownRow = state.selectedCol.index;

            return state.selectedCol = null;
        }

    })
</script>