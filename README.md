# solar2lunar

# 使用可以将'YYYY-MM-DD'格式的字符串、时间戳，或者（year,month,day）

# 日期为参数，返回该日期的相关日期属性对象

# 举例：

# solar2lunar('2025-05-01')

# 使用方法

# import calendar from 'solarday2lunarday'

# 可调用方法

# 1、calendar.solar2lunar,

# 参数类型：

# (1) 一个参数 ：YYYY-MM-DD 格式的日期字符串

# (2) 一个参数： YYYY/MM/DD 格式的日期字符串

# (3) 一个参数：时间戳

# (4) 三个参数： YYYY 格式年份,  MM 格式月份, DD 格式日期 字符串或数字皆可

# 返回值类型

# {
#	"lunarYear": 2025,  // 表示阴历年份
#	"lunarYearCN": "二零二五",  // 表示阴历年份的汉字
#	"lunarMonth": 4,  // 表示阴历月份数字
#	"lunarMonthDays": 29,  // 表示阴历当月有多少天
#	"fullLunarMonthString": "四月初四", // 阴历当天的全程
#	"zodiac": "蛇",  // 表示生肖年
#	"IMonthCn": "四月", // 阴历月份的汉字
#	"IDayCn": "初四",  // 表示阴历天的汉字
#	"solarYear": 2025, // 表示阳历年份数字
#	"solarYearCN": "二零二五",  // 表示阳历年份汉字
#	"solarMonth": 5,  // 表示阳历月份
#	"solarDay": 1,  // 表示阳历日期
#	"solarMonthDays": 31, // 表示阳历当月有多少天
#	"gzYear": "乙巳", // 当年的干支年
#	"gzMonth": "辛巳", // 当月的干支月
#	"gzDay": "庚午",  // 当天的干支日
#	"isToday": false,  // 是否今天
#	"isLeapMonth": false, // 是否闰月
#	"isLeapYear": false,  // 是否闰年
#	"ncWeek": "星期四", // 表示星期的汉字
#	"isTerm": true,  // 是否节气
#	"Term": "立夏",  // 
#	"constellation": "金牛座",
#	"GzNy": "覆灯火",
#	"astroEn": "Taurus",
#	"isFestival": true,
#	"festivalName": "劳动节",
#	"festivalEnName": "International Labour Day",
#	"isLunarFestival": false
# }

# 可调用方法

# 2、calendar.lunar2solar,

# 参数类型

# (1) YYYY 格式年份数字  MM格式月份数字  DD格式日期数字  boolean格式是否闰月

# 返回值类型同上


# 可调用方法

# 3、calendar.isLeapYear

# 参数类型

# (1) YYYY 格式年份数字

# 返回值 boolean 型， 表示该年份是否为闰年

# 可调用方法

# 4.calendar.getYearCN

# 参数类型

# (1) YYYY 格式年份数字

# 返回值 汉字字符串 ，表示该年份的汉字 举例 1989 => 一九八九

# 可调用方法

# 4.calendar.lunarYearDays

# 获取返回农历某年一整年的总天数

# 参数类型

# (1) YYYY 格式年份数字，指农历年

# 返回值 354， 355， 383， 384

# 可调用方法

# 5.calendar.getConstellation

# 根据输入的阳历月和阳历日获取星座

# (1)参数类型 MM格式月份 DD格式日期

# 返回值类型：十二星座其中之一

# 6.calendar.getAllFestival

# 跟如输入的阳历年份，返回该年所有的节日

# (1)参数类型 YYYY格式阳历年

# 返回值类型，节日数组

# 新增双节同庆的配置

