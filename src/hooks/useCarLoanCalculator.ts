import { useState, useMemo } from 'react';

// 定义贷款计算结果接口
export interface LoanPayment {
  period: number; // 期数
  totalPayment: number; // 月供总额
  principalPayment: number; // 本金
  interestPayment: number; // 利息
  remainingPrincipal: number; // 剩余本金
}

// 定义计算参数接口
export interface LoanParams {
  loanAmount: number; // 贷款金额
  loanTerm: number; // 贷款期限（月）
  annualRate: number; // 年利率
  paymentType: 'equal-principal-interest' | 'equal-principal'; // 还款方式
}

export function useCarLoanCalculator() {
  // 默认参数
  const [params, setParams] = useState<LoanParams>({
    loanAmount: 100000,
    loanTerm: 36,
    annualRate: 4.75,
    paymentType: 'equal-principal-interest'
  });
  
  // 计算每月还款明细
  const paymentSchedule = useMemo(() => {
    const { loanAmount, loanTerm, annualRate, paymentType } = params;
    const monthlyRate = annualRate / 100 / 12; // 月利率
    
    const schedule: LoanPayment[] = [];
    let remainingPrincipal = loanAmount;
    
    if (paymentType === 'equal-principal-interest') {
      // 等额本息计算
      const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
      
      for (let i = 1; i <= loanTerm; i++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingPrincipal -= principalPayment;
        
        // 最后一期处理，确保剩余本金为0
        const adjustedRemainingPrincipal = i === loanTerm ? 0 : Math.max(0, remainingPrincipal);
        
        schedule.push({
          period: i,
          totalPayment: monthlyPayment,
          principalPayment,
          interestPayment,
          remainingPrincipal: adjustedRemainingPrincipal
        });
      }
    } else {
      // 等额本金计算
      const monthlyPrincipal = loanAmount / loanTerm;
      
      for (let i = 1; i <= loanTerm; i++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const totalPayment = monthlyPrincipal + interestPayment;
        remainingPrincipal -= monthlyPrincipal;
        
        // 最后一期处理，确保剩余本金为0
        const adjustedRemainingPrincipal = i === loanTerm ? 0 : Math.max(0, remainingPrincipal);
        
        schedule.push({
          period: i,
          totalPayment,
          principalPayment: monthlyPrincipal,
          interestPayment,
          remainingPrincipal: adjustedRemainingPrincipal
        });
      }
    }
    
    return schedule;
  }, [params]);
  
  // 计算总还款额和总利息
  const summary = useMemo(() => {
    const totalPayment = paymentSchedule.reduce((sum, payment) => sum + payment.totalPayment, 0);
    const totalInterest = paymentSchedule.reduce((sum, payment) => sum + payment.interestPayment, 0);
    
    return {
      totalPayment,
      totalInterest,
      totalPrincipal: params.loanAmount,
      monthlyPayment: paymentSchedule[0]?.totalPayment || 0
    };
  }, [paymentSchedule, params.loanAmount]);
  
  // 更新参数
  const updateParams = (newParams: Partial<LoanParams>) => {
    setParams(prev => ({
      ...prev,
      ...newParams
    }));
  };
  
  return {
    params,
    updateParams,
    paymentSchedule,
    summary
  };
}