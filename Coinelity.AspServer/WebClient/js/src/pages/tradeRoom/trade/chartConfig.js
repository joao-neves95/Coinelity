 // Docs: https://ecomfe.github.io/echarts-doc/public/en/option.html#series-candlestick
const CHART_CONFIG = { backgroundColor: Colors.LighterGrey,// '#21202D',
  title: {
    text: this.currentSymbol,
    left: 'center'
  },
  animation: true,
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  toolbox: {
    show: true,
    right: 10,
    feature: {
      saveAsImage: {
        title: 'Save image as'
      },
      dataZoom: {
        yAxisIndex: 'none',
        title: {
          zoom: 'Area zoom',
          back: 'Restore area zoom'
        }
      },
      restore: {
        title: 'Restore'
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      animation: true
    }
  },
  xAxis: {
    type: 'category',
    data: this.chartData.categoryData,
    scale: true,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    splitNumber: 20,
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 90,
      end: 100
    },
    {
      show: true,
      type: 'slider',
      y: '90%',
      start: 50,
      end: 100
    }
  ],
  series: [
    {
      type: 'candlestick',
      data: this.chartData.values,
      itemStyle: {
        // Bullish candles.
        color: Colors.BullishGreen,
        borderColor: Colors.BullishGreen,
        // Bearish candles.
        color0: Colors.BearishRed,
        borderColor0: Colors.BearishRed
      }
    }//,
    //{
    //  name: 'MA10',
    //  type: 'line',
    //  data: calculateMA( 10, data ),
    //  smooth: true,
    //  showSymbol: false,
    //  lineStyle: {
    //    normal: {
    //      width: 1
    //    }
    //  }
    //},
  ]
};

