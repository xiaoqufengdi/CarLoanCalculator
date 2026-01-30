import { useState } from 'react';
import {
    Form,
    InputNumber,
    Select,
    Table,
    Button,
    Row,
    Col,
    Card,
    Statistic,
    Divider,
    message, TableColumnType
} from 'antd';

import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

import { useCarLoanCalculator } from '../hooks/useCarLoanCalculator';
import { CarLoanChart } from '../components/CarLoanChart';
import FriendLinks from '../components/FriendLinks';

const { Option } = Select;

export default function CarLoanCalculator() {

  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // 每页显示12个月（一年）
  
  const { params, updateParams, paymentSchedule, summary } = useCarLoanCalculator();
  
  // 处理表单提交
  const handleSubmit = (values: any) => {
    updateParams({
      loanAmount: values.loanAmount,
      loanTerm: values.loanTerm,
      annualRate: values.annualRate,
      paymentType: values.paymentType
    });
    setCurrentPage(1); // 重置到第一页
  };
  
  // 处理表格分页
  const handleTableChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // 导出表格数据为Excel文件
  const handleExport = () => {
    // 准备导出数据
    const exportData = paymentSchedule.map(payment => ({
      '期数': payment.period,
      '月供金额(元)': payment.totalPayment.toFixed(2),
      '本金(元)': payment.principalPayment.toFixed(2),
      '利息(元)': payment.interestPayment.toFixed(2),
      '剩余本金(元)': payment.remainingPrincipal.toFixed(2)
    }));
    
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    
    // 创建工作表
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // 设置列宽
    const colWidths = [
      { wch: 8 },  // 期数
      { wch: 15 }, // 月供金额
      { wch: 12 }, // 本金
      { wch: 12 }, // 利息
      { wch: 15 }  // 剩余本金
    ];
    ws['!cols'] = colWidths;
    
    // 添加工作表到工作簿
    XLSX.utils.book_append_sheet(wb, ws, '还款计划');
    
    // 导出为xlsx文件
    XLSX.writeFile(wb, `车贷还款计划_${new Date().toLocaleDateString()}.xlsx`);
    
    // 显示成功消息
    message.success('Excel导出成功');
  };
  
  // 表格列定义
  const columns: TableColumnType<any>[] = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      width: 80,
      align: 'center'
    },
    {
      title: '月供金额(元)',
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      align: 'right',
      render: (value: number) => value.toFixed(2)
    },
    {
      title: '本金(元)',
      dataIndex: 'principalPayment',
      key: 'principalPayment',
      align: 'right',
      render: (value: number) => value.toFixed(2)
    },
    {
      title: '利息(元)',
      dataIndex: 'interestPayment',
      key: 'interestPayment',
      align: 'right',
      render: (value: number) => value.toFixed(2)
    },
    {
      title: '剩余本金(元)',
      dataIndex: 'remainingPrincipal',
      key: 'remainingPrincipal',
      align: 'right',
      render: (value: number) => value.toFixed(2)
    }
  ];
  
  // 获取当前页的数据
  const currentPageData = paymentSchedule.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
   return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:pb-24 pb-24">
      {/* 标题 */}
       <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <i className="fa fa-calculator mr-2 text-blue-600 dark:text-blue-400"></i> 车贷计算器
          </h1>
         <p className="text-slate-500 dark:text-slate-400 mt-2">
           支持等额本金和等额本息两种还款方式，提供详细的还款计划和数据分析
         </p>
        
       </div>
      
      <div className="max-w-6xl mx-auto">
        {/* 计算表单 */}
        <Card className="mb-8 shadow-md rounded-xl overflow-hidden">
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              loanAmount: params.loanAmount,
              loanTerm: params.loanTerm,
              annualRate: params.annualRate,
              paymentType: params.paymentType
            }}
            onFinish={handleSubmit}
            className="p-4"
          >
             <Row gutter={16}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="贷款金额(元)"
                    name="loanAmount"
                    rules={[{ required: true, message: '请输入贷款金额' }]}
                  >
                    <InputNumber
                      min={10000}
                      max={2000000}
                      step={10000}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="贷款期限(月)"
                    name="loanTerm"
                    rules={[{ required: true, message: '请选择贷款期限' }]}
                  >
                    <Select style={{ width: '100%' }}>
                      {[12, 24, 36, 48, 60, 72, 84, 96].map(term => (
                        <Option key={term} value={term}>{term} 个月 ({term/12}年)</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="年利率(%)"
                    name="annualRate"
                    rules={[{ required: true, message: '请输入年利率' }]}
                  >
                    <InputNumber
                      min={0.1}
                      max={20}
                      step={0.1}
                      precision={2}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="还款方式"
                    name="paymentType"
                    rules={[{ required: true, message: '请选择还款方式' }]}
                  >
                    <Select style={{ width: '100%' }}>
                      <Option value="equal-principal-interest">等额本息</Option>
                      <Option value="equal-principal">等额本金</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="mt-6">
                <Col span={24} className="flex justify-center">
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    size="large"
                    className="w-full sm:w-64 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    开始计算
                  </Button>
                </Col>
              </Row>
              <Row>
              <Col span={24} className="flex justify-center mt-4">
                  <small>
                      单利息模式下，年利率 = 月利率 × 12
                      <br/>
                  复利模式下 年化利率 ≈ 月费率 × 12 × 1.85
                  </small>
              </Col>
              </Row>
          </Form>
        </Card>
        
        {/* 计算结果摘要 */}
        <Row gutter={16} className="mb-8">
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md rounded-xl">
              <Statistic 
                title="贷款总额" 
                value={params.loanAmount} 
                precision={2} 
                suffix="元"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md rounded-xl">
              <Statistic 
                title={params.paymentType === 'equal-principal-interest' ? '每月月供' : '首月月供'} 
                value={summary.monthlyPayment} 
                precision={2} 
                suffix="元"
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md rounded-xl">
              <Statistic 
                title="总利息" 
                value={summary.totalInterest} 
                precision={2} 
                suffix="元"
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md rounded-xl">
              <Statistic 
                title="还款总额" 
                value={summary.totalPayment} 
                precision={2} 
                suffix="元"
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>
        
        {/* 图表展示 */}
        <CarLoanChart 
          paymentSchedule={paymentSchedule}
          totalPrincipal={summary.totalPrincipal}
          totalInterest={summary.totalInterest}
        />
        
        <Divider className="my-8" />
        
        {/* 还款明细表格 */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
              还款明细
            </h3>
        <Button 
          type="primary" 
          icon={<i className="fa fa-download" />}
          onClick={handleExport}
          disabled={paymentSchedule.length === 0}
        >
          导出Excel
            </Button>
          </div>
          
          <Table
            columns={columns}
            dataSource={currentPageData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: paymentSchedule.length,
              onChange: handleTableChange,
              showSizeChanger: false,
              showTotal: (total) => `共 ${total} 期`
            }}
      rowKey="period"
      scroll={{ x: "max-content" }}
          />
     </div>

      <FriendLinks />

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg py-3 px-6 border-t border-slate-200 dark:border-slate-700 z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto flex justify-center">
           <Link
             to="/about"
             className="flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors duration-200 py-2 px-6 rounded-full text-blue-600 dark:text-blue-400"
           >
             <i className="fa fa-info-circle mr-2"></i>
             关于此应用
           </Link>
        </div>
      </div>
  </div>
  </div>
  );
}