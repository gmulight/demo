

Page({
  data: {
    declare: [{
      money: 'M<100万',
      rate: '1.5%'
    }, {
      money: '100万≤M<300万',
      rate: '1%'
    }, {
      money: '300万≤M<500万',
      rate: '1%'
    }, {
      money: 'M≥500万',
      rate: '1000元/笔'
    }],//购买费率
    redeem: [{
      day: 'T<7日',
      rate: '1.5%'
    }, {
      day: '7日≤T<30日',
      rate: '0.75%'
    }, {
      day: '30日≤T<1年',
      rate: '0.5%'
    }, {
      day: '1年≤T<2年',
      rate: '0.25%'
    }, {
      day: 'T≥2年',
      rate: '0%'
    },

    ],//赎回费率
  },
  onLoad: function () {
  }
})
