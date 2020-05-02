// @ts-ignore
import moment from 'moment'
import FestivalArray from './festival/index'

export interface Festival {
  isLunarFestival: boolean;  // 是农历节日还是公历节日，true为公历节日
  isFestival: boolean; // 是否是节日
  festivalName: string; // 节日中文名称
  festivalEnName: string; // 节日英文名称
  isDoubleFestival?: boolean; // 是否双节同庆
  doubleFestivalName?: string; // 双节名称
  secondFestivalName?: string; // 第二个节日名称
  secondFestivalEnName?: string; // 第二个节日英文名称
}

/**
 * @公历转农历：calendar.solar2lunar(1987,11,01); // [you can ignore params of prefix 0]
 * 公历转农历，支出输入：一个参数时间戳，时间字符串（1989-07-14 或 1989/07/16）
 * 也可以输入三个参数：年份数字、月份数字、日期数字
 *
 * @农历转公历：calendar.lunar2solar(1987,09,10); // [you can ignore params of prefix 0]
 */

const calendar = {

  /**
   * 农历1900-2100的闰大小信息表
   * @Array Of Property
   * @return Hex
   */

  lunarInfo: [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520], //2100

  /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number
   */

  solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

  /**
   * 天干地支之天干速查表
   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string
   */
  // tianGan: ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],
  tianGan: ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678'],

  /**
   * 天干地支之地支速查表
   * @Array Of Property
   * @trans ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
   * @return Cn string
   */
  // diZhi: ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],
  diZhi: ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5'],

  /**
   * 天干地支之地支速查表<=>生肖
   * @Array Of Property
   * @trans ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
   * @return Cn string
   */
  // Animals: ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
  Animals: ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a'],

  /**
   * 24节气速查表
   * @Array Of Property
   * @trans ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   * @return Cn string
   */
  // solarTerm: ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
  solarTerm: ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3'],

  /**
   * 1900-2100各年的24节气日期速查表
   * @Array Of Property
   * @return 0x string For splice
   */

  sTermInfo: ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
    '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
    'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
    '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
    '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
    '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
    '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
    '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
    '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
    '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
    '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
    '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
    '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
    '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
    '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
    '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
    '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
    '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
    '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
    '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
    '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
    '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
    '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
    '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
    '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
    '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'],

  /**
   * 数字转中文速查表
   * @Array Of Property
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string
   */
  nStr1: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341'],

  /**
   * 日期转农历称呼速查表
   * @Array Of Property
   * @trans ['初','十','廿','卅']
   * @return Cn string
   */
  nStr2: ['\u521d', '\u5341', '\u5eff', '\u5345'],

  /**
   * 月份转农历称呼速查表
   * @Array Of Property
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string
   */
  nStr3: ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a'],

  /**
   * 天干地支与甲子纳音对照表
   * 中文字符串数组
   */

  GZNaYin: [
    '海中金', '炉中火', '大林木', '路旁土', '剑锋金', '山头火', '漳下水', '城头土', '白腊金', '杨柳木',
    '泉中水', '屋上土', '霹雳火', '松柏木', '长流水', '砂石金', '山下火', '平地木', '壁上土', '金箔金',
    '覆灯火', '天河水', '大驿土', '钗钏金', '桑柘木', '太溪水', '沙中土', '天上火', '石榴木', '大海水',
  ],

  /**
   * 天干地支与甲子纳音对照表
   * Unicode编码数组
   */

  GZNaYinUnicode: [
    '\u6d77\u4e2d\u91d1', '\u7089\u4e2d\u706b', '\u5927\u6797\u6728', '\u8def\u65c1\u571f',
    '\u5251\u950b\u91d1', '\u5c71\u5934\u706b', '\u6f33\u4e0b\u6c34', '\u57ce\u5934\u571f',
    '\u767d\u814a\u91d1', '\u6768\u67f3\u6728', '\u6cc9\u4e2d\u6c34', '\u5c4b\u4e0a\u571f',
    '\u9739\u96f3\u706b', '\u677e\u67cf\u6728', '\u957f\u6d41\u6c34', '\u7802\u77f3\u91d1',
    '\u5c71\u4e0b\u706b', '\u5e73\u5730\u6728', '\u58c1\u4e0a\u571f', '\u91d1\u7b94\u91d1',
    '\u8986\u706f\u706b', '\u5929\u6cb3\u6c34', '\u5927\u9a7f\u571f', '\u9497\u948f\u91d1',
    '\u6851\u67d8\u6728', '\u592a\u6eaa\u6c34', '\u6c99\u4e2d\u571f', '\u5929\u4e0a\u706b',
    '\u77f3\u69b4\u6728', '\u5927\u6d77\u6c34',
  ],

  /**
   * 数字与中文照表
   * Unicode编码数组
   */
  getYearCN(year: number) {
    const Year = year.toString().split('')
    const number2CN = [
      {name: '零', value: '\u96f6'}, {name: '一', value: '\u4e00'},
      {name: '二', value: '\u4e8c'}, {name: '三', value: '\u4e09'},
      {name: '四', value: '\u56db'}, {name: '五', value: '\u4e94'},
      {name: '六', value: '\u516d'}, {name: '七', value: '\u4e03'},
      {name: '八', value: '\u516b'}, {name: '九', value: '\u4e5d'}
    ]
    return Year.reduce((total, item: string) => {
      const index = Number.parseInt(item)
      total += number2CN[index].value
      return total
    }, '')
  },

  /**
   * 返回农历y年一整年的总天数
   * @return Number
   * @evar .lYearDays(1987) ;//count=387
   * @param y
   */
  lYearDays(y: number) {
    let i, sum = 348
    for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += (calendar.lunarInfo[y - 1900] & i) ? 1 : 0
    }
    return (sum + calendar.leapDays(y))
  },

  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @return Number (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   * @param y
   */
  leapMonth(y: number) { //闰字编码 \u95f0
    return (calendar.lunarInfo[y - 1900] & 0xf)
  },

  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   * @param y
   */
  leapDays(y: number) {
    if (calendar.leapMonth(y)) {
      return ((calendar.lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
    }
    return (0)
  },

  /**
   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
   * @return Number (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   * @param y
   * @param m
   */
  monthDays(y: number, m: number) {
    if (m > 12 || m < 1) { //月份参数从1至12，参数错误返回-1
      return -1
    }
    return ((calendar.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)
  },

  /**
   * 返回公历(!)y年m月的天数
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   * @param y
   * @param m
   */
  solarDays(y: number, m: number) {
    if (m > 12 || m < 1) { //若参数错误 返回-1
      return -1
    }
    const ms = m - 1
    if (ms === 1) { //2月份的闰平规律测算后确认返回28或29
      return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28)
    } else {
      return (calendar.solarMonth[ms])
    }
  },

  /**
   * 农历年份转换为干支纪年
   * @param  lYear 农历年的年份数
   * @return Cn string
   */
  totianGandiZhiYear(lYear: number) {
    let ganKey = (lYear - 3) % 10
    let zhiKey = (lYear - 3) % 12
    if (ganKey === 0) ganKey = 10 //如果余数为0则为最后一个天干
    if (zhiKey === 0) zhiKey = 12 //如果余数为0则为最后一个地支
    return calendar.tianGan[ganKey - 1] + calendar.diZhi[zhiKey - 1]
  },

  /**
   * 公历月、日判断所属星座
   * @param  cMonth [description]
   * @param  cDay [description]
   * @return Cn string
   */

  toAstro(cMonth: number, cDay: number) {
    const s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf'
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7'//座
  },

  /**
   * 公历月、日判断所属星座
   * @return Cn string
   * @param Astro
   */

  toAstroEn(Astro: string): string {
    const constellationArray = [
      {key: 'Capricornus', name: '摩羯座', value: '\u9b54\u7faf\u5ea7'},
      {key: 'Taurus', name: '金牛座', value: '\u91d1\u725b\u5ea7'},
      {key: 'Gemini', name: '双子座', value: '\u53cc\u5b50\u5ea7'},
      {key: 'Cancer', name: '巨蟹座', value: '\u5de8\u87f9\u5ea7'},
      {key: 'Leo', name: '狮子座', value: '\u72ee\u5b50\u5ea7'},
      {key: 'Virgo', name: '处女座', value: '\u5904\u5973\u5ea7'},
      {key: 'Libra', name: '天秤座', value: '\u5929\u79e4\u5ea7'},
      {key: 'Scorpio', name: '天蝎座', value: '\u5929\u874e\u5ea7'},
      {key: 'Sagittarius', name: '射手座', value: '\u5c04\u624b\u5ea7'},
      {key: 'Aquarius', name: '水瓶座', value: '\u6c34\u74f6\u5ea7'},
      {key: 'Pisces', name: '双鱼座', value: '\u53cc\u9c7c\u5ea7'},
      {key: 'Aries', name: '白羊座', value: '\u767d\u7f8a\u5ea7'},
    ]
    const obj = constellationArray.find(item => item.value === Astro)
    return obj ? obj.key : ''
  },

  /**
   * 根据公历月份、公历日期、农历月份、农历日期、节气判断是否为节日，并范围节日对象
   * @return Cn string
   * @param solarMonth number
   * @param solarDay number
   * @param lunarMonth number
   * @param lunarDay number
   * @param isTerm boolean
   * @param term string
   * @param lunarYear
   */
  getFestival(solarMonth: number, solarDay: number, lunarMonth: number,
              lunarDay: number, isTerm: boolean, term: string | undefined, lunarYear: number): Festival {
    const obj = FestivalArray.filter((item: any) => {
      const flag1 = solarMonth === item.solarMonth && solarDay === item.solarDay // 阳历节日
      const flag2 = lunarMonth === item.lunarMonth && lunarDay === item.lunarDay && !item.newYearEve // 农历节日
      const flag3 = isTerm === item.isTerm && term === item.term // 节气节日
      const flag4 = lunarMonth === 12 && lunarMonth === item.lunarMonth && lunarDay === item.lunarDay && lunarDay === calendar.monthDays(lunarYear, lunarMonth) && !!item.newYearEve
      return flag1 || flag2 || flag3 || flag4
    })

    // 如果找到了对应的节日
    if (obj.length > 0) {
      const {isLunar = false, festivalEnName = '', festivalName = ''} = obj[0]
      if (obj.length === 1) {
        return {isLunarFestival: isLunar, festivalEnName, festivalName, isFestival: true}
      } else { // 如果有两个节日重合，则添加双节同庆
        const sec = obj[1]
        const isDoubleFestival = true
        const doubleFestivalName = `${festivalName}${sec.festivalName}同庆`
        const secondFestivalName = sec.festivalName
        const secondFestivalEnName = sec.festivalEnName
        return {
          isDoubleFestival, doubleFestivalName, secondFestivalName, secondFestivalEnName,
          isLunarFestival: isLunar, festivalEnName, festivalName, isFestival: true
        }
      }
    } else {
      return {isLunarFestival: false, festivalEnName: '', festivalName: '', isFestival: false}
    }
  },

  /**
   * 传入offset偏移量返回干支
   * @param offset 相对甲子的偏移量
   * @return Cn string
   */

  totianGandiZhi(offset: number) {
    return calendar.tianGan[offset % 10] + calendar.diZhi[offset % 12]
  },

  /**
   * 传入公历(!)y年获得该年第n个节气的公历日期
   * @return day Number
   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   * @param y
   * @param n
   */

  getTerm(y: number, n: number) {
    if (y < 1900 || y > 2100) {
      return -1
    }
    if (n < 1 || n > 24) {
      return -1
    }
    const table = calendar.sTermInfo[y - 1900]
    const _info = [
      parseInt('0x' + table.substr(0, 5)).toString(),
      parseInt('0x' + table.substr(5, 5)).toString(),
      parseInt('0x' + table.substr(10, 5)).toString(),
      parseInt('0x' + table.substr(15, 5)).toString(),
      parseInt('0x' + table.substr(20, 5)).toString(),
      parseInt('0x' + table.substr(25, 5)).toString()
    ]

    const array: string[] = []
    _info.forEach((item) => {
      array.push(item.substr(0, 1))
      array.push(item.substr(1, 2))
      array.push(item.substr(3, 1))
      array.push(item.substr(4, 2))
    })
    return parseInt(array[n - 1])
  },

  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @return Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
   * @param m
   */

  toChinaMonth(m: number) { // 月 => \u6708
    if (m > 12 || m < 1) {
      return -1
    } //若参数错误 返回-1
    let s = calendar.nStr3[m - 1]
    s += '\u6708'//加上月字
    return s
  },

  /**
   * 传入农历日期数字返回汉字表示法
   * @return Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   * @param d
   */

  toChinaDay(d: number) { //日 => \u65e5
    let s
    switch (d) {
      case 10:
        s = '\u521d\u5341'
        break
      case 20:
        s = '\u4e8c\u5341'
        break
      case 30:
        s = '\u4e09\u5341'
        break
      default :
        s = calendar.nStr2[Math.floor(d / 10)]
        s += calendar.nStr1[d % 10]
    }
    return (s)
  },

  /**
   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
   * @param y year
   * @return Cn string
   * @eg:var animal = calendar.getAnimal(1987) ; //animal='兔'
   */

  getAnimal(y: number) {
    return calendar.Animals[(y - 4) % 12]
  },

  /**
   * 传入阳历年获取是否闰年
   * @return boolean
   * @eg:console.log(calendar.isLeapYear(1989));
   * @param solarYear number
   */

  isLeapYear(solarYear: number): boolean | string {
    if (solarYear < 1901 || solarYear > 2099) {
      return '请传入1901~2099年之间的年数'
    }
    return (solarYear % 4 === 0 && solarYear % 100 !== 0) || solarYear % 400 === 0
  },

  /**
   * 传入阳历年,月份，返回当月的阳历月天数
   * @return number
   * @eg:console.log(calendar.countSolarMonthDays(1989, 7));
   * @param solarYear number
   * @param solarMonth number
   *
   */

  countSolarMonthDays(solarYear: number, solarMonth: number): number | string {
    const isLeapYear = calendar.isLeapYear(solarYear) === true
    const big = [1, 3, 5, 7, 8, 10, 12]
    const small = [4, 6, 9, 11]
    if (solarMonth === 2) {
      return isLeapYear ? 29 : 28
    }
    if (big.includes(solarMonth)) {
      return 31
    }
    if (small.includes(solarMonth)) {
      return 30
    }
    const error = '请输入正确的月数'
    console.error(error)
    return error
  },

  /**
   * 传入阳历年份，获取该年的所有节日，节日列表同 FestivalArray 中所列举
   * @return []
   *
   * @param solarYear: string | number
   */

  getAllFestival(solarYear: number | string) {
    let y: number
    const festivalArr = []
    if (typeof solarYear === 'number') {
      y = Number(solarYear)
    } else {
      const s = Number.parseInt(solarYear)
      if (Number.isNaN(s)) {
        const error = '请输入正确的年份格式'
        console.error(error)
        return error
      }
      y = s
    }

    if (y < 1901 || y > 2099) {
      const error = '请检查输入参数的合法性，目前仅支持1901.1.1-2099.12.31之间的查询,传入的时间超出查询范围！'
      console.error(error)
      return error
    }

    const len = calendar.isLeapYear(y) ? 366 : 365
    let Year = moment(`${solarYear.toString()}-01-01`)
    for (let i = 0; i < len; i++) {
      const obj = calendar.solar2lunar(Year)
      if (typeof obj === 'object') {
        const {solarMonth, solarDay, lunarMonth, lunarDay, isTerm, Term, fullLunarMonthString} = obj
        const festival = calendar.getFestival(solarMonth, solarDay, lunarMonth, lunarDay, isTerm, Term, y - 1)
        const {
          isFestival = false, isLunarFestival = false,
          festivalEnName = '', festivalName = '', doubleFestivalName,
          isDoubleFestival = false, secondFestivalEnName, secondFestivalName
        } = festival
        const fullSolarMonthString = `${solarMonth}月${solarDay}日`
        if (isFestival) {
          if (isDoubleFestival) {
            festivalArr.push({
              doubleFestivalName, isDoubleFestival, secondFestivalEnName, secondFestivalName,
              fullLunarMonthString, isFestival, isLunarFestival, festivalEnName, fullSolarMonthString,
              festivalName, solarMonth, solarDay, lunarMonth, lunarDay, isTerm, Term,
            })
          } else {
            festivalArr.push({
              fullLunarMonthString, isFestival, isLunarFestival, festivalEnName, fullSolarMonthString,
              festivalName, solarMonth, solarDay, lunarMonth, lunarDay, isTerm, Term,
            })
          }
        }
      }
      Year = moment(Year).add(1, 'd')
    }
    return festivalArr
  },

  /**
   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
   * @return JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   * @param Year
   * @param Month
   * @param Day
   */

  solar2lunar(Year?: number | string, Month?: number | string, Day?: number | string) { // 参数区间1900.1.1~2099.12.31

    let yy: number, mm: number, dd: number
    const args = Array.from(arguments)
    if (args.length === 0) {
      const ds = new Date()
      yy = ds.getFullYear()
      mm = ds.getMonth() + 1
      dd = ds.getDate()
    } else if (args.length < 3) {
      const ds = moment(Year)
      yy = ds.get('year')
      mm = ds.get('month') + 1
      dd = ds.get('date')
    } else {
      const ty = typeof Year
      const tm = typeof Month
      const td = typeof Day
      yy = ty === 'number' ? Number(Year) : (typeof Year === 'string' ? Number.parseInt(Year) : 0)
      mm = tm === 'number' ? Number(Month) : (typeof Month === 'string' ? Number.parseInt(Month) : 0)
      dd = td === 'number' ? Number(Day) : (typeof Day === 'string' ? Number.parseInt(Day) : 0)
    }

    let objDate: any
    //年份限定、上限
    if (yy < 1901 || yy > 2099) {
      const error = '请检查输入参数的合法性，目前仅支持1901.1.1-2099.12.31之间的查询,传入的时间超出查询范围！'
      console.error(error)
      return error
    }

    //月份限定、上限
    if (mm < 1 || mm > 12) {
      const error = '请检查输入参数的合法性，月份只能在1~12之间！'
      console.error(error)
      return error
    }

    //月份限定、上限
    if (dd < 1 || dd > 31) {
      const error = '日期只能在1~31之间！'
      console.error(error)
      return error
    }

    //未传参  获得当天
    if (!yy) {
      objDate = new Date()
    } else {
      objDate = new Date(yy, mm - 1, dd)
    }
    let i: number, leap = 0, temp = 0
    //修正ymd参数
    const solarYear = objDate.getFullYear(),
      solarMonth = objDate.getMonth() + 1,
      solarDay = objDate.getDate()
    let offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = calendar.lYearDays(i)
      offset -= temp
    }
    if (offset < 0) {
      offset += temp
      i--
    }

    //是否今天
    let isTodayObj = new Date(),
      isToday = false
    if (isTodayObj.getFullYear() === solarYear && isTodayObj.getMonth() + 1 === solarMonth && isTodayObj.getDate() === solarDay) {
      isToday = true
    }

    //星期几
    let nWeek = objDate.getDay(),
      cWeek = calendar.nStr1[nWeek]
    //数字表示周几顺应天朝周一开始的惯例
    if (nWeek === 0) {
      nWeek = 7
    }

    //农历年
    const lunarYear = i
    leap = calendar.leapMonth(i) //闰哪个月
    let isLeap = false // 是否闰月

    //效验闰月
    for (i = 1; i < 13 && offset > 0; i++) {
      //闰月
      if (leap > 0 && i === (leap + 1) && !isLeap) {
        --i
        isLeap = true
        temp = calendar.leapDays(lunarYear) //计算农历闰月天数
      } else {
        temp = calendar.monthDays(lunarYear, i)//计算农历普通月天数
      }
      //解除闰月
      if (isLeap && i === (leap + 1)) {
        isLeap = false
      }
      offset -= temp
    }
    // 闰月导致数组下标重叠取反
    if (offset === 0 && leap > 0 && i === leap + 1) {
      if (isLeap) {
        isLeap = false
      } else {
        isLeap = true
        --i
      }
    }
    if (offset < 0) {
      offset += temp
      --i
    }
    //农历月
    const lunarMonth = i
    //农历日
    const lunarDay = offset + 1
    //天干地支处理
    const sm = solarMonth - 1
    const gzY = calendar.totianGandiZhiYear(lunarYear)

    // 当月的两个节气
    const firstNode = calendar.getTerm(solarYear, (solarMonth * 2 - 1))//返回当月「节」为几日开始
    const secondNode = calendar.getTerm(solarYear, (solarMonth * 2))//返回当月「节」为几日开始

    // 依据12节气修正干支月
    let gzM = calendar.totianGandiZhi((solarYear - 1900) * 12 + solarMonth + 11)
    if (solarDay >= firstNode) {
      gzM = calendar.totianGandiZhi((solarYear - 1900) * 12 + solarMonth + 12)
    }

    // 传入的日期的节气与否
    let isTerm = false
    let Term = ''
    if (firstNode === solarDay) {
      isTerm = true
      Term = calendar.solarTerm[solarMonth * 2 - 2]
    }
    if (secondNode === solarDay) {
      isTerm = true
      Term = calendar.solarTerm[solarMonth * 2 - 1]
    }
    //日柱 当月一日与 1900/1/1 相差天数
    const dayCyclical = Date.UTC(solarYear, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10
    const gzD = calendar.totianGandiZhi(dayCyclical + solarDay - 1)

    //该日期所属的星座
    const constellation = calendar.toAstro(solarMonth, solarDay)

    const astroEn = calendar.toAstroEn(constellation)

    // 该年是否为闰年
    const isLeapYear = calendar.isLeapYear(solarYear)

    // 获取该阴历月的天数，如果是闰月则返回该年闰月的天数，如果不是则返回该阴历月天使，（取值29或30）
    const lunarMonthDays = isLeap ? calendar.leapDays(lunarYear) : calendar.monthDays(lunarYear, lunarMonth)

    // 该月的阳历月天数
    const solarMonthDays = calendar.countSolarMonthDays(solarYear, solarMonth)

    // 获取该年的干支纳音
    const index = Math.floor((lunarYear - 1864) % 60 / 2)
    const GzNy = `${calendar.GZNaYinUnicode[index]}`

    // 加入节假日的判断,节日的对象数据类型参见interface  Festival 中的介绍
    const festival = calendar.getFestival(solarMonth, solarDay, lunarMonth, lunarDay, isTerm, Term, lunarYear)

    // 阴历月份的中文
    const IMonthCn = (isLeap ? '\u95f0' : '') + calendar.toChinaMonth(lunarMonth)

    // 阴历日期的中文
    const IDayCn = calendar.toChinaDay(lunarDay)

    // 阴历年份中文
    const lunarYearCN = calendar.getYearCN(lunarYear)

    // 阳历年份中文
    const solarYearCN = calendar.getYearCN(solarYear)

    const obj = {
      lunarYear: lunarYear,  // 阴历年份数字
      lunarYearCN: lunarYearCN, // 阴历年份的汉字（举例：一九八九）
      lunarMonth: lunarMonth, // 阴历月份数字
      lunarDay: lunarDay, // 阴历天数字
      lunarMonthDays: lunarMonthDays, // 该阴历月的天数（取阴历天数）
      fullLunarMonthString: `${IMonthCn}${IDayCn}`, // 阴历月份 + 阴历日期 （举例：正月初一）
      zodiac: calendar.getAnimal(lunarYear), // 生肖
      IMonthCn: IMonthCn, // 阴历月份汉字，含闰月
      IDayCn: IDayCn, // 阴历天汉字
      solarYear: solarYear, // 阳历年数字
      solarYearCN: solarYearCN, // 阳历年份的汉字（举例：一九八九）
      solarMonth: solarMonth, // 阳历月数字
      solarDay: solarDay, // 阳历天数字
      solarMonthDays: solarMonthDays, // 该阳历月份的天数
      gzYear: gzY, // 干支年（举例2020 庚子年）
      gzMonth: gzM, // 干支月 (举例2020年5月 辛巳月)
      gzDay: gzD,  // 干支日 （举例2020年5月1日 癸酉日）
      isToday: isToday,  // 是否今天
      isLeapMonth: isLeap, // 该月是否闰月
      isLeapYear: isLeapYear, // 阳历年是否闰年
      nWeek: nWeek, // 星期数字
      ncWeek: '\u661f\u671f' + cWeek, // 星期汉字（举例：星期六）
      isTerm: isTerm, // 是否节气
      Term: Term,  // 节气名词
      constellation: constellation, // 星座汉字
      GzNy: GzNy, // 该阴历年的干支纳音
      astroEn: astroEn, // 星座的英文
      isFestival: false, // 是否是节日
      festivalName: '', // 节日中文
      festivalEnName: '', // 节日英文
    }

    const final = Object.assign(obj, festival)
    return obj
  },

  /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * @param year number
   * @param month number
   * @param date number
   * @param isLeapM boolean
   * @return JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
  lunar2solar(year: number, month: number, date: number, isLeapM: boolean) {

    //参数区间1901正月初一 ~ 2099年冬月二十
    const isLeapMonth = isLeapM // 是否闰月
    const leapMonth = calendar.leapMonth(year)

    if (year < 1901 || year > 2099) {
      const error = '目前只能支持到1901-2099年之间的数据查询'
      console.error(error)
      return error
    }

    if ((year === 2099 && month > 11) || (year === 2099 && month === 11 && date > 20)) {
      const error = '目前只能支持到农历1901年正月初一至2099年冬月二十(2099.12.31)的精确查询'
      console.error(error)
      return error
    }

    if (isLeapMonth && (leapMonth !== month)) {
      const error = '传参要求计算该闰月公历,该年得出的闰月与传参的月份并不同'
      console.error(error)
      return error
    } // 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    const day = calendar.monthDays(year, month)
    let _day = day

    //if month is leap, _day use leapDays method
    if (isLeapMonth) {
      _day = calendar.leapDays(year)
    }

    if (date > _day) {
      const error = `传参要求计算阴历月份的天数，该阴历月份并没有阴历${calendar.toChinaDay(date)}`
      console.error(error)
      return error
    } //参数合法性效验

    //计算农历的时间差
    let offset = 0
    for (let i = 1900; i < year; i++) {
      offset += calendar.lYearDays(i)
    }
    let leap = 0, isAdd = false
    for (let i = 1; i < month; i++) {
      leap = calendar.leapMonth(year)
      if (!isAdd) {//处理闰月
        if (leap <= i && leap > 0) {
          offset += calendar.leapDays(year)
          isAdd = true
        }
      }
      offset += calendar.monthDays(year, i)
    }

    //转换闰月农历 需补充该年闰月的前一个月的时差
    if (isLeapMonth) {
      offset += day
    }

    //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
    const map = Date.UTC(1900, 1, 30, 0, 0, 0)
    const calObj = new Date((offset + date - 31) * 86400000 + map)
    const cY = calObj.getUTCFullYear()
    const cM = calObj.getUTCMonth() + 1
    const cD = calObj.getUTCDate()

    return calendar.solar2lunar(cY, cM, cD)
  }
}
export default calendar

