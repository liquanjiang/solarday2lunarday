import calendar from './dist/index.js'

export default {
  lunar2solar: calendar.lunar2solar, // 将阴历天转为全格式日期对象
  solar2lunar: calendar.solar2lunar, // 获取阳历天的全格式日期对象
  isLeapYear: calendar.isLeapYear, // 获取一年是否为闰年
  getYearCN: calendar.getYearCN,  // 获取某年的汉字字符串，举例 1989 => 一九八九
  lunarYearDays: calendar.lYearDays, // 获取返回农历某年一整年的总天数
  getConstellation: calendar.toAstro, // 输入阳历月和阳历日，返回星座
  getAllFestival: calendar.getAllFestival, // 输入阳历年份，获取所有节日，节日列表见festival中
}
