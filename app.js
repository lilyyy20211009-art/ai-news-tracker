// 筛选和渲染功能
const newsData = [
    {
"标题": "The trap Anthropic built for itself",
"内容": "Anthropic, OpenAI, Google DeepMind and others have long promised to govern themselves responsibly. Now, in the absence of rules, there's not a lot to protect them.",
"日期": "2026-03-01 00:08:58",
"链接": "https://techcrunch.com/2026/02/28/the-trap-anthropic-built-for-itself/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic’s Claude rises to No. 2 in the App Store following Pentagon dispute",
"内容": "Anthropic’s chatbot Claude seems to have benefited from the attention around the company’s fraught negotiations with the Pentagon.",
"日期": "2026-02-28 21:05:06",
"链接": "https://techcrunch.com/2026/02/28/anthropics-claude-rises-to-no-2-in-the-app-store-following-pentagon-dispute/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The billion-dollar infrastructure deals powering the AI boom",
"内容": "Here's everything we know about the biggest AI infrastructure projects, including major spending from Meta, Oracle, Microsoft, Google, and OpenAI.",
"日期": "2026-02-28 20:41:55",
"链接": "https://techcrunch.com/2026/02/28/billion-dollar-infrastructure-deals-ai-boom-data-centers-openai-oracle-nvidia-microsoft-google-meta/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A Rock Star Philosopher",
"内容": "Michael Sandel, the Harvard professor, has been predicting this political moment for decades. We called him to discuss where we go from here.",
"日期": "2026-03-01 10:01:39",
"链接": "https://www.nytimes.com/2026/03/01/briefing/a-rock-star-philosopher.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Are ‘Bossware’ Tools Tracking You?",
"内容": "In recent years, the technologies used to surveil workers have become more sophisticated and widespread.",
"日期": "2026-03-01 10:01:22",
"链接": "https://www.nytimes.com/2026/03/01/business/bossware-work-surveillance-tools.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "At the Pentagon, OpenAI is In and Anthropic Is Out",
"内容": "It’s been a crazy 48 hours in the A.I. industry.",
"日期": "2026-03-01 00:18:15",
"链接": "https://www.nytimes.com/2026/02/28/podcasts/hardfork-pentagon-anthropic-openai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "False and outdated videos circulated online after the Iran strikes.",
"内容": "",
"日期": "2026-02-28 23:32:43",
"链接": "https://www.nytimes.com/live/2026/02/28/world/iran-strikes-trump/false-and-outdated-videos-circulated-online-after-the-iran-strikes",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
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
