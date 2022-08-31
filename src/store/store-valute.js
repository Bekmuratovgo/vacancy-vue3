import axios from 'axios';

const state = {
    valute: [],
    switchValute: [],
    switchValuteText: '',
    convertedValute: [],
    switchconvertedValute: [],
}
const mutations = {
    SET_ALL_VALUTES (state, data) {
        state.valute = data;
    },

    COPY_FOR_SWITCH_VALUTE (state, data) {
        state.switchValute = data;
    },
    SET_SWITCHED_VALUTE_TEXT (state, text) {
        state.switchValuteText = text;
    },
    SET_CONVERTED_VALUTE (state, data) {
        state.convertedValute = data;
    },
    COPY_FOR_SWITCH_CONVERT (state, data) {
        state.switchconvertedValute = data;
    },
}
const actions = {
    async getAllValutes ({commit}) {
        const { data } = await axios('https://www.cbr-xml-daily.ru/daily_json.js');

        let arrayData = Object.values(data.Valute);
        commit ('COPY_FOR_SWITCH_VALUTE', arrayData)
        
        let value = arrayData.map((item, index) => {
            let currCount = (item.Nominal / item.Value).toFixed(4);
            let prevCount = (item.Nominal / item.Previous).toFixed(4);
            let diffCount = (currCount - prevCount).toFixed(4);
            return {
                ...item,
                BaseValute: '1 Российский рубль',
                Value: currCount,
                Previous: prevCount,
                Difference: diffCount < 0 ? diffCount + ' ⬇ 🔴' : '+ ' + diffCount + ' ⬆ 🟢'
            }
        })
        commit ('SET_ALL_VALUTES', value);
        commit ('SET_SWITCHED_VALUTE_TEXT', 'Switch base valute (RUB)');  
    },
    
    async switchValute ({commit, dispatch}, isSwitchedValute) {
        if (isSwitchedValute) {
            let value = state.switchValute.map((item, index) => {
                let currCount = (item.Value / item.Nominal).toFixed(4);
                let prevCount = (item.Previous / item.Nominal).toFixed(4);
                let diffCount = (currCount - prevCount).toFixed(4);
                return {
                    ...item,
                    BaseValute: '1 ' + item.Name,
                    Value: currCount,
                    Name: 'Российский рубль',
                    Previous: prevCount,
                    Difference: diffCount < 0 ? diffCount + ' ⬇ 🔴' : '+ ' + diffCount + ' ⬆ 🟢'
                }
            })
            commit ('SET_ALL_VALUTES', value)  
            commit ('SET_SWITCHED_VALUTE_TEXT', 'Valute switched!');  
        } else {
            dispatch('getAllValutes')
        }
    },

    async convertValute ({commit}, valuteValue = 1) {
        const { data } = await axios('https://www.cbr-xml-daily.ru/daily_json.js');

        let arrayData = Object.values(data.Valute);
        commit ('COPY_FOR_SWITCH_CONVERT', arrayData);

        let value = arrayData.map((item, index) => {
            let oneRubCount = (item.Nominal / item.Value).toFixed(4);
            let counted = (oneRubCount * valuteValue).toFixed(4);
            return {
                ...item,
                BaseValuteValue: valuteValue,
                BaseValuteName: 'RUB',
                Value: counted,
            }
        })

        commit ('SET_CONVERTED_VALUTE', value)
    },

    switchConvertValute ({commit, dispatch}, {isSwitchedConvert, selectValue}) {
        selectValue ? selectValue : 1;
        if (isSwitchedConvert) {
            let data = state.switchconvertedValute.map((item, index) => {
                let oneRubCount = (item.Value / item.Nominal).toFixed(4);
                let counted = (oneRubCount * selectValue).toFixed(4);
                return {
                    ...item,
                    BaseValuteValue: selectValue,
                    BaseValuteName: item.CharCode,
                    CharCode: 'RUB',
                    Value: counted,
                }
            })
            commit ('SET_CONVERTED_VALUTE', data);
        } else {
            dispatch('convertValute');
        }
    },

}
const getters = {
    getterValute: (state) => {
        return state.valute
    }
}

export default {
    namespaced: true,
    getters,
    state,
    mutations,
    actions,
}