// 筛选和渲染功能
const newsData = [
    {
"标题": "A robot arm with puppy dog eyes is just one of Lenovo&#8217;s new desktop AI concepts",
"内容": "Alongside a handful of new laptop concepts (and a range of real products too), Lenovo used MWC to announce a pair of AI-based productivity companion concepts. Both are standalone desk devices designed to boost productivity while providing office workers with a bit of artificial dystopic companionship. Lenovo describes its AI Workmate Concept as an \"always-on [&#8230;]",
"日期": "2026-03-01 23:01:00",
"链接": "https://www.theverge.com/tech/885228/lenovo-ai-workmate-companion-work-concept-robot-arm-desktop-clock-hub",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "U.S. Schools Are Betting Big on A.I. Will New York City Be Next?",
"内容": "This could be a pivotal year in shaping what role artificial intelligence plays in American schools. Some families want Mayor Mamdani to hit the brakes.",
"日期": "2026-03-02 08:00:08",
"链接": "https://www.nytimes.com/2026/03/02/nyregion/nyc-ai-schools-mamdani.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "China’s Parents Are Outsourcing the Homework Grind to A.I.",
"内容": "Parents in China are turning to A.I. chatbots and other tools to help their children gain an edge and ease the fighting over homework.",
"日期": "2026-03-02 05:01:06",
"链接": "https://www.nytimes.com/2026/03/02/world/asia/china-education-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "China’s New Study Buddy: The A.I. Chatbot",
"内容": "Parents in China are using homegrown chatbots like DeepSeek and Doubao as well as Google’s Gemini to help their children with homework and give them an academic edge.",
"日期": "2026-03-02 05:02:09",
"链接": "https://www.nytimes.com/video/world/asia/100000010707197/china-ai-chatbot-homework.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How Talks Between Anthropic and the Defense Dept. Fell Apart",
"内容": "The Pentagon and Anthropic were close to agreeing on the use of artificial intelligence. But strong personalities, mutual dislike and a rival company unraveled a deal.",
"日期": "2026-03-01 20:47:22",
"链接": "https://www.nytimes.com/2026/03/01/technology/anthropic-defense-dept-openai-talks.html",
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
