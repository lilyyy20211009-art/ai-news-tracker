// 筛选和渲染功能
const newsData = [
    {"来源":"The Verge AI","标题":"Elon Musk is merging SpaceX and xAI to build data centers in space","链接":"https://www.theverge.com/transportation/873203/elon-musk-spacex-xai-merge-data-centers-space-tesla-ipo","日期":"2026-02-03 21:01:03"},
    {"来源":"The Verge AI","标题":"Microsoft says it's building an app store for AI content licensing","链接":"https://www.theverge.com/news/873296/microsoft-publisher-content-marketplace-ai-licensing","日期":"2026-02-03 20:00:00"},
    {"来源":"The Verge AI","标题":"Apple's Xcode adds OpenAI and Anthropic's coding agents","链接":"https://www.theverge.com/news/873300/apple-xcode-openai-anthropic-ai-agentic-coding","日期":"2026-02-03 19:04:09"},
    {"来源":"The Verge AI","标题":"French police raid X's Paris office as UK investigation continues","链接":"https://www.theverge.com/tech/873142/french-police-raid-x-investigation","日期":"2026-02-03 17:10:33"},
    {"来源":"The Verge AI","标题":"Claude Code was down, forcing developers to take a long coffee break","链接":"https://www.theverge.com/news/873093/claude-code-down-outage-anthropic","日期":"2026-02-03 16:05:42"},
    {"来源":"TechCrunch AI","标题":"Intel will start making GPUs, a market dominated by Nvidia","链接":"https://techcrunch.com/2026/02/03/intel-will-start-making-gpus-a-market-dominated-by-nvidia/","日期":"2026-02-03 21:01:34"},
    {"来源":"TechCrunch AI","标题":"Xcode moves into agentic coding with deeper OpenAI and Anthropic integrations","链接":"https://techcrunch.com/2026/02/03/xcode-moves-into-agentic-coding-with-deeper-openai-and-anthropic-integrations/","日期":"2026-02-03 18:00:00"},
    {"来源":"TechCrunch AI","标题":"Lotus Health nabs $35M for AI doctor that sees patients for free","链接":"https://techcrunch.com/2026/02/03/lotus-health-nabs-35m-for-ai-doctor-that-sees-patients-for-free/","日期":"2026-02-03 17:14:27"},
    {"来源":"NYT AI","标题":"Are A.I. Bots Plotting a Revolution on Moltbook? Or Just Telling Stories?","链接":"https://www.nytimes.com/2026/02/03/opinion/ai-agents-moltbook.html","日期":"2026-02-03 20:57:08"},
    {"来源":"NYT AI","标题":"Police Search X's Premises in France as Prosecutors Summon Elon Musk","链接":"https://www.nytimes.com/2026/02/03/world/europe/musk-x-france-police-search.html","日期":"2026-02-03 21:02:16"},
    {"来源":"YouTube - Google","标题":"How a Graphic Designer uses AI Studio for Interactive Art","链接":"https://www.youtube.com/watch?v=QikCsFDvt9g","日期":"2026-02-02 22:51:15"},
    {"来源":"YouTube - Google","标题":"Come on up-the air is fine!","链接":"https://www.youtube.com/shorts/OSgNg1Zv4os","日期":"2026-02-02 20:46:01"},
    {"来源":"YouTube - Google","标题":"Celebrating Black History Month #GoogleDoodle","链接":"https://www.youtube.com/shorts/mi-jgu3SO8Y","日期":"2026-02-01 17:01:13"},
    {"来源":"YouTube - Google for Developers","标题":"TFW you are one with the machine.","链接":"https://www.youtube.com/shorts/3Imcjj1GWQs","日期":"2026-02-03 05:00:04"},
    {"来源":"YouTube - Google for Developers","标题":"What number does this SQL query actually run?","链接":"https://www.youtube.com/shorts/KW6bXeDJEUE","日期":"2026-02-02 14:00:39"},
    {"来源":"YouTube - Liam Ottley","标题":"How to Scale Your AI Agency","链接":"https://www.youtube.com/watch?v=HiC1J8a9V1I","日期":"2026-02-03 09:35:22"}
];

function getSourceClass(source) {
    const s = source.toLowerCase();
    if (s.includes('verge')) return 'verge';
    if (s.includes('techcrunch')) return 'techcrunch';
    if (s.includes('nyt')) return 'nyt';
    if (s.includes('youtube')) return 'youtube';
    return '';
}

function renderNews(filter) {
    const container = document.getElementById('newsContainer');
    const filtered = filter === 'all' ? newsData : newsData.filter(item => item.来源.toLowerCase().includes(filter.toLowerCase()));
    
    container.innerHTML = filtered.map(item => `
        <a href="${item.链接}" target="_blank" class="news-card">
            <div class="card-source ${getSourceClass(item.来源)}">${item.来源}</div>
            <div class="card-title">${item.标题}</div>
            <div class="card-meta">🕒 ${item.日期}</div>
        </a>
    `).join('');
}

// 初始化事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 筛选按钮事件
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            renderNews(this.dataset.filter);
        });
    });
    
    // 初始渲染
    renderNews('all');
});
