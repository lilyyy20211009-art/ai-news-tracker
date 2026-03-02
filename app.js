// 筛选和渲染功能
const newsData = [
    {
"标题": "Google looks to tackle longstanding RCS spam in India — but not alone",
"内容": "Google is integrating carrier-level filtering into RCS in India through a partnership with Airtel to strengthen protections against spam.",
"日期": "2026-03-01 17:30:00",
"链接": "https://techcrunch.com/2026/03/01/google-looks-to-tackle-longstanding-rcs-spam-in-india-but-not-alone/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI reveals more details about its agreement with the Pentagon",
"内容": "By CEO Sam Altman’s own admission, OpenAI’s deal with the Department of Defense was “definitely rushed,” and “the optics don’t look good.”",
"日期": "2026-03-01 16:30:10",
"链接": "https://techcrunch.com/2026/03/01/openai-shares-more-details-about-its-agreement-with-the-pentagon/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic’s Claude rises to No. 1 in the App Store following Pentagon dispute",
"内容": "Anthropic’s chatbot Claude seems to have benefited from the attention around the company’s fraught negotiations with the Pentagon.",
"日期": "2026-03-01 14:48:58",
"链接": "https://techcrunch.com/2026/03/01/anthropics-claude-rises-to-no-2-in-the-app-store-following-pentagon-dispute/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "SaaS in, SaaS out: Here’s what’s driving the SaaSpocalypse",
"内容": "What's behind the SaaSpocalypse? It simply seems a new supreme has risen.",
"日期": "2026-03-01 14:00:00",
"链接": "https://techcrunch.com/2026/03/01/saas-in-saas-out-heres-whats-driving-the-saaspocalypse/",
"来源": "TechCrunch AI",
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
