// 筛选和渲染功能
const newsData = [
    {
"标题": "Super Bowl LX ads: all AI everything",
"内容": "Super Bowl LX is nearly here, with the Seattle Seahawks taking on the New England Patriots. While Bad Bunny will be the star of the halftime show, AI could be the star of the commercial breaks, much like crypto was a few years ago. Last year’s Super Bowl featured a Google Gemini ad that fumbled [&#8230;]",
"日期": "2026-02-05 18:18:34",
"链接": "https://www.theverge.com/entertainment/874504/super-bowl-lx-ads-big-game",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Claude has been having a moment — can it keep it up?",
"内容": "Boris Cherny gets recognized in public relatively often. At the bar, at the airport, and in generally any public space, people want to take selfies with the creator and head of Claude Code. For the last couple of months, Anthropic's Claude and its coding platform have been having a moment - on social media, in [&#8230;]",
"日期": "2026-02-05 18:00:00",
"链接": "https://www.theverge.com/report/874308/anthropic-claude-code-opus-hype-moment",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic debuts new model with hopes to corner the market beyond coding",
"内容": "Anthropic's \"smartest model\" is getting a major boost, the company said in a blog post announcing Claude Opus 4.6. It called the new model a \"direct upgrade\" from its predecessor in a release, noting that it can better take on complex, multi-step tasks and get \"much closer to production-ready quality on the first try than [&#8230;]",
"日期": "2026-02-05 18:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/874440/anthropic-opus-4-6-new-model-claude",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Nvidia&#8217;s RTX 50-series Super refresh is delayed, and the RTX 60-series might miss 2027",
"内容": "The Super refresh to Nvidia's RTX 50-series GPUs was expected at CES 2026 in January, but it didn't make an appearance. The Information reports that in December, Nvidia managers decided not to release the new cards as scheduled, choosing to prioritize AI chips instead due to the limited supply of RAM currently available. On top [&#8230;]",
"日期": "2026-02-05 16:33:27",
"链接": "https://www.theverge.com/tech/874439/nvidia-rtx-50-super-60-series-delay",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Reality is losing the deepfake war",
"内容": "Today, we’re going to talk about reality, and whether we can label photos and videos to protect our shared understanding of the world around us. No really, we’re gonna go there. It’s a deep one. To do this, I’m going to bring on Verge reporter Jess Weatherbed, who covers creative tools for us — a [&#8230;]",
"日期": "2026-02-05 15:00:00",
"链接": "https://www.theverge.com/podcast/874038/ai-deepfakes-war-on-reality-c2pa-labels",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI Frontier is a single platform to control your AI agents",
"内容": "Managing humans is hard. Managing AI agents is… also hard. That's why OpenAI is launching a new platform called OpenAI Frontier, which it says will help businesses \"build, deploy, and manage\" AI agents, even those not made by OpenAI itself. OpenAI's description of Frontier sounds something like HR for AI. \"Frontier gives agents the same [&#8230;]",
"日期": "2026-02-05 14:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/874258/openai-frontier-ai-agent-platform-management",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
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
"标题": "Elon Musk is getting serious about orbital data centers",
"内容": "We’re starting to see the idea of Musk-owned orbital AI data clusters cohere into an actual plan.",
"日期": "2026-02-05 18:50:49",
"链接": "https://techcrunch.com/2026/02/05/elon-musk-is-getting-serious-about-orbital-data-centers/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI launches a way for enterprises to build and manage AI agents",
"内容": "OpenAI launched Frontier, a new platform designed for enterprises to build and deploy agents while treating them like human employees.",
"日期": "2026-02-05 18:09:50",
"链接": "https://techcrunch.com/2026/02/05/openai-launches-a-way-for-enterprises-to-build-and-manage-ai-agents/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic releases Opus 4.6 with new ‘agent teams’",
"内容": "The newest version of Anthropic's model is designed to broaden its capabilities and appeal, allowing for a greater variety of uses and customers.",
"日期": "2026-02-05 17:51:13",
"链接": "https://techcrunch.com/2026/02/05/anthropic-releases-opus-4-6-with-new-agent-teams/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Meta tests a stand-alone app for its AI-generated ‘Vibes’ videos",
"内容": "Launched last September, Vibes lets you create and share short-form AI-generated videos and access a dedicated feed that displays AI videos from others.",
"日期": "2026-02-05 17:19:01",
"链接": "https://techcrunch.com/2026/02/05/meta-tests-a-standalone-app-for-its-ai-generated-vibes-videos/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Fundamental raises $255M Series A with a new take on big data analysis",
"内容": "Fundamental has built a new foundation model to solve an old problem: how to draw insights from the huge quantities of structured data produced by enterprises.",
"日期": "2026-02-05 15:00:02",
"链接": "https://techcrunch.com/2026/02/05/fundamental-raises-255-million-series-a-with-a-new-take-on-big-data-analysis/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "ElevenLabs CEO: Voice is the next interface for AI",
"内容": "ElevenLabs CEO argued at Web Summit Qatar that voice is the next interface for AI, as OpenAI, Google, and Apple push conversational systems into wearables, new hardware, and everyday interactions.",
"日期": "2026-02-05 14:41:12",
"链接": "https://techcrunch.com/2026/02/05/elevenlabs-ceo-voice-is-the-next-interface-for-ai/",
"来源": "TechCrunch AI",
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
"标题": "‘Melania’: Watching a First Lady Vanish in Plain Sight",
"内容": "Glamour, silence and a very big hat.",
"日期": "2026-02-05 13:49:57",
"链接": "https://www.nytimes.com/2026/02/05/opinion/melania-film-review.html",
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
