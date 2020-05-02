interface Festival {
    isLunar: boolean;
    solarMonth: number | null;
    solarDay: number | null;
    lunarMonth: number | null;
    lunarDay: number | null;
    festivalName: string;
    festivalEnName: string;
    isTerm?: boolean;
    term?: string;
    newYearEve?: boolean;
    monthDays?: number;
}
declare const FestivalArray: Festival[];
export default FestivalArray;
