// 数字滚动动画
function animateNumbers() {
  const nums = document.querySelectorAll('.stat-number');
  nums.forEach(num => {
    const target = +num.dataset.target;
    const duration = 2200;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        num.innerText = target.toLocaleString();
        clearInterval(timer);
      } else {
        num.innerText = Math.floor(current).toLocaleString();
      }
    }, 16);
  });
}

// 深色科技风图表基础配置
const baseTextColor = "#b9d3f2";
const axisLineColor = "rgba(88, 160, 255, 0.3)";
const splitLineColor = "rgba(88, 160, 255, 0.08)";

function commonChart() {
  return {
    textStyle: {
      color: baseTextColor,
      fontFamily: "Microsoft YaHei, PingFang SC, sans-serif"
    }
  };
}

// 01 数据总览
function initOverviewChart() {
  const chart = echarts.init(document.getElementById('overviewChart'));
  const option = {
    ...commonChart(),
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: ['核心产业规模', '带动相关产业规模'],
      textStyle: { color: baseTextColor },
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '14%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023', '2024'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor }
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      nameTextStyle: { color: baseTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [
      {
        name: '核心产业规模',
        type: 'line',
        smooth: true,
        data: [1100, 1560, 2180, 3120, 4250, 5786],
        itemStyle: { color: '#58e0e6' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(88, 224, 230, 0.45)' },
            { offset: 1, color: 'rgba(88, 224, 230, 0.02)' }
          ])
        }
      },
      {
        name: '带动相关产业规模',
        type: 'line',
        smooth: true,
        data: [3800, 5200, 7200, 9800, 12800, 16500],
        itemStyle: { color: '#4da3ff' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(77, 163, 255, 0.45)' },
            { offset: 1, color: 'rgba(77, 163, 255, 0.02)' }
          ])
        }
      }
    ]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 投资热度图
function initInvestChart() {
  const chart = echarts.init(document.getElementById('investChart'));
  const option = {
    ...commonChart(),
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    series: [{
      type: 'pie',
      radius: ['45%', '72%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#0b1a3a',
        borderWidth: 3
      },
      label: {
        color: baseTextColor,
        fontSize: 12
      },
      data: [
        { value: 42, name: '算法与模型', itemStyle: { color: '#58e0e6' } },
        { value: 31, name: '算力基础设施', itemStyle: { color: '#4da3ff' } },
        { value: 27, name: '数据与应用', itemStyle: { color: '#a57bff' } }
      ]
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 02 产业增长柱状图
function initGrowthChart() {
  const chart = echarts.init(document.getElementById('growthChart'));
  const option = {
    ...commonChart(),
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    legend: {
      data: ['核心产业规模', '同比增速'],
      textStyle: { color: baseTextColor },
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '14%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['2019', '2020', '2021', '2022', '2023', '2024'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor }
    },
    yAxis: [
      {
        type: 'value',
        name: '规模（亿元）',
        position: 'left',
        nameTextStyle: { color: baseTextColor },
        axisLine: { lineStyle: { color: axisLineColor } },
        axisLabel: { color: baseTextColor },
        splitLine: { lineStyle: { color: splitLineColor } }
      },
      {
        type: 'value',
        name: '增速（%）',
        position: 'right',
        nameTextStyle: { color: baseTextColor },
        axisLine: { lineStyle: { color: axisLineColor } },
        axisLabel: { color: baseTextColor },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '核心产业规模',
        type: 'bar',
        data: [1100, 1560, 2180, 3120, 4250, 5786],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#58e0e6' },
            { offset: 1, color: '#4da3ff' }
          ]),
          borderRadius: [8, 8, 0, 0]
        },
        barWidth: 36
      },
      {
        name: '同比增速',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        data: [null, 41.8, 39.7, 43.1, 36.2, 36.1],
        itemStyle: { color: '#a57bff' },
        symbolSize: 10
      }
    ]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 03 行业渗透
function initIndustryChart() {
  const chart = echarts.init(document.getElementById('industryChart'));
  const option = {
    ...commonChart(),
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '6%',
      bottom: '3%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '渗透率（%）',
      nameTextStyle: { color: baseTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    yAxis: {
      type: 'category',
      data: ['智慧农业', '智慧零售', '智慧金融', '智能医疗', '智能交通', '智能制造'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor }
    },
    series: [{
      type: 'bar',
      data: [18, 29, 35, 32, 41, 48],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: '#4da3ff' },
          { offset: 1, color: '#58e0e6' }
        ]),
        borderRadius: [0, 10, 10, 0]
      },
      barWidth: 28,
      label: {
        show: true,
        position: 'right',
        color: baseTextColor,
        formatter: '{c}%'
      }
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 04 价值雷达图
function initValueChart() {
  const chart = echarts.init(document.getElementById('valueChart'));
  const option = {
    ...commonChart(),
    tooltip: {
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    radar: {
      indicator: [
        { name: '生产效率', max: 100 },
        { name: '成本控制', max: 100 },
        { name: '创新能力', max: 100 },
        { name: '产品质量', max: 100 },
        { name: '安全保障', max: 100 }
      ],
      radius: '68%',
      axisName: {
        color: baseTextColor,
        fontSize: 14
      },
      splitArea: {
        areaStyle: {
          color: [
            'rgba(77, 163, 255, 0.04)',
            'rgba(77, 163, 255, 0.08)',
            'rgba(77, 163, 255, 0.12)',
            'rgba(77, 163, 255, 0.16)',
            'rgba(77, 163, 255, 0.2)'
          ]
        }
      },
      axisLine: {
        lineStyle: { color: axisLineColor }
      },
      splitLine: {
        lineStyle: { color: axisLineColor }
      }
    },
    series: [{
      type: 'radar',
      data: [{
        value: [85, 78, 92, 88, 80],
        name: 'AI赋能指数',
        areaStyle: {
          color: 'rgba(88, 224, 230, 0.35)'
        },
        lineStyle: {
          color: '#58e0e6',
          width: 2
        },
        itemStyle: {
          color: '#58e0e6'
        }
      }]
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 05 区域发展
function initRegionChart() {
  const chart = echarts.init(document.getElementById('regionChart'));

  const option = {
    ...commonChart(),
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['北京', '上海', '深圳', '杭州', '广州', '南京', '成都', '武汉', '西安'],
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor }
    },
    yAxis: {
      type: 'value',
      name: '综合指数',
      nameTextStyle: { color: baseTextColor },
      axisLine: { lineStyle: { color: axisLineColor } },
      axisLabel: { color: baseTextColor },
      splitLine: { lineStyle: { color: splitLineColor } }
    },
    series: [{
      type: 'bar',
      data: [95, 91, 89, 84, 78, 73, 70, 68, 64],
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#a57bff' },
          { offset: 1, color: '#4da3ff' }
        ]),
        borderRadius: [10, 10, 0, 0]
      },
      barWidth: 40
    }]
  };

  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 06 就业影响
function initJobChart() {
  const chart = echarts.init(document.getElementById('jobChart'));
  const option = {
    ...commonChart(),
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 25, 50, 0.9)',
      borderColor: 'rgba(88, 224, 230, 0.4)',
      textStyle: { color: '#fff' }
    },
    legend: {
      bottom: 0,
      textStyle: { color: baseTextColor }
    },
    series: [{
      type: 'pie',
      radius: ['42%', '70%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#0b1a3a',
        borderWidth: 3
      },
      label: {
        color: baseTextColor
      },
      data: [
        { value: 45, name: '新增高技能岗位', itemStyle: { color: '#58e0a6' } },
        { value: 38, name: '传统岗位转型', itemStyle: { color: '#58e0e6' } },
        { value: 17, name: '重复性岗位替代', itemStyle: { color: '#ff8484' } }
      ]
    }]
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
}

// 滚动触发动画
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    '.overview-card, .growth-item, .note-card, .region-card, .job-card, .case-card, .value-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
}

// 页面加载完成
window.addEventListener('load', () => {
  animateNumbers();
  initOverviewChart();
  initInvestChart();
  initGrowthChart();
  initIndustryChart();
  initValueChart();
  initRegionChart();
  initJobChart();
  initScrollAnimations();
});
