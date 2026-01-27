import React from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { LoanPayment } from '../hooks/useCarLoanCalculator';

interface CarLoanChartProps {
  paymentSchedule: LoanPayment[];
  totalPrincipal: number;
  totalInterest: number;
}

export const CarLoanChart: React.FC<CarLoanChartProps> = ({ 
  paymentSchedule, 
  totalPrincipal, 
  totalInterest 
}) => {
  // 准备折线图数据
  const lineChartData = paymentSchedule.map(item => ({
    period: item.period,
    principal: item.principalPayment,
    interest: item.interestPayment,
    total: item.totalPayment
  }));
  
  // 准备饼图数据
  const pieChartData = [
    { name: '本金', value: totalPrincipal },
    { name: '利息', value: totalInterest }
  ];
  
  // 折线图配置
  const lineChartOption: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['月供本金', '月供利息', '月供总额'],
      top: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: lineChartData.map(item => item.period)
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} 元'
        }
      }
    ],
    series: [
      {
        name: '月供本金',
        type: 'line',
        stack: '总量',
        areaStyle: {
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          color: '#3b82f6'
        },
        itemStyle: {
          color: '#3b82f6'
        },
        data: lineChartData.map(item => item.principal)
      },
      {
        name: '月供利息',
        type: 'line',
        stack: '总量',
        areaStyle: {
          opacity: 0.3
        },
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          color: '#ef4444'
        },
        itemStyle: {
          color: '#ef4444'
        },
        data: lineChartData.map(item => item.interest)
      },
      {
        name: '月供总额',
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          color: '#8b5cf6',
          width: 3
        },
        itemStyle: {
          color: '#8b5cf6'
        },
        data: lineChartData.map(item => item.total)
      }
    ]
  };
  
  // 饼图配置
  const pieChartOption: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 元 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 'center'
    },
    series: [
      {
        name: '贷款构成',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: pieChartData,
        color: ['#3b82f6', '#ef4444']
      }
    ]
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-center">还款趋势图</h3>
        <ReactECharts option={lineChartOption} style={{ height: 300 }} />
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2 text-center">贷款构成比例</h3>
        <ReactECharts option={pieChartOption} style={{ height: 300 }} />
      </div>
    </div>
  );
};