export interface Festival {
    isLunarFestival: boolean;
    isFestival: boolean;
    festivalName: string;
    festivalEnName: string;
    isDoubleFestival?: boolean;
    doubleFestivalName?: string;
    secondFestivalName?: string;
    secondFestivalEnName?: string;
}
/**
 * @公历转农历：calendar.solar2lunar(1987,11,01); // [you can ignore params of prefix 0]
 * 公历转农历，支出输入：一个参数时间戳，时间字符串（1989-07-14 或 1989/07/16）
 * 也可以输入三个参数：年份数字、月份数字、日期数字
 * @农历转公历：calendar.lunar2solar(1987,09,10); // [you can ignore params of prefix 0]
 */
declare const calendar: {
    /**
     * 农历1900-2100的闰大小信息表
     * @Array Of Property
     * @return Hex
     */
    lunarInfo: number[];
    /**
     * 公历每个月份的天数普通表
     * @Array Of Property
     * @return Number
     */
    solarMonth: number[];
    /**
     * 天干地支之天干速查表
     * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
     * @return Cn string
     */
    tianGan: string[];
    /**
     * 天干地支之地支速查表
     * @Array Of Property
     * @trans ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
     * @return Cn string
     */
    diZhi: string[];
    /**
     * 天干地支之地支速查表<=>生肖
     * @Array Of Property
     * @trans ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
     * @return Cn string
     */
    Animals: string[];
    /**
     * 24节气速查表
     * @Array Of Property
     * @trans ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
     * @return Cn string
     */
    solarTerm: string[];
    /**
     * 1900-2100各年的24节气日期速查表
     * @Array Of Property
     * @return 0x string For splice
     */
    sTermInfo: string[];
    /**
     * 数字转中文速查表
     * @Array Of Property
     * @trans ['日','一','二','三','四','五','六','七','八','九','十']
     * @return Cn string
     */
    nStr1: string[];
    /**
     * 日期转农历称呼速查表
     * @Array Of Property
     * @trans ['初','十','廿','卅']
     * @return Cn string
     */
    nStr2: string[];
    /**
     * 月份转农历称呼速查表
     * @Array Of Property
     * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
     * @return Cn string
     */
    nStr3: string[];
    /**
     * 天干地支与甲子纳音对照表
     * 中文字符串数组
     * @Array Of Property
     * @return Cn string
     */
    GZNaYin: string[];
    /**
     * 天干地支与甲子纳音对照表
     * Unicode编码数组
     * @Array Of Property
     * @return Cn string
     */
    GZNaYinUnicode: string[];
    /**
     * 数字与中文照表
     * Unicode编码数组
     * @param year   1989
     * @return string   一九八九
     */
    getYearCN(year: number): string;
    /**
     * 返回农历y年一整年的总天数
     * @return Number
     * @evar .lYearDays(1987) ;//count=387
     * @param y
     */
    lYearDays(y: number): number;
    /**
     * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
     * @return Number (0-12)
     * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
     * @param y
     */
    leapMonth(y: number): number;
    /**
     * 返回农历y年闰月的天数 若该年没有闰月则返回0
     * @return Number (0、29、30)
     * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
     * @param y
     */
    leapDays(y: number): 29 | 30 | 0;
    /**
     * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
     * @return Number (-1、29、30)
     * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
     * @param y
     * @param m
     */
    monthDays(y: number, m: number): 29 | 30 | -1;
    /**
     * 返回公历(!)y年m月的天数
     * @return Number (-1、28、29、30、31)
     * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
     * @param y
     * @param m
     */
    solarDays(y: number, m: number): number;
    /**
     * 农历年份转换为干支纪年
     * @param  lYear 农历年的年份数
     * @return Cn string
     */
    totianGandiZhiYear(lYear: number): string;
    /**
     * 公历月、日判断所属星座
     * @param  cMonth [description]
     * @param  cDay [description]
     * @return Cn string
     */
    toAstro(cMonth: number, cDay: number): string;
    /**
     * 公历月、日判断所属星座
     * @return Cn string
     * @param Astro
     */
    toAstroEn(Astro: string): string;
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
    getFestival(solarMonth: number, solarDay: number, lunarMonth: number, lunarDay: number, isTerm: boolean, term: string | undefined, lunarYear: number): Festival;
    /**
     * 传入offset偏移量返回干支
     * @param offset 相对甲子的偏移量
     * @return Cn string
     */
    totianGandiZhi(offset: number): string;
    /**
     * 传入公历(!)y年获得该年第n个节气的公历日期
     * @return day Number
     * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
     * @param y
     * @param n
     */
    getTerm(y: number, n: number): number;
    /**
     * 传入农历数字月份返回汉语通俗表示法
     * @return Cn string
     * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
     * @param m
     */
    toChinaMonth(m: number): string | -1;
    /**
     * 传入农历日期数字返回汉字表示法
     * @return Cn string
     * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
     * @param d
     */
    toChinaDay(d: number): string;
    /**
     * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
     * @param y year
     * @return Cn string
     * @eg:var animal = calendar.getAnimal(1987) ; //animal='兔'
     */
    getAnimal(y: number): string;
    /**
     * 传入阳历年获取是否闰年
     * @return boolean
     * @eg:console.log(calendar.isLeapYear(1989));
     * @param solarYear number
     */
    isLeapYear(solarYear: number): string | boolean;
    /**
     * 传入阳历年,月份，返回当月的阳历月天数
     * @return number
     * @eg:console.log(calendar.countSolarMonthDays(1989, 7));
     * @param solarYear number
     * @param solarMonth number
     *
     */
    countSolarMonthDays(solarYear: number, solarMonth: number): string | number;
    /**
     * 传入阳历年份，获取该年的所有节日，节日列表同 FestivalArray 中所列举
     * @return []
     *
     * @param solarYear: string | number
     */
    getAllFestival(solarYear: string | number): "请输入正确的年份格式" | "请检查输入参数的合法性，目前仅支持1901.1.1-2099.12.31之间的查询,传入的时间超出查询范围！" | ({
        doubleFestivalName: string | undefined;
        isDoubleFestival: true;
        secondFestivalEnName: string | undefined;
        secondFestivalName: string | undefined;
        fullLunarMonthString: string;
        isFestival: true;
        isLunarFestival: boolean;
        festivalEnName: string;
        fullSolarMonthString: string;
        festivalName: string;
        solarMonth: any;
        solarDay: any;
        lunarMonth: number;
        lunarDay: number;
        isTerm: boolean;
        Term: string;
    } | {
        fullLunarMonthString: string;
        isFestival: true;
        isLunarFestival: boolean;
        festivalEnName: string;
        fullSolarMonthString: string;
        festivalName: string;
        solarMonth: any;
        solarDay: any;
        lunarMonth: number;
        lunarDay: number;
        isTerm: boolean;
        Term: string;
        doubleFestivalName?: undefined;
        isDoubleFestival?: undefined;
        secondFestivalEnName?: undefined;
        secondFestivalName?: undefined;
    })[];
    /**
     * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
     * @return JSON object
     * @eg:console.log(calendar.solar2lunar(1987,11,01));
     * @param Year
     * @param Month
     * @param Day
     */
    solar2lunar(Year?: string | number | undefined, Month?: string | number | undefined, Day?: string | number | undefined): "请检查输入参数的合法性，目前仅支持1901.1.1-2099.12.31之间的查询,传入的时间超出查询范围！" | "请检查输入参数的合法性，月份只能在1~12之间！" | "日期只能在1~31之间！" | {
        lunarYear: number;
        lunarYearCN: string;
        lunarMonth: number;
        lunarDay: number;
        lunarMonthDays: number;
        fullLunarMonthString: string;
        zodiac: string;
        IMonthCn: string;
        IDayCn: string;
        solarYear: any;
        solarYearCN: string;
        solarMonth: any;
        solarDay: any;
        solarMonthDays: string | number;
        gzYear: string;
        gzMonth: string;
        gzDay: string;
        isToday: boolean;
        isLeapMonth: boolean;
        isLeapYear: string | boolean;
        nWeek: any;
        ncWeek: string;
        isTerm: boolean;
        Term: string;
        constellation: string;
        GzNy: string;
        astroEn: string;
        isFestival: boolean;
        festivalName: string;
        festivalEnName: string;
    };
    /**
     * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历o
     * @param year number  年份数字
     * @param month number  月份数字
     * @param date number  日期数字
     * @param isLeapM boolean  是否闰月
     * @return JSON object
     * @eg:console.log(calendar.lunar2solar(1987,9,10));
     */
    lunar2solar(year: number, month: number, date: number, isLeapM: boolean): any;
};
export default calendar;
