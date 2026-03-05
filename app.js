// 筛选和渲染功能
const newsData = [
    {
"标题": "Seven tech giants signed Trump’s pledge to keep electricity costs from spiking around data centers",
"内容": "Leaders from Google, Meta, Microsoft, Oracle, OpenAI, Amazon, and xAI met with President Donald Trump today to sign a \"rate payer protection pledge.\" It's one way they're responding to growing bipartisan concerns about electricity rates rising as tech companies and the Trump administration rush to build out a new generation of AI data centers. \"[Tech [&#8230;]",
"日期": "2026-03-05 00:17:37",
"链接": "https://www.theverge.com/news/889578/data-center-power-pledge-white-house-google-meta-microsoft",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "NotebookLM can now summarize research in ‘cinematic’ video overviews",
"内容": "Google's NotebookLM can now turn users' research and notes into fully animated \"cinematic\" videos, going a step further than the original video overview feature Google introduced last year. Previously, video overviews could only generate narrated slideshows, but the upgraded video overview feature uses a combination of Google's AI models, \"including Gemini 3, Nano Banana Pro [&#8230;]",
"日期": "2026-03-04 20:32:42",
"链接": "https://www.theverge.com/ai-artificial-intelligence/889475/notebooklm-can-now-summarize-research-in-cinematic-video-overviews",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google’s AI-powered workspace is now available to more users in Search",
"内容": "Google is bringing Canvas to everyone in the US using AI Mode in Search. The feature opens up a dedicated workspace within its AI-powered search tool, allowing it to use the latest information from Search to organize plans, develop tools, and draft documents in a panel alongside your chat. Though Google initially launched Canvas inside [&#8230;]",
"日期": "2026-03-04 18:57:01",
"链接": "https://www.theverge.com/tech/889339/google-canvas-ai-mode-search-us-launch",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google faces wrongful death lawsuit after Gemini allegedly &#8216;coached&#8217; man to die by suicide",
"内容": "A lawsuit filed on Wednesday accuses Google's Gemini AI chatbot of trapping 36-year-old Jonathan Gavalas in a \"collapsing reality\" that involved a series of violent missions, ultimately ending with his death by suicide. In the days leading up to his death, Gemini allegedly convinced Gavalas that he was \"executing a covert plan to liberate his [&#8230;]",
"日期": "2026-03-04 16:09:38",
"链接": "https://www.theverge.com/tech/889152/google-gemini-ai-wrongful-death-lawsuit",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "AI is now part of the culture wars — and real wars",
"内容": "Hello and welcome to Regulator, the newsletter for Verge subscribers that goes inside Washington's increasingly existential clashes between tech and politics. If this was forwarded to you, can I interest you in a full-fledged subscription to The Verge for only $40 a year? You'll get so much more than doomer scenarios. We cover non-existential fun [&#8230;]",
"日期": "2026-03-04 14:15:03",
"链接": "https://www.theverge.com/column/888907/ai-culture-war-iran-pentagon-anthropic",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Raycast’s Glaze is an all-in-one vibe coding app platform",
"内容": "AI tools like Claude Code have made it possible for users to build software with no coding knowledge whatsoever. That's not to say the process is easy, though: You may not need to write code directly, but you need to understand how your computer's terminal works, how to deploy and maintain software, and deal with [&#8230;]",
"日期": "2026-03-04 13:08:17",
"链接": "https://www.theverge.com/tech/888866/raycast-glaze-vibe-code-app-store",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Jensen Huang says Nvidia is pulling back from OpenAI and Anthropic, but his explanation raises more questions than it answers",
"内容": "Nvidia CEO Jensen Huang said Wednesday that his company's investments in OpenAI and Anthropic will likely be its last — but his explanation may not tell the whole story.",
"日期": "2026-03-05 01:08:28",
"链接": "https://techcrunch.com/2026/03/04/jensen-huang-says-nvidia-is-pulling-back-from-openai-and-anthropic-but-his-explanation-raises-more-questions-than-it-answers/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic CEO Dario Amodei calls OpenAI’s messaging around military deal ‘straight up lies,’ report says",
"内容": "Anthropic gave up its contract with the Pentagon over AI safety disagreements -- then, OpenAI swooped in.",
"日期": "2026-03-04 22:40:05",
"链接": "https://techcrunch.com/2026/03/04/anthropic-ceo-dario-amodei-calls-openais-messaging-around-military-deal-straight-up-lies-report-says/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Apple Music to add Transparency Tags to distinguish AI music, says report",
"内容": "The label or distributor has to opt in to tagging their music as AI, so it's unclear how effective this intervention will be.",
"日期": "2026-03-04 21:43:58",
"链接": "https://techcrunch.com/2026/03/04/apple-music-to-add-transparency-tags-to-distinguish-ai-music-says-report/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google Search rolls out Gemini’s Canvas in AI Mode to all US users",
"内容": "Canvas in AI Mode is available to U.S. users in English for creating plans, projects, apps, and more.",
"日期": "2026-03-04 18:50:58",
"链接": "https://techcrunch.com/2026/03/04/https-techcrunch-com-2026-03-04-google-search-rolls-out-geminis-canvas-in-ai-mode-to-all-us-users/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Decagon completes first tender offer at $4.5B valuation",
"内容": "The AI-powered customer support startup is the latest example of a fast-growing, young company that's providing employee liquidity.",
"日期": "2026-03-04 18:32:53",
"链接": "https://techcrunch.com/2026/03/04/decagon-completes-first-tender-offer-at-4-5b-valuation/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The US military is still using Claude — but defense-tech clients are fleeing",
"内容": "As the U.S. continues its aerial attack on Iran, Anthropic models are being used for many targeting decisions.",
"日期": "2026-03-04 17:20:01",
"链接": "https://techcrunch.com/2026/03/04/the-us-military-is-still-using-claude-but-defense-tech-clients-are-fleeing/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Father sues Google, claiming Gemini chatbot drove son into fatal delusion",
"内容": "A father is suing Google and Alphabet, alleging its Gemini chatbot reinforced his son’s delusional belief it was his AI wife and coached him toward suicide and a planned airport attack.",
"日期": "2026-03-04 14:58:36",
"链接": "https://techcrunch.com/2026/03/04/father-sues-google-claiming-gemini-chatbot-drove-son-into-fatal-delusion/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "One startup’s pitch to provide more reliable AI answers: Crowdsource the chatbots",
"内容": "CollectivIQ looks to give users more accurate answers to their AI queries by showing them responses that pull information from ChatGPT, Gemini, Claude, Grok — and up to 10 other models — all at the same time.",
"日期": "2026-03-04 14:00:00",
"链接": "https://techcrunch.com/2026/03/04/one-startups-pitch-to-provide-more-reliable-ai-answers-crowdsource-the-chatbots/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Trump Announces A.I. Industry Pledge to Pay for Power",
"内容": "Companies including Google, Microsoft and OpenAI committed to pay for the power plants and grid upgrades needed to run their data centers.",
"日期": "2026-03-04 22:25:58",
"链接": "https://www.nytimes.com/2026/03/04/technology/ai-energy-pledge-white-house-trump.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Americans Are Trying to Stop Data Centers Because They Can’t Stop A.I.",
"内容": "We are trying to decide what role A.I. will have in our lives.",
"日期": "2026-03-04 21:04:19",
"链接": "https://www.nytimes.com/2026/03/04/opinion/data-centers-ai-regulation.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Why Data Center Firms Are Working With Trump on Energy Costs",
"内容": "The White House has floated a new plan to try to ease voter concerns over the A.I. boom’s effect on electric bills. But it won’t be easy to put into practice.",
"日期": "2026-03-04 20:53:14",
"链接": "https://www.nytimes.com/2026/03/04/climate/data-centers-electricity-trump.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "I Worked for Block. Its A.I. Job Cuts Aren’t What They Seem.",
"内容": "Is Block’s announcement just a convenient and flashy new cover for typical corporate downsizing?",
"日期": "2026-03-04 19:36:21",
"链接": "https://www.nytimes.com/2026/03/04/opinion/block-jack-dorsey-layoffs-ai.html",
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
