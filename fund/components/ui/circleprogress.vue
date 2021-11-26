<template>
         <canvas ref="canvas"  :style="{height:(canvasHeight)+'px',width:(canvasWidth)+'px'}"></canvas>
</template>

<script>
var isWeex = typeof callNative === "function";
import { enable, WeexBridge, Image as GImage } from "../../lib/canvas/index.js";
export default {
  data() { 
    return {
      canvasContext: {},
      bottomCavansContext: {},
      bottomCavans: {},
      canvasheight: "",
      canvaswidth: "",
      isWeex: isWeex,
      canvasHeight:this.height,
      canvasWidth:this.width,
    };
  },
  props: {
    height: {
      default: 200
    },
    width: {
      default: 200
    }
  },
  created: function() {
    this.bottomCavans = { width: this.width, height: this.height };
    var scale = weex.config.env.scale;
    this.bottomCavans.width =
      this.width * (weex.config.env.deviceWidth / scale * 2) / 750;
    this.bottomCavans.height =
      this.bottomCavans.width / this.width * this.height;
    if (!isWeex) {
      //web会小于1
      this.bottomCavans.width =
        weex.config.env.deviceWidth / weex.config.env.dpr;
      this.bottomCavans.height = this.bottomCavans.width / 750 * this.height;
    }
    if(weex.config.env.platform == "android"){
        this.canvasHeight = this.canvasHeight;
        this.canvasWidth = this.canvasWidth;
    }
  },

  methods: {
    setmContext() {
      var percentref = this.$refs.canvas;
      var size = this.getRealCanvasSize(percentref);
      if (!isWeex) {
        //canvas 在web上运行默认宽高是300*150大小 直接设置style属性不起效 需要设置真实的宽高
        percentref.width = size.width;
        percentref.height = size.height;
        // percentref.getContext("2d").scale(4, 4);
        this.bottomCavans = size;
      } else {
        percentref = enable(percentref, { bridge: WeexBridge });
      }
      var canvasContext = percentref.getContext("2d");
      this.bottomCavansContext = canvasContext;
    },
    //  setheight(height){
    //             this.canvasheight = height;
    //             this.$refs.canvas.height = height;
    //             },
    //  setwidth(width){
    //             this.canvaswidth = width;
    //             this.$refs.canvas.width = width;
    //             },
    getRealCanvasSize: function(ref) {
      var size = isWeex
        ? {
            width: 750,
            height: 400
          }
        : {
            width: parseInt(ref.clientWidth),
            height: parseInt(ref.clientHeight)
          };
      return size;
    },
    drawprogressCavans: function(description, descriptionColor, percent, percentColor, fontsize, forecolor, bgcolor) {
      /* 
        @description: 上面一行的文字描述
        @descriptionColor: 上面一行的文字描述的颜色
        @fontsize: 字体大小 
        @percent：绘制圆环百分比, 范围[0, 100]，若百分比展示文本非数字可以传入如下格式数据：[70, "-10,121.00"] ，70表示圆环百分比，"-10,121.00"表示圆环中展示内容
        @percentColor：绘制圆环百分比的颜色
        @forecolor: 绘制圆环的前景色，颜色代码 
        @bgcolor: 绘制圆环的背景色，颜色代码 
    */

      var percentref = this.$refs.canvas;
      var context = this.bottomCavansContext;
      var center_x = this.bottomCavans.width / 2.15;
      var center_y = this.bottomCavans.height / 2.15;
      var rad = Math.PI * 2 / 100;
      var speed = 0;
      var interval = setInterval(() => {
        if (!isWeex) {
          context.clearRect(0, 0, percentref.width, percentref.height);
        } else {
          context.clearRect(
            0,
            0,
            this.bottomCavans.width+5,
            this.bottomCavans.height+5
          );
        }

        backgroundCircle();
        if (typeof percent == "number") {
          drawText(description, speed);
        }
        else {
          drawText(description, percent[1]);
        }
        foregroundCircle(speed);
        if (speed >= (typeof percent == "number" ? percent : percent[0])) {
          clearInterval(interval);
          return;
        };
        speed += 1;
      }, 20);
      // 绘制背景圆圈
      function backgroundCircle() {
        context.save();
        context.beginPath();
        if (!isWeex) {
          context.lineWidth = 2; //设置线宽
        } else {
          context.lineWidth = 5; //设置线宽
        }
        var radius = center_x - context.lineWidth;
        context.lineCap = "round";
        context.strokeStyle = bgcolor;

        context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
      }

      //绘制运动圆环
      function foregroundCircle(n) {
        context.save();
        context.strokeStyle = forecolor;
        if (!isWeex) {
          context.lineWidth = 2; //设置线宽
        } else {
          context.lineWidth = 5; //设置线宽
        }
        context.lineCap = "round";
        var radius = center_x - context.lineWidth;
        context.beginPath();
        context.arc(
          center_x,
          center_y,
          radius,
          -Math.PI,
          -Math.PI + n * rad,
          false
        ); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
      }

      //绘制文字
      function drawText(description, speed) {
        context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillStyle = descriptionColor;
        if (!isWeex) {
               var textfontsize = fontsize/2;
         }else{
              var  textfontsize = fontsize;
         }
        var font_size = textfontsize;
         
       context.font = font_size + "px Helvetica";
        // var text_width = context.measureText(n.toFixed(0)+"%").width;
        if(description!=null&&description!=undefined&&description!=""){
            // center_x - font_size-font_size / 2,
          context.fillText(
          description,
          center_x,
          center_y - font_size,
        );
        }
        context.fillStyle = percentColor;
        context.fillText(
          typeof speed == "number" ? speed.toFixed(0) + "%" : speed,
          center_x,
          center_y + font_size / 2
        );
        context.restore();
      }
    },
  }
};
</script>
<style scoped>

</style>


