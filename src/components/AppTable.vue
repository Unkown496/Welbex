<template>
    <div class="card shadow-xl rounded-none">
        <div class="card-body !p-0">
            <header class="card-header">
                <div class="row flex-1">    
                    <div class="col-12">
                        <div class="row sm:items-center">
                            <div class="col-6 sm:col-4 md:col-3 lg:col-2">
                                <BaseDropdown>
                                    <template #activator="menu">
                                        <button 
                                            class="btn btn-primary flex-1"
                                        >
                                            {{ state.dropdownRow !== null ? columns[state.dropdownRow].text : "Выберите колонку" }}
                                        </button>
                                    </template>
                                    <template #default>
                                        <li 
                                            v-for="(col, i) in columns"
                                            :key="col"
                                        >
                                            <button
                                                @click="selectItem(i, 'dropdownRow', $event)"
                                                :class="{'!bg-primary': state.dropdownRow === i }"
                                            >
                                                <a>
                                                    {{ col.text }}
                                                </a>
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
                                                :class="{ '!bg-primary': state.dropdownCondition === i }"
                                                @click="selectItem(i, 'dropdownCondition', $event)"
                                            >
                                                <a>
                                                    {{ condition.text }}
                                                </a>
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
                                            <button
                                                v-show="state.dropdownRow !== null && state.dropdownCondition !== null && (state.searchOfTable !== '' || state.searchOfTable !== ' ')"
                                                @click="state.dropdownRow = null, state.dropdownCondition = null, state.searchOfTable = ''"
                                            >
                                                <icon
                                                    icon="CloseCircleOutline"
                                                />
                                            </button>
                                        </span>
                                        <input type="text" placeholder="Введите значение" class="input input-bordered !outline-none !w-[90%]" v-model="state.searchOfTable">
                                        <span v-show="state.searchOfTable !== '' && state.searchOfTable !== ' '">
                                            <button
                                                @click="state.searchOfTable = ''"
                                            >
                                                <icon 
                                                    icon="Close"
                                                />
                                            </button>
                                        </span>
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <TransitionGroup 
                name="slide-x"
                tag="div"
                mode="in-out"
                appear
                class="table-app__mobile"
            >
                <div 
                    v-for="rowData in state.countRows === null ? sliceItemOfPage : sliceItemOfPage[state.currentPage-1]"
                    :key="rowData"
                    class="table-app__mobile-table-row"
                >
                    <div 
                        class="table-app__mobile-table-col-row"
                    > 
                        <div 
                            v-for="(col, i) in columns"
                            :key="col"
                            class="table-app__mobile-col"
                        >
                            <div class="table-app__mobile-col__title">
                                <button
                                    class="btn btn-ghost"
                                    @click="state.dropdownRow = i"
                                >
                                    {{ col.text }}
                                </button>
                            </div>
                            <div 
                                class="table-app__mobile-col__data"
                                :class="[ `!text-${col.alignCol === undefined ? 'left': col.alignCol}`, `!bg-${rowData.foundCol === col.value ? colorOnFoundCols : ''}`, { 'text-white': rowData.foundCol === col.value } ]"
                            >
                                <button
                                    class="btn btn-ghost"
                                    @click="state.searchOfTable = rowData[col.value]"  
                                >
                                    {{ rowData[col.value] }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
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
                                @click="state.dropdownRow = i"
                            >
                               {{col.text}}
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
                    <tr 
                        v-for="rowData in state.countRows === null ? sliceItemOfPage : sliceItemOfPage[state.currentPage-1]"
                        :key="rowData"
                    >
                        <td 
                            v-for="col in columns"
                            :key="col"
                            :class="[ `!text-${col.alignCol === undefined ? 'left': col.alignCol}`, `!bg-${rowData.foundCol === col.value ? colorOnFoundCols : ''}`, { 'text-white': rowData.foundCol === col.value } ]"
                        >
                            <button
                                class="btn btn-ghost"
                                @click="state.searchOfTable = rowData[col.value]"
                            >
                                {{ rowData[col.value] }}
                            </button>
                        </td>
                    </tr>
                </TransitionGroup>
            </table>
            <footer class="card-footer">
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
                                            class="flex border-b-2 border-gray-500 pb-1"
                                            
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
                                            @click="state.countRows =  null"
                                            :class="{ '!bg-primary': state.countRows === null }"
                                        >
                                            <a>
                                                Все
                                            </a>
                                        </button>
                                            
                                    </li>
                                    <li 
                                        v-for="(count, i) in calculateCountRows"
                                        :key="count"
                                    >

                                        <button
                                            @click="selectItem(count, 'countRows', $event)"
                                            :class="{ '!bg-primary': state.countRows === count }"
                                        >
                                            <a>
                                                {{ count }}
                                            </a>
                                        </button>
                                    </li>
                                </template> 
                            </BaseDropdown>
                        </div>
                        <div 
                            v-show="state.countRows !== null"
                            class="col-12 sm:col-7 my-3"
                        >
                            <BasePagination
                                v-model="state.currentPage"
                                :length="sliceItemOfPage.length"
                            ></BasePagination>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        
        <!-- for compile tailwind classes anyway casess -->
        <span 
            v-show="false"
            v-once
            class="!text-left !text-right !text-center !text-end !text-justify !text-start"
        ></span>
    </div>
</template>
<script setup>
    import icon from "./mdiIcons/BaseIcon.vue";
    import BaseDropdown from "./BaseDropdown/BaseDropdown.vue";
    import BasePagination from "./BasePagination/BasePagination.vue";

    import { defineProps, toRefs, computed, reactive, onBeforeMount } from "vue";

    const props = defineProps({
        columns: {
            type: Array,
            required: true,
        }, 
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
    });


    const { columns, items, colorOnFoundCols } = toRefs(props);


    const state = reactive({
        tableData: "",
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
        countRows: null,
        currentPage: 1,
    });

    // add
    onBeforeMount(() => {
        state.tableData = [...items.value].map( col => ({ ...col, foundCol: null }));
    });

    const selectItem = function (index, reactiveStateOfEl, event) {
        const targetClasses = event.target.classList;
        console.log(index);
        if(targetClasses.contains("!bg-primary")) {
            return state[reactiveStateOfEl] = null;
        }
        else {
            return state[reactiveStateOfEl] = index;
        }
    };

    const calculateCountRows = computed(() => {
        let resArr = []
        if(items.value.length > 1) {
            Array.from(Array(Math.round(items.value.length / 2)).keys()).forEach(item => {
                let num = item + 1;

                if(Number.isInteger(num / 2)) {
                    resArr.push(num);
                };
            });
            return resArr;
        }
        else {
            return ["Все"];
        }
    });



    const filtredItems = computed(() => {
        let rowSelected = state.dropdownRow !== null ? columns.value[state.dropdownRow].value: null;
        let actionsSelected = state.dropdownCondition !== null ? state.conditionFilter[state.dropdownCondition].value: null;
        // if row not selected and search on table equal a null
        if(!((rowSelected && actionsSelected) && (state.searchOfTable !== "" && state.searchOfTable !== " "))) {
            return items.value;
        }

        else {
            return state.tableData.filter(col => {
                switch(actionsSelected) {
                    case "===": 
                        col[rowSelected] === state.searchOfTable ? col.foundCol = rowSelected : col.foundCol = null;
                        return col[rowSelected] === state.searchOfTable
                    case ">":
                        col[rowSelected] > state.searchOfTable ? col.foundCol = rowSelected : col.foundCol = null;
                        return col[rowSelected] > state.searchOfTable;
                    case "<": 
                        col[rowSelected] < state.searchOfTable ? col.foundCol = rowSelected : col.foundCol = null;
                        return col[rowSelected] < state.searchOfTable;
                    case "By":
                        col[rowSelected].includes(state.searchOfTable) ? col.foundCol = rowSelected : col.foundCol = null;
                        return col[rowSelected].includes(state.searchOfTable);
                    default:
                        return items.value;
                };
            });
        };
    });

    const sliceItemOfPage = computed(() => {
        let copyItems = [...filtredItems.value];
        let slicedArr = [];

        if(state.countRows !== null) {
            while(copyItems.length > 0) {
                const chunk = copyItems.splice(0, state.countRows);
                slicedArr.push(chunk);
            };
           return slicedArr; 
        }
        else {
            return copyItems;
        };
        
    });
</script>