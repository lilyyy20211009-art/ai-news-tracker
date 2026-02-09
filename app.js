// 筛选和渲染功能
const newsData = [
    {
"标题": "Super Bowl LX ads: all AI everything",
"内容": "Super Bowl LX is nearly here, with the Seattle Seahawks taking on the New England Patriots. While Bad Bunny will be the star of the halftime show, AI could be the star of the commercial breaks, much like crypto was a few years ago. Last year’s Super Bowl featured a Google Gemini ad that fumbled [&#8230;]",
"日期": "2026-02-08 23:58:02",
"链接": "https://www.theverge.com/entertainment/874504/super-bowl-lx-ads-big-game",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "New York is considering two bills to rein in the AI industry",
"内容": "New York's state legislature is set to consider a pair of bills that would require labels on AI-generated content and would put a three-year pause on new data center construction. The New York Fundamental Artificial Intelligence Requirements in News Act (NY FAIR News Act, for short) would require that any news \"substantially composed, authored, or [&#8230;]",
"日期": "2026-02-08 21:04:53",
"链接": "https://www.theverge.com/ai-artificial-intelligence/875501/new-york-is-considering-two-bills-to-rein-in-the-ai-industry",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Crypto.com places $70M bet on AI.com domain ahead of Super Bowl",
"内容": "The purchase rewrites the domain record books -- not that the crypto industry has ever been accused of restraint when it comes to spending.",
"日期": "2026-02-08 20:19:47",
"链接": "https://techcrunch.com/2026/02/08/crypto-com-places-70m-bet-on-ai-com-domain-ahead-of-super-bowl/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Okay, I’m slightly less mad about that ‘Magnificent Ambersons’ AI project",
"内容": "But this is still a bad idea.",
"日期": "2026-02-08 19:36:28",
"链接": "https://techcrunch.com/2026/02/08/okay-im-slightly-less-mad-about-that-magnificent-ambersons-ai-project/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "From Svedka to Anthropic, brands make bold plays with AI in Super Bowl ads",
"内容": "From the first AI-generated Big Game ad courtesy of Svedka to Anthropic's beef with OpenAI, here are the biggest ads from Super Bowl LX.",
"日期": "2026-02-08 16:18:16",
"链接": "https://techcrunch.com/2026/02/08/super-bowl-60-ai-ads-svedka-anthropic-brands-commercials/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The Church of Molt",
"内容": "A.I. agents are creating religions. What does that mean for us?",
"日期": "2026-02-08 14:11:55",
"链接": "https://www.nytimes.com/2026/02/08/briefing/the-church-of-molt.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "It’s the A.I. Economy, Stupid",
"内容": "The Democratic Party needs to prepare for the coming tech revolution.",
"日期": "2026-02-08 15:16:20",
"链接": "https://www.nytimes.com/2026/02/08/opinion/ai-democrats-jobs-economy.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Can AI Chatbots Write Emotionally Rich Romance Books?",
"内容": "The romance industry, always at the vanguard of technological change, is rapidly adapting to A.I. Not everyone is on board.",
"日期": "2026-02-08 15:16:21",
"链接": "https://www.nytimes.com/2026/02/08/business/ai-claude-romance-books.html",
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
