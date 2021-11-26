<template>
  <div @panstart="panStart" @panmove="panMove" @panend="panEnd">
    <canvas ref="canvas_holder" :style="{width: '750px', height:optionStyle.height+'px'}"></canvas>
    <div ref="location_line" class="location_line" :style="{height: locationLineHeight}" v-if="locationLineVisible"></div>
  </div>
</template>

<script>
    import { enable, WeexBridge, Image as GImage } from "canvas/index";
    import API from '@/api/api';
    var isWeex = typeof callNative === "function";
    const animation = weex.requireModule('animation');
    const yAxisRange = 2;
    const XAXIS_LENGTH = 5;
    export default {
        components: {},
        data() {
            return {
                isScrollable: true,
                realCanvas: {},
                cacheContext: {},
                yUnitLength: 0,
                canvasInfo: {},
                trendLeftValue: [],
                trendBottomValue: [],
                locationLineVisible: false,
                trendPointsList: [],
                defaultOption: {
                    height: 300,
                    lineColor: ['#2365BD', '#2365BD'],
                    fillColor: "#F5F8FC",
                    gridColor: '#F4F4F4',
                    axisColor: weex.config.env.platform === 'android' ? '#999999' : '#000000',
                    yxisColor:  '#F4F4F4'
                },
                locationLineHeight: '0px'
            };
        },
        props: {
            lineData: {},
            option: {},
            tooltip: { // 手指滑动显示线条
                type: Boolean,
                default: false
            },
            valueSuffix: { // y轴后缀 如 %
                type: String,
                default: ''
            },
            scale: {
                type: Number,
                default: 2
            }
        },
        mounted() {
        },
        watch: {
            lineData (newVal) {
                if (newVal.length == 0) {
                    this.trendBottomValue = 0;
                    this.trendLeftValue = 0;
                } else {
                    this.trendBottomValue = this.getXaxis(newVal);
                    this.trendLeftValue = this.getYaxis(newVal);
                }
                this.drawTrendGraph();
            }
        },
        methods: {
            drawTrendGraph() {
                var ref = this.$refs.canvas_holder;
                var size = this.getRealCanvasSize(ref);
                if (!isWeex) {
                    //canvas 在web上运行默认宽高是300*150大小 需要设置真实的宽高
                    ref.width = size.width;
                    ref.height = size.height;
                } else {
                    ref = enable(ref, {
                        bridge: WeexBridge
                    });
                }
                this.cacheContext = ref.getContext('2d');
                this.trendPointsList = [];
                this.renderChart();
            },
            renderChart() { //重新渲染
                this.initCanvas(this.trendLeftValue, this.trendBottomValue);
                this.handleTrendData(this.lineData);
                if (this.lineData.length == 1) { //仅有一条趋势线时进行填充操作
                    this.fillTrendLine();
                }
                this.drawGrid(this.trendLeftValue, this.trendBottomValue);
                this.drawTrendLine();
            },
            getRealCanvasSize(ref) {
                var size = isWeex ? {
                    width: 750,
                    height: this.optionStyle.height
                } : {
                    width: parseInt(ref.clientWidth),
                    height: parseInt(ref.clientHeight)
                };
                return size;
            },
            initCanvas(trendLeftValue, trendBottomValue) { //初始化canvas大小
                var realCanvas = this.realCanvas;
                var canvasInfo = this.canvasInfo;
                canvasInfo.leftX = 100 * this.webScale;
                canvasInfo.rightX = realCanvas.width - 40 * this.webScale;
                canvasInfo.topY = 10 * this.webScale;
                canvasInfo.bottomY = realCanvas.height - 40 * this.webScale;
                canvasInfo.stepX = (canvasInfo.rightX - canvasInfo.leftX) / (trendBottomValue.length - 1);
                canvasInfo.stepY = (canvasInfo.bottomY - canvasInfo.topY) / trendLeftValue.length;
                this.yUnitLength = (canvasInfo.stepY * (trendLeftValue.length - 1)) / (trendLeftValue[0] - trendLeftValue[trendLeftValue.length - 1]);
                this.cacheContext.clearRect(0, 0, realCanvas.width, realCanvas.height);
                if (isWeex) {
                    this.locationLineHeight = ((canvasInfo.bottomY * realCanvas.dpr)-10)+'px'
                } else {
                    this.locationLineHeight = ((this.optionStyle.height)-50)+'px'
                }
            },
            drawGrid(trendLeftValue, trendBottomValue) { //画网格
                function getOdd(value, add) {//数字为参数，返回奇数
                    return value % 2 == 0 ? value - 1 : value;
                }
                for (let index = 0; index < trendLeftValue.length; index++) {
                    var value = trendLeftValue[index];
                    var start = {
                        x: getOdd(this.canvasInfo.leftX),
                        y: getOdd(this.canvasInfo.topY + index * this.canvasInfo.stepY)
                    };
                    var end = {
                        x: getOdd(this.canvasInfo.rightX),
                        y: getOdd(this.canvasInfo.topY + index * this.canvasInfo.stepY)
                    };
                    this.drawGridLine(start, end);
                }

                //Y轴
                this.cacheContext.font = "20px";
                this.cacheContext.fillStyle = this.optionStyle.axisColor;
                this.cacheContext.textAlign = "right";
                this.cacheContext.textBaseline = "top";
                for (var index = 0; index < trendLeftValue.length; index++) {
                    this.cacheContext.fillText(parseFloat(trendLeftValue[index]).toFixed(this.scale) + this.valueSuffix, (100 - 20) * this.webScale, ((index) * this.canvasInfo.stepY));
                }
                //底部日期表
                for (let index = 0; index < trendBottomValue.length; index++) {
                    this.cacheContext.font = "20px";
                    this.cacheContext.fillStyle = this.optionStyle.axisColor;
                    this.cacheContext.textAlign = "center";
                    this.cacheContext.textBaseline = "top";
                    if(trendBottomValue.length == '1'){
                        this.cacheContext.fillText(trendBottomValue[index], (this.canvasInfo.leftX + this.canvasInfo.rightX)/2.0, this.canvasInfo.bottomY + 10 * this.webScale);
                    }
                    this.cacheContext.fillText(trendBottomValue[index], this.canvasInfo.leftX + (index * this.canvasInfo.stepX), this.canvasInfo.bottomY + 10 * this.webScale);
                }
            },
            handleTrendData(trendData) { //处理每个数据在图上的x,y坐标
                var maxValue = this.trendLeftValue[0];
                for (let i = 0; i < trendData.length; i++) {
                    this.trendPointsList[i] = [];
                    const line = trendData[i];
                    var xUnitLength = (this.canvasInfo.rightX - this.canvasInfo.leftX) / (line.length - 1);
                    for (var j = 0; j < line.length; j++) {
                        var item = line[j];
                        var point = {
                            x: this.canvasInfo.leftX + xUnitLength * j,
                            y: this.canvasInfo.topY + (maxValue - item.value) * this.yUnitLength
                        }
                        this.trendPointsList[i].push(point);
                    }
                }
            },
            fillTrendLine() { //线包围区域的背景色

                this.cacheContext.beginPath();
                this.cacheContext.fillStyle = this.optionStyle.fillColor;
                this.cacheContext.lineWidth = 1;
                this.cacheContext.moveTo(this.canvasInfo.leftX, this.canvasInfo.bottomY);
                for (let j = 0; j < this.trendPointsList[0].length; j++) {
                    const point = this.trendPointsList[0][j];
                    this.cacheContext.lineTo(point.x, point.y);
                }
                this.cacheContext.lineTo(this.canvasInfo.rightX, this.canvasInfo.bottomY);
                this.cacheContext.closePath();
                this.cacheContext.fill();
            },
            drawTrendLine() { //画折线
                for (let i = 0; i < this.trendPointsList.length; i++) {
                    this.cacheContext.beginPath();
                    this.cacheContext.strokeStyle = this.optionStyle.lineColor[i];
                    this.cacheContext.lineWidth = 2;
                    this.cacheContext.moveTo(this.trendPointsList[i][0].x, this.trendPointsList[i][0].y);
                    for (let j = 1; j < this.trendPointsList[i].length; j++) {
                        const point = this.trendPointsList[i][j];
                        this.cacheContext.lineTo(point.x, point.y);
                    }
                    this.cacheContext.stroke();
                }
            },
            drawGridLine(start, end) {
                this.cacheContext.beginPath();
                this.cacheContext.strokeStyle = this.optionStyle.gridColor;
                this.cacheContext.lineWidth = 1;

                this.cacheContext.moveTo(start.x, start.y);
                this.cacheContext.lineTo(end.x, end.y);
                this.cacheContext.stroke();
            },
            panStart(event) {
                if (this.tooltip) {
                    this.isScrollable = false;
                    this.moveLocationLine(event);
                }
            },
            panMove(event) {
                if (this.tooltip) {
                    this.isScrollable = false;
                    this.moveLocationLine(event);
                }
            },
            panEnd(event) {
                if (this.tooltip) {
                    this.isScrollable = true;
                    this.locationLineVisible = false;
                }
            },
            moveLocationLine(event) {
                var locationX;
                var min, max;
                var canReturnData = false;
                if (isWeex) {
                    locationX = event.changedTouches[0].pageX;
                    min = this.canvasInfo.leftX;
                    max = this.canvasInfo.rightX;
                } else {
                    locationX = event.changedTouches[0].pageX / weex.config.env.scale;
                    min = this.canvasInfo.leftX / weex.config.env.scale;
                    max = this.canvasInfo.rightX / weex.config.env.scale;
                }
                if (event.changedTouches[0].pageX < this.canvasInfo.leftX) {//超出边界,不返回数据
                    locationX = min;
                } else if ( event.changedTouches[0].pageX > this.canvasInfo.rightX) {//超出边界,不返回数据
                    locationX = max;
                } else {
                    this.locationLineVisible = true;
                    canReturnData = true;
                }
                if (this.$refs.location_line) {
                    animation.transition(this.$refs.location_line, {
                        styles: {
                            transform: 'translateX(' + locationX + 'px)',
                            transformOrigin: 'left top'
                        },
                    }, function() {});
                }
                if (canReturnData) {
                    var trendItem = this.getTrendItemByLocationX(event.changedTouches[0].pageX - 100 * this.webScale);
                    if (trendItem) {
                        this.$emit("sliding", trendItem)
                    }
                }
            },
            getTrendItemByLocationX(x) {
                var xUnitLength = (this.canvasInfo.rightX - this.canvasInfo.leftX) / (this.lineData[0].length - 1);
                var index = Math.round(x / xUnitLength);
                if (this.lineData.length == 1 && this.lineData[0][index]) {
                    return this.lineData[0][index].data;
                } else if (this.lineData.length == 2 && this.lineData[0][index]) {
                    return [
                        this.lineData[0][index].data,
                        this.lineData[1][index].data
                    ];
                }
            },
            joinDataLines (result) {
                var lists= [];
                if(result.length > 1){
                    result.forEach(function(item) {
                        lists = lists.concat(item);
                    });
                }else if (result.length == 1) {
                    lists = lists.concat(result[0]);
                }
                return lists;
            },
            getXaxis(result){
                var line = result[0];
                if (line.length <= XAXIS_LENGTH) {
                    return line.map(l => l.date.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, '$2-$3'))
                }
                var formatDate = function (date) {
                    return date.replace(/(\d{4})[^\d]?(\d{2})[^\d]?(\d{2})/, '$1-$2-$3');
                }
                var timeRange = [formatDate(line[0].date), formatDate(line[line.length - 1].date)];
                return this.TimeRange(timeRange[0], timeRange[1], XAXIS_LENGTH);
            },
            // 从fund.vue搬过来 这段有待优化
            TimeRange(startTimes, endTimes, amount) {// 传入参数 2017-10-05 2017-10-06 24 开始时间 结束时间 多少段
                startTimes = startTimes.split('-');
                endTimes = endTimes.split('-');
                startTimes = Date.parse(new Date(startTimes[0],(startTimes[1]-1),startTimes[2])); // 计算开始时间的时间戳
                endTimes = Date.parse(new Date(endTimes[0],(endTimes[1]-1),endTimes[2])); // 计算结束时间的时间戳
                var timeAll = endTimes - startTimes; // 总时间间隔
                if (endTimes <= startTimes) {
                    return -1;
                }
                if (amount < 2) {
                    return -2;
                }
                var timeRange = new Array(); // return数组初始化
                var timeGap = timeAll / amount; // 分割后时间间隔

                var momentTime_front = "";
                var momentTime_rear = "";

                for (var i = 0; i <= amount; i++) {

                    momentTime_front = this.addDatetime(startTimes + timeGap * (i));
                    momentTime_rear = this.addDatetime(startTimes + timeGap * (i + 1) - 1000);

                    timeRange.push(momentTime_front);
                }
                return timeRange;
            },
            addDatetime(dt) {//时间戳转换日期格式，我这边的格式是 "2017-10-05 01：02：56",需要补零
                dt = new Date(dt);
                var dataTime_str = "";

                var mon = parseInt(dt.getMonth()) + 1;
                dataTime_str += (mon < 10 ? ("0" + mon) : mon) + "-";//存入月  .getMonth()函数从0月开始算，正确日期应该+1

                var day = dt.getDate();
                dataTime_str += (day < 10 ? ("0" + day) : day) + " ";//存入日

                return dataTime_str;
            },
            getYaxis(result) {
                function processNull(v) {
                    return v == '--' ? 0 : v;
                }
                function splitYaxisStep(from, to) {//切分Y轴
                    // 对小于0 进行处理
                    var step = (to - from) / yAxisRange;
                    var flag = from;
                    var r = [flag-step, flag];
                    for (var i = 0; i < yAxisRange; i++) {
                        flag += step;
                        r.push(flag);
                    }
                    r.push(flag+step);
                    return r
                }
                function ToDecimal(x) {
                    var f = parseFloat(x);
                    if (isNaN(f)) {
                        return 0;
                    }
                    f = Math.round(x * 10000) / 10000;
                    return f + "";
                }
                var lists = this.joinDataLines(result);
                if (lists.length > 0) {
                    lists.sort((i, j) => {
                        return parseFloat(processNull(i.value)) > parseFloat(processNull(j.value)) ? -1 : 1;
                    });
                    var yAxisData = [];
                    splitYaxisStep(parseFloat(lists[0].value), parseFloat(lists[lists.length-1].value)).forEach((item) => {
                        yAxisData.push(ToDecimal(item));
                    });
                    return yAxisData;
                } else {
                    return [];
                }
            }
        },
        computed: {
            optionStyle() {
                for (var i in this.option) {
                    this.defaultOption[i] = this.option[i];
                }
                return this.defaultOption;
            }
        },
        mounted() {
            var scale = weex.config.env.scale;
            var realCanvas = this.realCanvas;
            realCanvas.dpr = weex.config.env.dpr ||1;
            if (isWeex) { //web会小于1
                realCanvas.width = 750;
                realCanvas.height = this.optionStyle.height;
            } else {
                realCanvas.width = weex.config.env.deviceWidth / realCanvas.dpr;
                realCanvas.height = weex.config.env.deviceWidth / realCanvas.dpr / 750 * this.optionStyle.height;
            }

            this.webScale = realCanvas.width / 750;
        }
    };
</script>

<style scoped>

  .location_line {
    width: 1px;
    background-color: #666;
    position: absolute;
    top: 10px;
  }
</style>

<doc>
  折线图插件
  <flot :lineData="flotData" :option="{height: 300}" @sliding="changeFlotLabel" ></flot>
  lineData：折线数据,组合型。 数组中实体例:{date: item.navdate, value: item.pernetvalue, data: item}
  sliding: 滑动折线图时，返回对应的数据.{date: item.navdate, value: item.pernetvalue, data: item}中的data项的值,即item。
</doc>