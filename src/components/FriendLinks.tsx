const friendLinks = [
  {
    name: '房贷计算器',
    url: 'https://xiaoqufengdi.top',
    icon: 'fa-home',
    colorClass: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400',
  },
  {
    name: '个税计算器',
    url: 'https://tax.xiaoqufengdi.top',
    icon: 'fa-book',
    colorClass: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-800/30 text-green-600 dark:text-green-400',
  },
  {
    name: '中国人民银行-货币政策司',
    url: 'https://www.pbc.gov.cn/zhengcehuobisi/125207/125213/125440/3876551/index.html',
    icon: 'fa-bank',
    // colorClass: 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300',
    colorClass: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-800/30 text-blue-600 dark:text-blue-400',
  },
];

export default function FriendLinks() {
  return (
    <div className="mt-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
        <i className="fa fa-link mr-2 text-blue-500"></i> 友情链接
      </h3>
      <div className="flex flex-wrap gap-3">
        {friendLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 rounded-full transition-colors duration-200 text-sm ${link.colorClass}`}
          >
            <i className={`fa ${link.icon} mr-2`}></i> {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
