<template>
  <chart :data="chartData" :scale="2"></chart>
</template>
<script>
import chart from './chart'
import API from '../../../api/api';
export default {
  components: { chart },
  data () {
    return {
      chartData: null
    }
  },
  created() {
    this.queryHismarket();
  },
  methods: {
    formatDate (date, divider = '-') {
      return date.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, ['$1', '$2', '$3'].join(divider));
    },
    getLineData (type, item) {
      return {
        type: type,
        date: this.formatDate(item.navdate),
        value: parseFloat(item[type]),
        data: item
      }
    },
    queryHismarket () {
      var form = API.formGenerate()
        .add("fundcode", '225020')
        .add("queryunit", '1')
        .add("applyrecordno", 31).generate();
      API.get("product/otherinfo/hisMarket", form,(jsonResult) => {
        if (jsonResult.successful == true) {
          var line = [];
          jsonResult.result.reverse().forEach((item) => {
            if (item.fundtype == "2") {
              line.push(this.getLineData('incomeratio', item))
              item.hfincomeratio = parseFloat(item.hfincomeratio) * 100
              line.push(this.getLineData('hfincomeratio', item))
            } else {
              line.push(this.getLineData('pernetvalue', item))
              line.push(this.getLineData('totalnetvalue', item))
            }
          });
          this.chartData = line;
        }
      });
    }
  }
}
</script>
