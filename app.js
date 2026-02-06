// 筛选和渲染功能
const newsData = [
    {
"标题": "Sapiom raises $15M to help AI agents buy their own tech tools",
"内容": "The startup -- with backing from Accel -- is building a financial layer that handles the authentication and micro-payments required for AI agents.",
"日期": "2026-02-05 23:53:42",
"链接": "https://techcrunch.com/2026/02/05/sapiom-raises-15m-to-help-ai-agents-buy-their-own-tech-tools/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Reddit looks to AI search as its next big opportunity",
"内容": "During the company's fourth-quarter earnings call on Thursday, it offered an update on its plans to merge traditional and AI search together and hinted that although search is not yet monetized, \"it's an enormous market and opportunity.\"",
"日期": "2026-02-05 23:20:27",
"链接": "https://techcrunch.com/2026/02/05/reddit-looks-to-ai-search-as-its-next-big-opportunity/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "AWS revenue continues to soar as cloud demand remains high",
"内容": "AWS recorded its best quarter, in terms of revenue growth, in 13 quarters in Q4 2025 as AI drives AWS adoption.",
"日期": "2026-02-05 23:11:37",
"链接": "https://techcrunch.com/2026/02/05/aws-revenue-continues-to-soar-as-cloud-demand-remains-high/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amazon and Google are winning the AI capex race — but what’s the prize?",
"内容": "In 2026, Amazon plans to spend $200 billion in capex. Google is just behind at $175 billion to $185 billion. It's a lot of money!",
"日期": "2026-02-05 22:43:11",
"链接": "https://techcrunch.com/2026/02/05/amazon-and-google-are-winning-the-ai-capex-race-but-whats-the-prize/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI launches new agentic coding model only minutes after Anthropic drops its own",
"内容": "The new model is built to accelerate the capabilities of Codex, the agentic coding tool OpenAI launched earlier this week.",
"日期": "2026-02-05 20:01:39",
"链接": "https://techcrunch.com/2026/02/05/openai-launches-new-agentic-coding-model-only-minutes-after-anthropic-drops-its-own/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The Dark Side of A.I. Weighs on the Stock Market",
"内容": "The prospect of disruptions from artificial intelligence has hung over the economy for years. But this week advances in software tools precipitated a sell-off on Wall Street.",
"日期": "2026-02-06 10:04:16",
"链接": "https://www.nytimes.com/2026/02/06/business/the-dark-side-of-ai-weighs-on-the-stock-market.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amazon’s $200 Billion Spending Plan Raises Stakes in A.I. Race",
"内容": "The company reported a strong holiday quarter on Thursday. But its spending, like that at other big technology companies, is starting to make investors nervous.",
"日期": "2026-02-05 23:51:01",
"链接": "https://www.nytimes.com/2026/02/05/technology/amazon-200-billion-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google Plans to Double Spending Amid A.I. Race",
"内容": "Profits jumped 30 percent to $34.5 billion last quarter, and the tech giant is increasing its capital spending this year to as much as $185 billion.",
"日期": "2026-02-06 04:33:17",
"链接": "https://www.nytimes.com/2026/02/04/business/google-earnings-ai.html",
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
