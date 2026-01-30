import { Card, Typography, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import FriendLinks from '../components/FriendLinks';

const { Title, Paragraph } = Typography;

export default function About() {
  const features = [
    {
      title: '精确计算',
      icon: <i className="fa fa-calculator text-blue-500" />,
      description: '支持等额本金和等额本息两种计算方式，提供精确的还款计划'
    },
    {
      title: '数据可视化',
      icon: <i className="fa fa-line-chart text-green-500" />,
      description: '通过直观的图表展示还款趋势和贷款构成比例'
    },
    {
      title: 'Excel导出',
      icon: <i className="fa fa-file-excel text-yellow-500" />,
      description: '支持将详细的还款计划表导出为Excel文件，便于存档和分析'
    }
  ];

  // 车贷相关说明内容
  const carLoanExplanations = [
      {
          title: '最新车贷利率政策',
          icon: <i className="fa fa-bank text-indigo-500" />,
          description: '当前车贷市场利率普遍在3.5%-8%之间，不同银行和金融机构根据借款人信用状况、首付比例等因素制定差异化利率。央行LPR调整对车贷利率也有直接影响，建议关注每月20日公布的LPR数据。'
      },
      {
          title: '影响车贷利率的因素',
          icon: <i className="fa fa-pie-chart text-teal-500" />,
          description: '车贷利率受多种因素影响：个人征信记录、首付比例、贷款期限、车辆品牌及价格、银行政策等。一般而言，征信良好、首付比例高、贷款期限短的客户可以获得更低的利率优惠。'
      },
      {
          title: '车贷利息计算公式',
          icon: <i className="fa fa-calculator text-orange-500" />,
          description: '月还款额 = [贷款本金 × 月利率 × (1+月利率)^还款月数] ÷ [(1+月利率)^还款月数 - 1]。其中月利率 = 年利率 ÷ 12。本计算器采用此标准公式，确保计算结果的准确性。'
      },
    {
      title: '什么是等额本息？',
      icon: <i className="fa fa-car text-blue-500" />,
      description: '等额本息是指每月还款金额固定，但每月还款中本金和利息的比例会逐渐变化。初期还款中利息占比较大，随着还款期数增加，利息占比逐渐减少，本金占比逐渐增加。这种还款方式适合收入稳定的借款人。'
    },
    {
      title: '什么是等额本金？',
      icon: <i className="fa fa-dollar-sign text-green-500" />,
      description: '等额本金是指每月还款中本金部分固定，利息部分逐月递减，因此总还款额逐月递减。这种还款方式初期还款压力较大，但总利息支出较等额本息少，适合前期收入较高、能承受较大还款压力的借款人。'
    },
    {
      title: '如何选择合适的贷款期限？',
      icon: <i className="fa fa-calendar-alt text-purple-500" />,
      description: '贷款期限的选择应根据个人收入情况和财务规划来决定。期限较短的贷款总利息支出较少，但每月还款压力较大；期限较长的贷款每月还款压力较小，但总利息支出较多。一般建议贷款期限不超过家庭收入的合理比例。'
    },
    {
      title: '如何理解贷款利率？',
      icon: <i className="fa fa-percent text-red-500" />,
      description: '贷款利率是银行或金融机构向借款人收取的利息费用与贷款本金的比率。车贷利率通常以年利率表示，会影响整个贷款期间的利息支出。利率越高，总利息支出越多。借款人应关注市场利率变化，选择合适的时机申请贷款。'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <i className="fa fa-arrow-left mr-2"></i> 返回首页
        </Link>
      </div>

      {/* 标题区域 */}
      <div className="mb-8 text-center">
        <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
          <i className="fa fa-info-circle text-4xl text-blue-600 dark:text-blue-400"></i>
        </div>
        <Title level={1} className="text-3xl font-bold text-slate-800 dark:text-white">
          关于车贷计算器
        </Title>
        <Paragraph className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          一个专业、易用的车贷计算工具，帮助您轻松规划贷款还款计划
        </Paragraph>
      </div>

      {/* 主要内容 */}
      <div className="max-w-4xl mx-auto">
        {/* 项目介绍 */}
        <Card className="mb-8 shadow-md rounded-xl overflow-hidden">
          <Title level={2} className="flex items-center text-xl font-semibold text-slate-800 dark:text-white">
            <i className="fa fa-history mr-2 text-blue-500"></i> 项目介绍
          </Title>
          <Paragraph className="text-slate-600 dark:text-slate-300">
            车贷计算器是一款专为有购车贷款需求的用户设计的工具，通过输入贷款金额、期限和利率等参数，
            快速计算出详细的还款计划，包括每月还款额、本金、利息等信息，并以图表形式直观展示。
          </Paragraph>
          <Paragraph className="text-slate-600 dark:text-slate-300">
            无论是等额本金还是等额本息还款方式，都能为您提供精确的计算结果，帮助您更好地规划个人财务。
          </Paragraph>
        </Card>

        {/* 车贷知识 */}
        <Card className="mb-8 shadow-md rounded-xl overflow-hidden">
          <Title level={2} className="flex items-center text-xl font-semibold text-slate-800 dark:text-white">
            <i className="fa fa-car mr-2 text-blue-500"></i> 车贷知识
          </Title>
          <Row gutter={[16, 24]}>
            {carLoanExplanations.map((item, index) => (
              <Col xs={24} key={index}>
                <Card className="h-full bg-white dark:bg-slate-800 border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <div className="mr-4 text-xl">
                      {item.icon}
                    </div>
                    <div>
                      <Title level={4} className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                        {item.title}
                      </Title>
                      <Paragraph className="text-slate-600 dark:text-slate-300 mb-0">
                        {item.description}
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 功能特性 */}
        <Card className="mb-8 shadow-md rounded-xl overflow-hidden">
          <Title level={2} className="flex items-center text-xl font-semibold text-slate-800 dark:text-white">
            <i className="fa fa-check-circle mr-2 text-green-500"></i> 功能特性
          </Title>
          <Row gutter={[16, 16]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} key={index}>
                <Card className="h-full">
                  <div className="flex items-start">
                    <div className="mr-4 text-xl">
                      {feature.icon}
                    </div>
                    <div>
                      <Title level={4} className="text-lg font-medium text-slate-800 dark:text-white mb-2">
                        {feature.title}
                      </Title>
                      <Paragraph className="text-slate-600 dark:text-slate-300 mb-0">
                        {feature.description}
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>



        <FriendLinks />

        {/* 页脚信息 */}
        <div className="text-center text-slate-500 dark:text-slate-400 p-4">
          <p className="flex items-center justify-center">
            <i className="fa fa-heart text-red-500 mr-2"></i>
            感谢您使用车贷计算器
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} 版权所有
          </p>
          <div>
              <small>
                  本计算器计算结果仅供参考，实际贷款情况以银行计算结果为准。
              </small>
          </div>
        </div>
      </div>
    </div>
  );
}