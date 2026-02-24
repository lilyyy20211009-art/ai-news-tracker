// 筛选和渲染功能
const newsData = [
    {
"标题": "Anthropic accuses DeepSeek and other Chinese firms of using Claude to train their AI",
"内容": "Anthropic claims DeepSeek and two other Chinese AI companies misused its Claude AI model in an attempt to improve their own products. In an announcement on Monday, Anthropic says the \"industrial-scale campaigns\" involved the creation of around 24,000 fraudulent accounts and more than 16 million exchanges with Claude, as reported earlier by The Wall Street [&#8230;]",
"日期": "2026-02-23 20:22:55",
"链接": "https://www.theverge.com/ai-artificial-intelligence/883243/anthropic-claude-deepseek-china-ai-distillation",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Does Big Tech actually care about fighting AI slop?",
"内容": "As 2025 drew to a close, Instagram head Adam Mosseri ended the year by doom-posting about AI. \"Authenticity is becoming infinitely reproducible,\" Mosseri lamented. \"Everything that made creators matter - the ability to be real, to connect, to have a voice that couldn't be faked - is now accessible to anyone with the right tools.\" [&#8230;]",
"日期": "2026-02-23 16:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/882956/ai-deepfake-detection-labels-c2pa-instagram-youtube",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A Meta AI security researcher said an OpenClaw agent ran amok on her inbox",
"内容": "The viral X post from an AI security researcher reads like satire. But it's really a word of warning about what can go wrong when handing tasks to an AI agent.",
"日期": "2026-02-24 00:57:14",
"链接": "https://techcrunch.com/2026/02/23/a-meta-ai-security-researcher-said-an-openclaw-agent-ran-amok-on-her-inbox/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "With AI, investor loyalty is (almost) dead: At least a dozen OpenAI VCs now also back Anthropic",
"内容": "While some dual investors are understandable, others were more shocking, and signal the disregard of a longstanding ethical conflict-of-interest rule.",
"日期": "2026-02-23 21:46:41",
"链接": "https://techcrunch.com/2026/02/23/with-ai-investor-loyalty-is-almost-dead-at-least-a-dozen-openai-vcs-now-also-back-anthropic/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic accuses Chinese AI labs of mining Claude as US debates AI chip exports",
"内容": "Anthropic accuses DeepSeek, Moonshot, and MiniMax of using 24,000 fake accounts to distill Claude’s AI capabilities, as U.S. officials debate export controls aimed at slowing China’s AI progress.",
"日期": "2026-02-23 19:57:27",
"链接": "https://techcrunch.com/2026/02/23/anthropic-accuses-chinese-ai-labs-of-mining-claude-as-us-debates-ai-chip-exports/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google’s Cloud AI leads on the three frontiers of model capability",
"内容": "AI models are pushing against three frontiers at once: raw intelligence, response time, and a third quality you might call \"extensibility.\"",
"日期": "2026-02-23 19:18:42",
"链接": "https://techcrunch.com/2026/02/23/googles-cloud-ai-lead-on-the-three-frontiers-of-model-capability/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI calls in the consultants for its enterprise push",
"内容": "OpenAI is partnering with four consulting giants in an effort to see more adoption of its OpenAI Frontier AI agent platform.",
"日期": "2026-02-23 18:11:08",
"链接": "https://techcrunch.com/2026/02/23/openai-calls-in-the-consultants-for-its-enterprise-push/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Guide Labs debuts a new kind of interpretable LLM",
"内容": "The company open sourced an 8-billion-parameter LLM, Steerling-8B, trained with a new architecture designed to make its actions easily interpretable.",
"日期": "2026-02-23 17:53:28",
"链接": "https://techcrunch.com/2026/02/23/guide-labs-debuts-a-new-kind-of-interpretable-llm/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Particle’s AI news app listens to podcasts for interesting clips so you you don’t have to",
"内容": "AI news app Particle can now pull in key moments from podcasts, letting readers instantly play short, relevant clips alongside related stories.",
"日期": "2026-02-23 16:55:40",
"链接": "https://techcrunch.com/2026/02/23/particles-ai-news-app-listens-to-podcasts-for-interesting-clips-so-you-you-dont-have-to/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Spotify rolls out AI-powered  Prompted Playlists to the UK and other markets",
"内容": "Spotify continues to test its AI-powered “Prompted Playlist” feature, now rolling out the tool to Premium subscribers in the U.K., Ireland, Australia, and Sweden.",
"日期": "2026-02-23 16:50:36",
"链接": "https://techcrunch.com/2026/02/23/spotify-ai-prompted-playlists-uk-markets/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "5 days left to lock in the lowest TechCrunch Disrupt 2026 ticket rates",
"内容": "Five days to save up to $680 on your TechCrunch Disrupt 2026 ticket. These lowest rates of the year disappear on February 27 at 11:59 p.m. PT.",
"日期": "2026-02-23 15:00:00",
"链接": "https://techcrunch.com/2026/02/23/5-days-left-to-lock-in-the-lowest-techcrunch-disrupt-2026-ticket-rates/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How AI agents could destroy the economy",
"内容": "Citrini Research imagines a report from two years in the future, in which unemployment has doubled and the total value of the stock market has fallen by more than a third.",
"日期": "2026-02-23 14:44:03",
"链接": "https://techcrunch.com/2026/02/23/how-ai-agents-could-destroy-the-economy/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Defense Secretary summons Anthropic’s Amodei over military use of Claude",
"内容": "Defense Secretary Pete Hegseth has summoned Anthropic CEO Dario Amodei to the Pentagon for a tense discussion over the military's use of Claude. Hegseth has threatened to designate Anthropic a \"supply chain risk.\"",
"日期": "2026-02-23 14:19:10",
"链接": "https://techcrunch.com/2026/02/23/defense-secretary-summons-anthropics-amodei-over-military-use-of-claude/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The Newest Player in A.I.’s Supply Chain Is a Toilet Maker",
"内容": "A British investor urged the Japanese company Toto to produce its advanced ceramics not for toilet seats and bidets, but for A.I. semiconductors.",
"日期": "2026-02-24 01:25:22",
"链接": "https://www.nytimes.com/video/podcasts/100000010732602/the-newest-player-in-ais-supply-chain-is-a-toilet-maker.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "New York Democrats Have a Chance to Vote Against the A.I. Oligarchs",
"内容": "There’s a huge political opportunity for the party that can stand up for human beings in the face of A.I.",
"日期": "2026-02-24 01:50:08",
"链接": "https://www.nytimes.com/2026/02/23/opinion/alex-bores-ai-democrats.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Is A.I. Changing the Way You Teach Writing? Tell Us.",
"内容": "We want to hear from high school teachers and college professors who assign writing.",
"日期": "2026-02-23 22:56:42",
"链接": "https://www.nytimes.com/2026/02/23/us/ai-writing-assignments-classrooms-callout.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Canada to Probe What OpenAI Knew About Tumbler Ridge Shooter",
"内容": "The company suspended the killer’s ChatGPT account over a policy violation in June, eight months before the attacks in Tumbler Ridge, British Columbia.",
"日期": "2026-02-23 23:12:16",
"链接": "https://www.nytimes.com/2026/02/23/world/canada/canada-shooting-openai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic Accuses 3 Chinese Companies of Harvesting Its Data",
"内容": "The San Francisco start-up claimed that DeepSeek, Moonshot and MiniMax used approximately 24,000 fraudulent accounts to train their own chatbots.",
"日期": "2026-02-23 22:31:54",
"链接": "https://www.nytimes.com/2026/02/23/technology/anthropic-chinese-startups-distillation.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Pentagon Summons Anthropic Chief in Dispute Over A.I. Limits",
"内容": "The artificial intelligence company has demanded that some guardrails be put in place as it negotiates a contract with the Defense Department.",
"日期": "2026-02-23 22:47:23",
"链接": "https://www.nytimes.com/2026/02/23/us/politics/pentagon-anthropic-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The Pentagon vs. Anthropic",
"内容": "This week on Hard Fork from the New York Times, hosts Casey Newton and Kevin Roose discuss the dispute between the U.S. Government and the A.I. company Anthropic that became public this past week.",
"日期": "2026-02-23 20:20:25",
"链接": "https://www.nytimes.com/video/podcasts/100000010731276/the-pentagon-vs-anthropic.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Backed by Anthropic, a Super PAC Group Begins an Ad Blitz in Support of A.I. Regulation",
"内容": "The ads by Public First Action, which started airing on Monday, are part of an escalating political war over artificial intelligence before the midterm elections.",
"日期": "2026-02-23 18:29:50",
"链接": "https://www.nytimes.com/2026/02/23/technology/ai-pac-ad-blitz.html",
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
