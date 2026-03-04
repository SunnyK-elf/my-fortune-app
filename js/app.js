// 运势数据
const fortuneData = [
    { text: "春风得意马蹄疾，一日看尽长安花", level: "大吉" },
    { text: "天时地利人和，诸事皆宜", level: "大吉" },
    { text: "良辰吉日，百事顺意", level: "大吉" },
    { text: "锦绣前程，美好可期", level: "大吉" },
    { text: "运势如虹，闪闪发光", level: "大吉" },
    
    { text: "静水深流，暗流涌动", level: "中吉" },
    { text: "厚积薄发，待时而动", level: "中吉" },
    { text: "稳中有升，前景光明", level: "中吉" },
    { text: "平稳前行，渐入佳境", level: "中吉" },
    { text: "循序渐进，步步为营", level: "中吉" },
    
    { text: "点滴进步，凡事有成", level: "小吉" },
    { text: "小有收获，不负期许", level: "小吉" },
    { text: "平常心态，福至心灵", level: "小吉" },
    { text: "细节决定成败，小心驶得万年船", level: "小吉" },
    { text: "宁静致远，岁月静好", level: "小吉" },
    
    { text: "命运多舛，需要耐心等待", level: "末吉" },
    { text: "山重水复疑无路，柳暗花明又一村", level: "末吉" },
    { text: "时来运转，厚积方能薄发", level: "末吉" },
    { text: "乌云之后见晴天，坚持就是胜利", level: "末吉" },
    { text: "困难面前莫退缩，曙明前的黑暗终会过去", level: "末吉" },
    
    { text: "运势低迷，谨言慎行为上策", level: "凶" },
    { text: "诸事不宜，宜静不宜动", level: "凶" },
    { text: "小人作祟，避而远之方为上策", level: "凶" },
    { text: "波澜起伏，需要沉着应对", level: "凶" },
    { text: "暗礁险滩，谨防不测", level: "凶" }
];

// 颜色映射
const levelColorMap = {
    "大吉": "level-daji",
    "中吉": "level-zhongji",
    "小吉": "level-xiaoji",
    "末吉": "level-moiji",
    "凶": "level-xiong"
};

// 更新日期和时间
function updateDateTime() {
    const now = new Date();
    
    // 公历日期
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const gregorianStr = now.toLocaleDateString('zh-CN', options);
    document.getElementById('gregorianDate').textContent = gregorianStr;
    
    // 农历日期
    const lunarStr = getLunarDate(now);
    document.getElementById('lunarDate').textContent = lunarStr;
    
    // 实时时间（北京时间）
    const beijingTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
    const hours = String(beijingTime.getHours()).padStart(2, '0');
    const minutes = String(beijingTime.getMinutes()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}`;
}

// 初始化并定时更新
setInterval(updateDateTime, 1000);
updateDateTime();

// 获取随机运势
function getRandomFortune() {
    return fortuneData[Math.floor(Math.random() * fortuneData.length)];
}

// 创建粒子特效
function createParticles(event) {
    const particleCount = 30;
    let button = document.getElementById('drawButton');
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 随机颜色
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        
        // 随机大小
        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';
        
        // 随机方向和距离
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// 抽签函数
async function drawFortune() {
    const stickContainer = document.getElementById('stickContainer');
    const fortuneContent = document.getElementById('fortuneContent');
    const drawButton = document.getElementById('drawButton');
    const stickTube = document.querySelector('.stick-tube');
    
    // 隐藏重新抽签按钮，显示签筒
    drawButton.style.display = 'none';
    stickContainer.style.display = 'block';
    fortuneContent.style.display = 'none';
    
    // 开始摇晃动画
    stickTube.classList.remove('shaking');
    void stickTube.offsetWidth; // 强制重排，重新触发动画
    stickTube.classList.add('shaking');
    
    // 等待摇晃结束
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // 获取随机运势
    const fortune = getRandomFortune();
    
    // 隐藏签筒，显示签文
    stickContainer.style.display = 'none';
    fortuneContent.style.display = 'flex';
    
    document.getElementById('fortuneText').textContent = `"${fortune.text}"`;
    const levelElement = document.getElementById('fortuneLevel');
    levelElement.textContent = fortune.level;
    levelElement.className = 'fortune-level ' + levelColorMap[fortune.level];
    
    // 显示重新抽签按钮
    drawButton.style.display = 'inline-block';
    
    // 创建粒子特效
    createParticles({});
}

// 签筒点击事件
document.addEventListener('DOMContentLoaded', function() {
    const stickContainer = document.getElementById('stickContainer');
    if (stickContainer) {
        stickContainer.addEventListener('click', drawFortune);
    }
    
    // 初始页面显示签筒
    updateDateTime();
});
