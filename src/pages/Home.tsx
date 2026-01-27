import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
          金融计算器工具
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
              车贷计算器
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              支持等额本金和等额本息计算，提供详细还款计划和图表分析。
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium"
            >
              开始使用
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-xl cursor-not-allowed"
          >
            <h2 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-300">
              更多计算器
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              房贷计算器、投资回报率计算器等功能即将上线。
            </p>
            <span className="inline-flex items-center text-slate-500 dark:text-slate-400">
              敬请期待
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}