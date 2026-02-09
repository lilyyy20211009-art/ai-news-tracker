// 筛选和渲染功能
const newsData = [
    {
"标题": "OpenAI’s supposedly ‘leaked’ Super Bowl ad with ear buds and a shiny orb was a hoax",
"内容": "As if OpenAI didn't have enough drama around the Super Bowl and advertising, as the game wound down, word spread of a \"leaked\" ad that actually wasn't leaked at all; it was just a fake. Screenshots of a now-deleted Reddit thread told the tale of a frustrated employee who, while posting about how upset they [&#8230;]",
"日期": "2026-02-09 04:54:36",
"链接": "https://www.theverge.com/ai-artificial-intelligence/875615/openai-super-bowl-ai-hardware-leak-hoax-fake",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
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
"标题": "Michael Pollan Says Humanity Is About to Undergo a Revolutionary Change",
"内容": "The best-selling author Michael Pollan grapples with big questions about A.I., consciousness and the distractions polluting our minds.",
"日期": "2026-02-09 11:27:20",
"链接": "https://www.nytimes.com/video/podcasts/100000010699275/michael-pollan-says-humanity-is-about-to-undergo-a-revolutionary-change.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Hollywood Braces for New Round of Labor Talks",
"内容": "The last time writers and actors negotiated contracts, in 2023, dual strikes froze the industry.",
"日期": "2026-02-09 10:02:51",
"链接": "https://www.nytimes.com/2026/02/09/business/media/hollywood-actors-writers-contract-talks.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Michael Pollan Says Humanity Is About to Undergo a Revolutionary Change",
"内容": "The best-selling author grapples with big questions about A.I., consciousness and the distractions polluting our minds.",
"日期": "2026-02-09 11:28:07",
"链接": "https://www.nytimes.com/2026/02/07/magazine/michael-pollan-interview.html",
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
