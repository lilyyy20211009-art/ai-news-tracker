// 筛选和渲染功能
const newsData = [
    {
"标题": "How many AIs does it take to read a PDF?",
"内容": "Last November, the House Oversight Committee had just released 20,000 pages of documents from the estate of Jeffrey Epstein, and Luke Igel and some friends were clicking around, trying to follow the threads of conversation through garbled email threads and a PDF viewer that was, frankly, \"gross.\" In the coming months, the Department of Justice [&#8230;]",
"日期": "2026-02-23 11:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/882891/ai-pdf-parsing-failure",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Samsung is adding Perplexity to Galaxy AI",
"内容": "In addition to summoning Bixby or Gemini, Galaxy S26 users will be able to call on Perplexity by saying \"hey, Plex.\" The integration of Perplexity into Galaxy AI is just one element of the company's embrace of a \"multi-agent ecosystem.\" Often, people will use different AI agents for different tasks, depending on where their strengths [&#8230;]",
"日期": "2026-02-22 22:15:30",
"链接": "https://www.theverge.com/tech/882921/samsung-is-adding-perplexity-to-galaxy-ai",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "An Autonomous OpenClaw Chatbot Wanted Revenge",
"内容": "An autonomous OpenClaw chatbot seeks revenge.",
"日期": "2026-02-23 10:04:15",
"链接": "https://www.nytimes.com/2026/02/23/opinion/chatbots-open-claw.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "‘A.I. Literacy’ Is Trending in Schools. Here’s Why.",
"内容": "Artificial intelligence companies are urging teachers to prepare students for an “A.I.-driven future.” What that means varies from school to school.",
"日期": "2026-02-23 10:02:24",
"链接": "https://www.nytimes.com/2026/02/23/business/ai-literacy-faq.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "‘A.I. Literacy’ Is the New Drivers’ Ed at This Newark School",
"内容": "Teachers say they want to equip high school students to drive artificial intelligence, rather than be mere passengers steered by chatbots.",
"日期": "2026-02-23 10:00:53",
"链接": "https://www.nytimes.com/2026/02/23/technology/ai-literacy-newark-school-chatbots.html",
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
