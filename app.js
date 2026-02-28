// 筛选和渲染功能
const newsData = [
    {
"标题": "Defense secretary Pete Hegseth designates Anthropic a supply chain risk",
"内容": "Nearly two hours after President Donald Trump announced on Truth Social that he was banning Anthropic products from the federal government, Secretary of Defense Pete Hegseth took it one step further and announced that he was now designating the AI company as a \"supply-chain risk,\" which Anthropic says it is willing to challenge in court. [&#8230;]",
"日期": "2026-02-28 02:19:16",
"链接": "https://www.theverge.com/policy/886632/pentagon-designates-anthropic-supply-chain-risk-ai-standoff",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Trump orders federal agencies to drop Anthropic’s AI",
"内容": "On Friday afternoon, Donald Trump posted on Truth Social, accusing Anthropic, the AI company behind Claude, of attempting to \"STRONG-ARM\" the Pentagon and directing federal agencies to \"IMMEDIATELY CEASE\" use of its products. At issue is Anthropic CEO Dario Amodei's refusal of an updated agreement with the US military agreeing to \"any lawful use\" of [&#8230;]",
"日期": "2026-02-27 21:30:47",
"链接": "https://www.theverge.com/policy/886489/pentagon-anthropic-trump-dod",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "AI vs. the Pentagon: killer robots, mass surveillance, and red lines",
"内容": "Can AI firms set limits on how and where the military uses their models? Anthropic is in heated negotiations with the Pentagon after refusing to comply with new military contract terms that would require it to loosen the guardrails on its AI models, allowing for “any lawful use,” even mass surveillance of Americans and fully [&#8230;]",
"日期": "2026-02-27 17:16:53",
"链接": "https://www.theverge.com/ai-artificial-intelligence/886082/ai-vs-the-pentagon-killer-robots-mass-surveillance-and-red-lines",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "We don&#8217;t have to have unsupervised killer robots",
"内容": "It's the day of the Pentagon's looming ultimatum for Anthropic: allow the US military unchecked access to its technology, including for mass surveillance and fully autonomous lethal weapons, or potentially be designated a \"supply chain risk\" and potentially lose hundreds of billions of dollars in contracts. Amid the intensifying public statements and threats, tech workers [&#8230;]",
"日期": "2026-02-27 16:18:26",
"链接": "https://www.theverge.com/ai-artificial-intelligence/885963/anthropic-dod-pentagon-tech-workers-ai-labs-react",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The Galaxy S26 is a photography nightmare",
"内容": "In many ways, Samsung's new phones are fairly normal upgrades. The S26 lines come with some useful new things - particularly the Privacy Display on the S26 Ultra, which looks like an extremely cool bit of tech and a really useful new feature - and a lot of iterative year-over-year changes. The new camera features, [&#8230;]",
"日期": "2026-02-27 15:15:52",
"链接": "https://www.theverge.com/podcast/885942/samsung-galaxy-s26-ai-camera-nightmare-vergecast",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI snags $110 billion in investments from Amazon, Nvidia, and Softbank",
"内容": "OpenAI has closed another round of funding, totalling $110 billion being newly committed to the maker of ChatGPT, which it says has more than 900 million weekly active users and over 50 million consumer subscribers. Amazon is investing $50 billion and striking a deal that includes plans for custom models and more. Nvidia and SoftBank [&#8230;]",
"日期": "2026-02-27 14:55:16",
"链接": "https://www.theverge.com/ai-artificial-intelligence/885958/openai-amazon-nvidia-softback-110-billion-investment",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Pentagon moves to designate Anthropic as a supply-chain risk",
"内容": "\"We don't need it, we don't want it, and will not do business with them again,\" the president wrote in the post.",
"日期": "2026-02-27 21:53:14",
"链接": "https://techcrunch.com/2026/02/27/pentagon-moves-to-designate-anthropic-as-a-supply-chain-risk/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Musk bashes OpenAI in deposition, saying ‘nobody committed suicide because of Grok’",
"内容": "In his lawsuit against OpenAI, Musk touted xAI safety compared with ChatGPT. A few months later, xAI's Grok flooded X with nonconsensual nude images.",
"日期": "2026-02-27 19:42:00",
"链接": "https://techcrunch.com/2026/02/27/musk-bashes-openai-in-deposition-saying-nobody-committed-suicide-because-of-grok/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic vs. the Pentagon: What’s actually at stake?",
"内容": "Anthropic and the Pentagon are clashing over AI use in autonomous weapons and surveillance, raising high-stakes questions about national security, corporate control, and who sets the rules for military AI.",
"日期": "2026-02-27 19:11:04",
"链接": "https://techcrunch.com/2026/02/27/anthropic-vs-the-pentagon-whats-actually-at-stake/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "ChatGPT reaches 900M weekly active users",
"内容": "OpenAI shared the new numbers as part of its announcement that it has raised $110 billion in private funding.",
"日期": "2026-02-27 18:25:51",
"链接": "https://techcrunch.com/2026/02/27/chatgpt-reaches-900m-weekly-active-users/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Who’s really running AI? Inside the billion-dollar battle over regulation with Alex Bores",
"内容": "The&#160;Pentagon is&#160;playing chicken with Anthropic&#160;over&#160;who gets to control&#160;how the&#160;military uses AI&#160;while communities across the country are&#160;blocking data center construction. As the AI debate has been flattened to “doomers&#160;versus boomers,” one state legislator is&#160;attempting&#160;to walk a middle road.&#160; On this episode of TechCrunch&#8217;s&#160;Equity&#160;podcast, Rebecca Bellan sits down with Alex Bores,&#160;a&#160;New&#160;York&#160;State&#160;Assemblymember and&#160;candidate for U.S. Congress. Bores&#160;sponsored&#160;New York&#8217;s [&#8230;]",
"日期": "2026-02-27 17:35:50",
"链接": "https://techcrunch.com/podcast/whos-really-running-ai-inside-the-billion-dollar-battle-over-regulation-with-alex-bores/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "AI music generator Suno hits 2M paid subscribers and $300M in annual recurring revenue",
"内容": "Suno lets users create music using natural language prompts, making it possible for people with little experience to generate audio with little effort.",
"日期": "2026-02-27 17:22:02",
"链接": "https://techcrunch.com/2026/02/27/ai-music-generator-suno-hits-2-million-paid-subscribers-and-300m-in-annual-recurring-revenue/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Perplexity’s new Computer is another bet that users need many AI models",
"内容": "Perplexity Computer, in the company’s words, \"unifies every current AI capability into a single system.\"",
"日期": "2026-02-27 17:00:55",
"链接": "https://techcrunch.com/2026/02/27/perplexitys-new-computer-is-another-bet-that-users-need-many-ai-models/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Employees at Google and OpenAI support Anthropic’s Pentagon stand in open letter",
"内容": "While Anthropic has an existing partnership with the Pentagon, the AI company has remained firm that its technology not be used for mass domestic surveillance or fully autonomous weaponry.",
"日期": "2026-02-27 16:23:58",
"链接": "https://techcrunch.com/2026/02/27/employees-at-google-and-openai-support-anthropics-pentagon-stand-in-open-letter/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Last 24 hours to get TechCrunch Disrupt 2026 tickets at the lowest rates of the year",
"内容": "The lowest rates of the year for TechCrunch Disrupt 2026 end after today. Prices go up at 11:59 p.m. PT. Don't miss connecting with 10,000 founders, investors, and operators, and key takeaways from 250+ industry leaders. Register now to save up to $680, or up to 30% on group passes.",
"日期": "2026-02-27 15:00:00",
"链接": "https://techcrunch.com/2026/02/27/last-24-hours-to-get-techcrunch-disrupt-2026-tickets-at-the-lowest-rates-of-the-year/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI raises $110B in one of the largest private funding rounds in history",
"内容": "The new funding consists of a $50 billion investment from Amazon as well as $30 billion each from Nvidia and SoftBank, against a $730 billion valuation.",
"日期": "2026-02-27 14:13:01",
"链接": "https://techcrunch.com/2026/02/27/openai-raises-110b-in-one-of-the-largest-private-funding-rounds-in-history/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI Reaches A.I. Agreement With Defense Dept. After Anthropic Clash",
"内容": "The deal came hours after President Trump had ordered federal agencies to stop using artificial intelligence technology made by Anthropic, an OpenAI rival.",
"日期": "2026-02-28 03:49:20",
"链接": "https://www.nytimes.com/2026/02/27/technology/openai-reaches-ai-agreement-with-defense-dept-after-anthropic-clash.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Silicon Valley Rallies Behind Anthropic in A.I. Clash With Trump",
"内容": "Actions by the president and the Pentagon appeared to drive a wedge between Washington and the tech industry, whose leaders and workers spoke out for the start-up.",
"日期": "2026-02-28 04:15:35",
"链接": "https://www.nytimes.com/2026/02/27/technology/anthropic-trump-pentagon-silicon-valley.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Pentagon-Anthropic Standoff Is a Decisive Moment for How A.I. Will Be Used in War",
"内容": "The Pentagon’s contract dispute with Anthropic is part of a wider clash about the use of artificial intelligence for national security and who decides on any safeguards.",
"日期": "2026-02-27 21:06:42",
"链接": "https://www.nytimes.com/2026/02/27/technology/defense-department-anthropic-ai-safety.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Trump Orders U.S. Agencies to Stop Using Anthropic AI Tech After Pentagon Standoff",
"内容": "The company had clashed with the military over how officials wanted to use its cutting-edge A.I. model. The order could vastly complicate intelligence analysis and defense work.",
"日期": "2026-02-28 03:52:12",
"链接": "https://www.nytimes.com/2026/02/27/us/politics/anthropic-military-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI Raises $110 Billion Led by Amazon, Nvidia and SoftBank, Extending A.I. Boom",
"内容": "Amazon, Nvidia and SoftBank led the investment, valuing the parent of ChatGPT at $730 billion.",
"日期": "2026-02-27 19:08:19",
"链接": "https://www.nytimes.com/2026/02/27/business/openai-funding.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "What Both Anthropic and the Pentagon Get Wrong",
"内容": "Neither Anthropic nor the Pentagon is thinking about this issue in a meaningful way.",
"日期": "2026-02-27 14:27:07",
"链接": "https://www.nytimes.com/2026/02/27/opinion/anthropic-pentagon-ai-defense.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How the S&P 500 Stock Index Became So Skewed to Tech and A.I.",
"内容": "The shifting composition of big public companies in the stock index shows how lopsided and less dynamic the American economy has become.",
"日期": "2026-02-27 16:15:07",
"链接": "https://www.nytimes.com/interactive/2026/02/26/business/stock-market-sp-500-nvidia-tech-bubble-crises.html",
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
