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
    { text: "困难面前莫退缩，��明前的黑暗终会过去", level: "末吉" },
    
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

// 获取随机运势
function getRandomFortune() {
    return fortuneData[Math.floor(Math.random() * fortuneData.length)];
}

// 创建粒子特效
function createParticles(event) {
    const particleCount = 30;
    const button = event.target.closest('.button');
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
    const button = document.getElementById('drawButton');
    const buttonText = document.getElementById('buttonText');
    const fortuneContent = document.getElementById('fortuneContent');
    
    // 禁用按钮
    button.disabled = true;
    buttonText.innerHTML = '<div class="loading"></div>';
    
    // 显示加载动画
    fortuneContent.style.opacity = '0.5';
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 获取随机运势
    const fortune = getRandomFortune();
    
    // 更新内容
    fortuneContent.innerHTML = `
        <div class="fortune-text">"${fortune.text}"</div>
        <div class="fortune-level ${levelColorMap[fortune.level]}">${fortune.level}</div>
    `;
    fortuneContent.style.opacity = '1';
    
    // 重新启用按钮
    button.disabled = false;
    buttonText.textContent = '抽一签';
    
    // 创建粒子特效
    const event = new Event('click');
    event.target = button;
    createParticles(event);
}

// 页面加载时显示一个初始运势
window.addEventListener('load', () => {
    drawFortune();
});
