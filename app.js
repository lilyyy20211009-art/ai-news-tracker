// 筛选和渲染功能
const newsData = [
    {
"标题": "The great computer science exodus (and where students are going instead)",
"内容": "Students are losing some interest in computer science broadly but gaining interest in AI-specific majors and courses.",
"日期": "2026-02-15 08:40:27",
"链接": "https://techcrunch.com/2026/02/15/the-great-computer-science-exodus-and-where-students-are-going-instead/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Is safety ‘dead’ at xAI?",
"内容": "Elon Musk is “actively” working to make xAI’s Grok chatbot “more unhinged, according to a former employee.",
"日期": "2026-02-14 21:55:44",
"链接": "https://techcrunch.com/2026/02/14/is-safety-is-dead-at-xai/",
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
