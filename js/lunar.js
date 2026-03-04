// 农历转换库（简化版）
const lunarData = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d95f, 0x16bf9, 0x156e9,
    0x165ed, 0x209e0, 0x20ea6, 0x213df, 0x321ef, 0x325f9, 0x33edb, 0x37420,
    0x4370a, 0x565a0, 0x5740a, 0x051d4, 0x06a45, 0x74ae6, 0x7b537, 0x7eca6,
    0x7f9e9, 0x8cd6d, 0x92e95, 0xa02c0, 0xa24d5, 0xa2b00, 0x92e39, 0x9a4d9,
    0xb27a8, 0x9b9a6, 0xb2ba9, 0xb6fc2, 0xc1cc5, 0xc5a6d, 0xc65ae, 0xc8c9d,
    0xc913e, 0xc949f, 0xca6b6, 0xcad4f, 0xd4a7a, 0xd5b63, 0xd6a6f, 0xd7381,
    0xd92ef, 0xdaa96, 0xdff92, 0xe0ec6, 0xe1be6, 0xe3467, 0xe3a88, 0xe469f,
    0xeacff, 0xeb6d4, 0xee56f, 0xf095d, 0xf0ca2, 0xf1d93, 0xf2e45, 0xf3338,
];

const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getLeapMonth(lunarYear) {
    const flag = lunarData[lunarYear - 1900] & 0xf;
    return flag === 0xf ? 0 : flag;
}

function getLunarMonthDaysCount(lunarYear, lunarMonth) {
    const lunarInfo = lunarData[lunarYear - 1900];
    return ((lunarInfo >> (16 - lunarMonth)) & 1) === 1 ? 30 : 29;
}

function solarToLunar(year, month, day) {
    let lunarYear, lunarMonth, lunarDay;
    let daysCount = 0;

    let startYear = 1900;
    for (let i = startYear; i < year; i++) {
        daysCount += isLeapYear(i) ? 366 : 365;
    }

    for (let i = 1; i < month; i++) {
        if (i === 2) {
            daysCount += isLeapYear(year) ? 29 : 28;
        } else if ([4, 6, 9, 11].includes(i)) {
            daysCount += 30;
        } else {
            daysCount += 31;
        }
    }
    daysCount += day;

    lunarYear = 1900;
    daysCount -= 29;
    while (true) {
        const yearDays = 383 + (getLeapMonth(lunarYear) ? 1 : 0);
        if (daysCount < yearDays) break;
        daysCount -= yearDays;
        lunarYear++;
    }

    lunarMonth = 1;
    const leapMonth = getLeapMonth(lunarYear);
    while (true) {
        let monthDays = getLunarMonthDaysCount(lunarYear, lunarMonth);
        if (daysCount <= monthDays) break;
        daysCount -= monthDays;
        lunarMonth++;
    }

    lunarDay = daysCount;
    return { year: lunarYear, month: lunarMonth, day: lunarDay };
}

function getLunarDate(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const lunar = solarToLunar(year, month, day);
    const heavenlyIndex = (lunar.year - 1900) % 10;
    const earthlyIndex = (lunar.year - 1900) % 12;

    const stem = heavenlyStems[heavenlyIndex];
    const branch = earthlyBranches[earthlyIndex];
    const lunarMonthStr = lunarMonths[lunar.month - 1];
    const lunarDayStr = lunarDays[lunar.day - 1];

    return `${stem}${branch}年 ${lunarMonthStr}月${lunarDayStr}`;
}
