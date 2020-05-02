interface Festival {
  isLunar: boolean; // 是农历节日还是公历节日
  solarMonth: number | null;  // 公历月，如果是农历节日，则为null
  solarDay: number | null;  // 公历日，如果是农历节日，则为null
  lunarMonth: number | null;  // 农历月，如果是公历节日，则为null
  lunarDay: number | null;  // 农历日，如果是公历节日，则为null
  festivalName: string; // 节日名称，中文
  festivalEnName: string; // 节日名称, 英文
  isTerm?: boolean; // 是否节气
  term?: string; // 节气名词
  newYearEve?: boolean; // 是否除夕
  monthDays?: number; // 当年腊月的农历天数
}

const FestivalArray: Festival[] = [

  /** 农历节日
   *
   * 1.春节，正月初一
   * 2.元宵节，正月十五
   * 3.二月二/龙抬头/社日节，二月初二
   * 4.清明节，清明节气
   * 5.端午节，五月初五
   * 6.七夕节，七月初七
   * 7.中元节/盂兰盆节，七月十五
   * 8.中秋节，八月十五
   * 9.重阳节，九月初九
   * 10.冬至节，冬至节气
   * 11.除夕节，春节的前一天，腊月二十九或腊月三十
   *
   */

  // 春节，农历正月初一
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 1,
    lunarDay: 1,
    festivalName: '春节',
    festivalEnName: 'Spring Festival'
  },

  // 元宵节，农历正月十五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 1,
    lunarDay: 15,
    festivalName: '春节',
    festivalEnName: 'Spring Festival'
  },

  // 二月二，也叫社日节，龙抬头，农历正月十五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 2,
    lunarDay: 2,
    festivalName: '二月二/龙抬头/社日节',
    festivalEnName: 'Longtaitou Festival'
  },

  // 清明节，清明节节气
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '清明节',
    festivalEnName: 'Qingming Festival',
    isTerm: true,
    term: '清明'
  },

  // 端午节，农历五月初五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 5,
    lunarDay: 5,
    festivalName: '端午节',
    festivalEnName: 'Dragon Boat Festival',
  },

  // 七夕节，农历七月初七
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 7,
    lunarDay: 7,
    festivalName: '七夕节',
    festivalEnName: 'Chinese Valentine\'s Day',
  },

  // 中元节，农历七月十五，在我国古代和日本也叫做盂兰盆节
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 7,
    lunarDay: 15,
    festivalName: '中元节/盂兰盆节',
    festivalEnName: 'Zhongyuan Festival',
  },

  // 中秋节，农历八月十五
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 8,
    lunarDay: 15,
    festivalName: '中秋节',
    festivalEnName: 'Mid-Autumn Festival',
  },

  // 重阳节，农历九月初九
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 9,
    lunarDay: 9,
    festivalName: '重阳节',
    festivalEnName: 'Double Ninth Festival',
  },

  // 冬至节，冬至节气
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '冬至节',
    festivalEnName: 'Winter solstice',
    isTerm: true,
    term: '冬至'
  },

  // 除夕，春节的前一天，农历腊月二十九, 且当年腊月月为29天
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 12,
    lunarDay: 29,
    festivalName: '除夕',
    festivalEnName: 'New year\'s Eve',
    newYearEve: true,
    monthDays: 29, // 表示农历当月是29天
  },

  // 除夕，春节的前一天，农历腊月三十，当年腊月为30天
  {
    isLunar: true,
    solarMonth: null,
    solarDay: null,
    lunarMonth: 12,
    lunarDay: 30,
    festivalName: '除夕',
    festivalEnName: 'New year\'s Eve',
    newYearEve: true,
    monthDays: 30, // 表示农历当月是30天
  },

  /** 公历节日
   *
   * 1.元旦，1月1日
   * 2.情人节，2月14日
   * 3.妇女节，3月8日
   * 4.植树节，3月12日
   * 5.愚人节，4月1日
   * 6.劳动节，5月1日
   * 7.青年节，5月4日
   * 8.儿童节，6月1日
   * 9.建党节，7月1日
   * 10.建军节，8月1日
   * 11.国庆节，10月1日
   * 12.光棍节，11月11日
   * 13.平安夜，12月24日
   * 14.圣诞节，12月25日
   *
   */

  // 元旦节，公历1月1日
  {
    isLunar: false,
    solarMonth: 1,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '元旦',
    festivalEnName: 'New year’s Day'
  },

  // 情人节，公历2月14日
  {
    isLunar: false,
    solarMonth: 2,
    solarDay: 14,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '情人节',
    festivalEnName: 'Valentine \'s Day'
  },

  // 妇女节，公历3月8日
  {
    isLunar: false,
    solarMonth: 3,
    solarDay: 8,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '妇女节',
    festivalEnName: 'Women\'s Day'
  },

  // 植树节，公历3月12日
  {
    isLunar: false,
    solarMonth: 3,
    solarDay: 12,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '植树节',
    festivalEnName: 'Arbor Day'
  },
  // 愚人节，公历4月1日
  {
    isLunar: false,
    solarMonth: 4,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '愚人节',
    festivalEnName: 'April Fools Day'
  },

  // 劳动节，公历5月1日
  {
    isLunar: false,
    solarMonth: 5,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '劳动节',
    festivalEnName: 'International Labour Day'
  },

  // 青年节，公历5月4日
  {
    isLunar: false,
    solarMonth: 5,
    solarDay: 4,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '青年节',
    festivalEnName: 'Youth Day'
  },

  // 儿童节，公历6月1日
  {
    isLunar: false,
    solarMonth: 6,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '儿童节',
    festivalEnName: 'Children\'s Day'
  },

  // 建党节，公历7月1日
  {
    isLunar: false,
    solarMonth: 7,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '建党节',
    festivalEnName: 'CPC Founding Day'
  },

  // 建军节，公历8月1日
  {
    isLunar: false,
    solarMonth: 8,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '建军节',
    festivalEnName: 'PLA Founding Day'
  },

  // 日本投降纪念日，公历9月3日
  {
    isLunar: false,
    solarMonth: 9,
    solarDay: 3,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '日本投降纪念日',
    festivalEnName: 'Japanese surrender anniversary'
  },

  // 国庆节，公历10月1日
  {
    isLunar: false,
    solarMonth: 10,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '国庆节',
    festivalEnName: 'National Day'
  },

  // 光棍节，公历11月11日
  {
    isLunar: false,
    solarMonth: 11,
    solarDay: 11,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '光棍节',
    festivalEnName: 'National Day'
  },

  // 世界艾滋病日，公历12月1日
  {
    isLunar: false,
    solarMonth: 12,
    solarDay: 1,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '世界艾滋病日',
    festivalEnName: 'AIDS Day'
  },

  // 平安夜，公历12月24日
  {
    isLunar: false,
    solarMonth: 12,
    solarDay: 24,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '平安夜',
    festivalEnName: 'Christmas Eve'
  },

  // 圣诞节，公历12月25日
  {
    isLunar: false,
    solarMonth: 12,
    solarDay: 25,
    lunarMonth: null,
    lunarDay: null,
    festivalName: '圣诞节',
    festivalEnName: 'Christmas'
  },
]

export default FestivalArray
