<template>
  <div class="q-pa-md table">
    <q-table
      title="Valute"
      :rows="valute"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-btn
            color='primary'
            :disable="loading" 
            @click="SwitchAction" 
        >
            {{ switchValuteText }}
        </q-btn>
        <q-space />
        <q-input placeholder="Search" class="search" borderless dense debounce="300" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';


const columns = [
{ name: 'BaseValute', align: `left borderLine`, label: 'Base Valute ➤', field: 'BaseValute', sortable: true },
{
    name: 'CharCode',
    required: true,
    label: 'CharCode',
    align: `center borderLine`,
    field: 'CharCode',
    sortable: true
},
{ name: 'Name', align: 'center', label: 'Converted Valute', field: 'Name', sortable: true },
{ name: 'Value', label: 'Value', field: 'Value', sortable: true },
{ name: 'Previous', label: 'Previous', field: 'Previous' },
{ name: 'Difference', label: 'Difference', field: 'Difference' },
]

export default {
    name: 'List-page',

  setup (props, context) {
    const filter = ref('');
    const store = useStore();
    let baseValute = false;

    onBeforeMount (() => {
        store.dispatch('valuteStore/getAllValutes');
    });

    const valute = computed( () => store.state.valuteStore.valute);
    const switchValuteText = computed(() => store.state.valuteStore.switchValuteText);

    const SwitchAction = () => {
        baseValute = !baseValute;
        store.dispatch('valuteStore/switchValute', baseValute);
    };
    

    return {
      SwitchAction,
      switchValuteText,
      baseValute,
      filter,
      columns,
      valute,
    }
  }
}
</script>

<style lang="scss">
.table {
    margin: 20px;

    .search {
        background: rgb(243, 243, 243);
        border-radius: 3px;
        padding-left: 8px;
    }
    .borderLine {
        border-right: 1px solid rgb(0 0 0 / 12%);
    }
}
</style>