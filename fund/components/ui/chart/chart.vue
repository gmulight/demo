<template>
<div @panstart="touchStart" @panmove="touchMove" @panend="touchEnd">
  <canvas :id="chartId" ref="canvas_holder" :style="{width: width+'px', height:height+'px'}"></canvas>
  <div ref="location_line" class="location_line" :style="lineStyle" v-if="locationLineVisible"></div>
</div>
</template>
<script>
import { enable, WeexBridge, Image as GImage } from "canvas/index";
import F2 from './f2.js'
import Light from 'light'
const animation = Light.requireModule('animation')
var lg;
if (process.env.RUNTIME === "miniapp") {
    lg = __base__;
} else {
    lg = weex;
}
export default {
  props: {
    data: {
      type: Array
    },
    width: {
      default: 750
    },
    height: {
      default: 350
    },
    scale: {
      type: Number,
      default: 4
    },
    colors: {
      type: Array
    },
    tooltip: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      chart: null,
      locationLineVisible: true,
      lineStyle: {}
    }
  },
  watch: {
    data() {
      this.renderChart(this.data);
    }
  },
  mounted() {
    this.renderChart(this.data);
  },
  computed: {
    chartId () {
      return 'chart'+this._uid;
    }
  },
  methods: {
    isPointInPlot(point, plot) {
      const { x, y } = point;
      const { tl, tr, br } = plot;
      return (x >= tl.x && x <= tr.x); // && y >= tl.y && y <= br.y
    },
    touchStart (e) {
      if (this.tooltip && lg.config.env.platform != 'Web') {
        const plot = this.chart.get('plotRange')
        this.lineStyle = {
          top: plot.tl.y + 'px',
          height: (plot.br.y - plot.tl.y) + 'px'
        }
        this.moveLocationLine(e)
      }
    },
    touchMove (e) {
      if (this.tooltip && lg.config.env.platform != 'Web') {
        this.moveLocationLine(e)
      }
    },
    touchEnd (e){
      if (this.tooltip && lg.config.env.platform != 'Web') {
        this.locationLineVisible = false;
      }
    },
    moveLocationLine (e) {
      const plot = this.chart.get('plotRange')
        const point = F2.Util.createEvent(e, this.chart)
        if (!this.isPointInPlot(point, plot)) {
          this.locationLineVisible = false;
          return ;
        }
        const geoms = this.chart.get('geoms');
        const records = geoms[0].getSnapRecords(point);
        if (records && records.length > 0) {
          if (!this.locationLineVisible) this.locationLineVisible = true;
          animation.transition(this.$refs.location_line, {
            styles: {
                transform: 'translateX(' + point.x + 'px)',
                transformOrigin: 'left top'
            },
          }, function () {});
          this.$emit("sliding", records[0]._origin.data)
        };
    },
    renderChart (chartData) {
      if (!chartData) return ;
      if (!this.chart) this.initChart(chartData)
      else this.chart.changeData(chartData)
    },
    initChart (chartData) {
      let that = this;
      // Step 1: 创建 Chart 对象
      if (lg.config.env.platform != 'Web') {
        let ref = this.$refs.canvas_holder
        ref = enable(ref, {bridge: WeexBridge})
        let ctx = ref.getContext('2d')
        const canvas = new F2.Renderer(ctx)
        this.canvas = canvas
        this.chart = new F2.Chart({
          el: canvas, // 将第三步创建的 canvas 对象的上下文传入
          width: this.width, // 必选，图表宽度，同 canvas 的宽度相同
          height: this.height // 必选，图表高度，同 canvas 的高度相同
        })
      } else {
        this.chart = new F2.Chart({
          id: that.chartId,
          pixelRatio: window.devicePixelRatio // 指定分辨率
        })
      }
      let chart = this.chart
      chart.legend(false)
      chart.animate(false) // weex.config.env.platform == 'Web'
      // Step 2: 载入数据源
      chart.source(chartData, {
        value: {
          tickCount: 5,
          // min: 0,
          formatter: function formatter (val) {
            return val.toFixed(that.scale)+'%'
          }
        },
        date: {
          type: 'timeCat',
          range: [0, 1],
          mask: 'MM-DD',
          tickCount: 5
        }
      })
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.axis('date', {
        label: function label (text, index, total) {
          var textCfg = {}
          if (index === 0) {
            // textCfg.textAlign = 'start' // android上显示有问题
          } else if (index === total - 1) {
            textCfg.textAlign = 'end'
          }
          return textCfg
        }
      })
      if (that.tooltip == false || lg.config.env.platform != 'Web') {
        chart.tooltip(false);
      } else {
        chart.tooltip({
          showCrosshairs: true,
          crosshairsStyle: {
            stoke: 'rgba(81, 141, 254, 0.8)',
            width: 12
          },
          custom: true, // 自定义 tooltip 内容框
          onChange: function onChange (obj) {
            var items = obj.items
            var originData = items[0].origin
            that.$emit("sliding", originData.data)  
          },
          onHide: function onHide () {
          }
        })
      }
      chart.line({sortable: false}).position('date*value').color('type', that.colors);
      // Step 4: 渲染图表
      chart.render()
    }
  }
}
</script>
<style scoped>
.location_line {
    width:2px; 
    background-color:#D3D3D3;
    position: absolute;
    /* top: 10px; */
}
</style>

