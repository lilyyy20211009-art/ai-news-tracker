// 筛选和渲染功能
const newsData = [
    {
"标题": "Inside the secret meeting that led to the AI political resistance",
"内容": "In early January, a group of 90 or so political, community and thought leaders gathered in a New Orleans Marriott for a secret conference on artificial intelligence - so secret, in fact, that no one knew who else had been invited until they walked into the room. Church leaders and conservative academics were sitting next [&#8230;]",
"日期": "2026-03-04 11:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/888841/pro-human-ai-declaration-fli",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Why AI startups are selling the same equity at two different prices",
"内容": "Some AI founders are using a novel valuation mechanism to manufacture unicorn status.",
"日期": "2026-03-04 00:31:25",
"链接": "https://techcrunch.com/2026/03/03/why-ai-startups-are-selling-the-same-equity-at-two-different-prices/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Alibaba’s Qwen tech lead steps down after major AI push",
"内容": "Reactions rippled through Alibaba's Qwen team after tech lead Junyang Lin stepped down following a major model launch.",
"日期": "2026-03-03 23:16:36",
"链接": "https://techcrunch.com/2026/03/03/alibabas-qwen-tech-lead-steps-down-after-major-ai-push/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "AI companies are spending millions to thwart this former tech exec’s congressional bid",
"内容": "A tech billionaire-backed super PAC is spending $125 million to undercut candidates pushing for AI regulation. New York's Alex Bores, a former tech executive himself, is one of them.",
"日期": "2026-03-03 21:44:09",
"链接": "https://techcrunch.com/2026/03/03/ai-companies-are-spending-millions-to-thwart-this-former-tech-execs-congressional-bid/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "ChatGPT’s new GPT-5.3 Instant model will stop telling you to calm down",
"内容": "The company says the new model will reduce the \"cringe\" that's been annoying its users for months.",
"日期": "2026-03-03 20:20:56",
"链接": "https://techcrunch.com/2026/03/03/chatgpts-new-gpt-5-3-instant-model-will-stop-telling-you-to-calm-down/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Claude Code rolls out a voice mode capability",
"内容": "Anthropic is stepping up its game in the AI coding space with the rollout of Voice Mode in Claude Code.",
"日期": "2026-03-03 20:02:10",
"链接": "https://techcrunch.com/2026/03/03/claude-code-rolls-out-a-voice-mode-capability/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "I Worked for Block. Its A.I. Job Cuts Aren’t What They Seem.",
"内容": "Is Block’s announcement just a convenient and flashy new cover for typical corporate downsizing?",
"日期": "2026-03-04 10:03:25",
"链接": "https://www.nytimes.com/2026/03/04/opinion/block-jack-dorsey-layoffs-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. in New York Schools: What Lies Ahead?",
"内容": "The city has been absent from the list of school districts around the nation that are using A.I. in the classroom. That could change.",
"日期": "2026-03-04 10:01:49",
"链接": "https://www.nytimes.com/2026/03/04/nyregion/ai-in-new-york-schools-what-lies-ahead.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Where Are China’s A.I. Doomers?",
"内容": "Chinese policymakers and the public have expressed high levels of optimism about A.I., even as many in the West worry about the technology’s effects on employment or humanity in general.",
"日期": "2026-03-04 08:53:17",
"链接": "https://www.nytimes.com/2026/03/04/world/asia/china-ai-enthusiasm.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A Fight About the Future of War",
"内容": "A.I. is already reshaping warfare, but there are big disagreements over what guardrails are needed.",
"日期": "2026-03-04 05:53:38",
"链接": "https://www.nytimes.com/2026/03/03/world/anthropic-pentagon-lebanon-miami.html",
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
