<template>
  <div class="q-pa-md converter">
    <div class="converter_changer">
      <h6>Чтобы конвертировать, кликните на <span class="blueText">цифру</span> что слева</h6>
      <q-btn
        color='primary'
        :disable="loading" 
        @click="switchConverter"
      >
        Change Valute
      </q-btn>
    </div>
    <q-table
      title="Converter"
      :rows="rows"
      :columns="columns"
      row-key="BaseValuteValue"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="BaseValuteValue" :props="props">
            {{ props.row.BaseValuteValue }}
            <q-popup-edit 
              v-model="props.row.BaseValuteValue" 
              title="Update Value" 
              v-slot="scope"
            >
              <q-input type="number" v-model="scope.value" dense autofocus />
              <q-btn color="primary" v-on:click="handleChange(scope, 'set') && scope.set()" label="Set" />
              <q-btn color="primary" v-on:click="handleChange(scope, 'cancel')" label="Cancel" />
            </q-popup-edit>
          </q-td>

          <q-td key="BaseValuteName" :props="props">
            {{ props.row.BaseValuteName }}
          </q-td>
  
          <q-td key="CharCode" :props="props">{{ props.row.CharCode }}</q-td>
          <q-td key="Value" :props="props">{{ props.row.Value }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex';

const columns = [
  {
    name: 'BaseValuteValue',
    required: true,
    label: 'Select Valute ⬇',
    align: 'center base',
    field: 'BaseValuteValue',
  },
  { name: 'BaseValuteName', label: 'Base Valute Name', align: 'center convert', field: 'BaseValuteName' },
  { name: 'CharCode', label: 'Converter Charcode', align: 'center', field: 'CharCode', sortable: true },
  { name: 'Value', label: 'Value', field: 'Value', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

export default {
  name: 'Converter-page',

  setup () {
    const store = useStore();
    let isSwitchedConvert = false;

    onBeforeMount (() => {
      store.dispatch('valuteStore/convertValute');
    });

    const handleChange = (val, type) => {
      if (type === 'set' && isSwitchedConvert) {
        store.dispatch('valuteStore/switchConvertValute',{isSwitchedConvert, selectValue: +val.value});
        val.set();
      } else if (type === 'set') {
        store.dispatch('valuteStore/convertValute', +val.value);
        val.cancel();
      } else {
        val.cancel()
      }
    }

    const convertValute = computed (() => store.state.valuteStore.convertedValute);

    const switchConverter = () => {
      isSwitchedConvert = !isSwitchedConvert;
      store.dispatch('valuteStore/switchConvertValute', {isSwitchedConvert, selectValue: 1});
    }


    return {
      handleChange,
      switchConverter,
      columns,
      rows: ref(convertValute)
    }
  }
}
</script>

<style lang="scss">
.converter {
  margin: 20px;

  .converter_changer {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .blueText{
    color: red;
  }
  .convert {
    border-right: 1px solid rgb(0 0 0 / 12%);
    width: 5%;
  }
  .base {
    width: 5%;
  }
  .base:hover {
    transition: 0.5s;
    background: #1976d2;
    color: white;
  }
}
.converter h6 {
  margin: 0 0 10px 0;
  font-size: 16px;
}
</style>