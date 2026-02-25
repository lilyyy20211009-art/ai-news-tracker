// 筛选和渲染功能
const newsData = [
    {
"标题": "Pete Hegseth’s Pentagon AI bro squad includes a former Uber executive and a private equity billionaire",
"内容": "Hello and welcome to Regulator, a newsletter for Verge subscribers covering the broligarchs, the influencers, and the (potentially conscious) artificial intelligence models scrambling for power in Washington. If you're not a subscriber yet, assert your humanity against the will of the machines by signing up here. Very important news: Do you want to tell me [&#8230;]",
"日期": "2026-02-25 01:59:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/884165/pentagon-anthropic-emil-michael-steve-feinberg",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI defeats xAI’s trade secrets lawsuit",
"内容": "OpenAI won a victory Tuesday in one of its legal battles with xAI, which involved allegations of poaching and theft of trade secrets. The former company's motion to dismiss the lawsuit was granted on Tuesday with leave to amend, meaning xAI has the option to refile with modified claims. In the ruling, US District Judge [&#8230;]",
"日期": "2026-02-24 23:05:28",
"链接": "https://www.theverge.com/ai-artificial-intelligence/884049/openai-elon-musk-xai-trade-secrets-lawsuit",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "India’s AI boom pushes firms to trade near-term revenue for users",
"内容": "ChatGPT and rivals are testing whether India's massive AI user boom can translate into paying customers as free offers wind down.",
"日期": "2026-02-25 02:00:00",
"链接": "https://techcrunch.com/2026/02/24/india-ai-boom-pushes-firms-to-trade-near-term-revenue-for-users/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Nvidia challenger AI chip startup MatX raised $500M",
"内容": "The startup was founded by former Google TPU engineers in 2023.",
"日期": "2026-02-25 00:45:47",
"链接": "https://techcrunch.com/2026/02/24/nvidia-challenger-ai-chip-startup-matx-raised-500m/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Spanish ‘soonicorn’ Multiverse Computing releases free compressed AI model",
"内容": "Spanish startup Multiverse Computing has released a new version of its HyperNova 60B model on Hugging Face that, it says, bests Mistral's model.",
"日期": "2026-02-24 23:32:00",
"链接": "https://techcrunch.com/2026/02/24/spanish-soonicorn-multiverse-computing-releases-free-compressed-ai-model/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Uber engineers built an AI version of their boss",
"内容": "Uber CEO Dara Khosrowshahi said the company’s employees have gone all in on AI, going so far as to build a chatbot of him that they use to practice their pitches.",
"日期": "2026-02-24 23:09:28",
"链接": "https://techcrunch.com/2026/02/24/uber-engineers-built-ai-version-of-boss-dara-khosrowshahi/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic won’t budge as Pentagon escalates AI dispute",
"内容": "The Pentagon has given Anthropic until Friday to loosen AI guardrails or face potential penalties, escalating a high-stakes dispute that raises questions about government leverage, vendor dependence, and investor confidence in defense tech.",
"日期": "2026-02-24 21:18:45",
"链接": "https://techcrunch.com/2026/02/24/anthropic-wont-budge-as-pentagon-escalates-ai-dispute/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Can A.I. Detection Tools Really Spot Fake Images and Videos?",
"内容": "Artificial intelligence detectors are increasingly used to check the veracity of content online. We ran more than 1,000 tests and found several strengths and plenty of weaknesses.",
"日期": "2026-02-25 10:00:09",
"链接": "https://www.nytimes.com/2026/02/25/technology/ai-detection-generated-photos-video.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Pentagon Gives Anthropic an Ultimatum Over the Company’s A.I. Model",
"内容": "Anthropic insists on limits on how its technology is used and could be labeled a supply chain risk if it fails to accept the military’s demands.",
"日期": "2026-02-25 03:08:07",
"链接": "https://www.nytimes.com/2026/02/24/us/politics/pentagon-anthropic.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Bleak Research Report Stokes A.I. Debate on Wall St.",
"内容": "In a widely circulated note, Citrini Research painted a dire picture of job losses and stock market sell-offs, though many analysts and economists questioned its conclusions.",
"日期": "2026-02-25 10:04:09",
"链接": "https://www.nytimes.com/2026/02/25/business/citrini-ai-stock-market.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The Race to Dominate A.I. Is Brutally Competitive. That’s Good for Everyone.",
"内容": "The future of the field is still up for grabs.",
"日期": "2026-02-25 10:02:25",
"链接": "https://www.nytimes.com/2026/02/25/opinion/ai-industry-competition-innovation.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Wayve, an A.I. Driverless Car Start-Up in Europe, Raises $1.2 Billion",
"内容": "The London-based company is building a system that uses artificial intelligence to power autonomous vehicles.",
"日期": "2026-02-25 00:01:05",
"链接": "https://www.nytimes.com/2026/02/24/technology/wayve-ai-driverless-car-start-up.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amid Chaos in Mexico, False Images Stoked Fears",
"内容": "Online disinformation proliferated rapidly after the Mexican military killed the country’s top cartel leader, fueling fear and chaos among residents and tourists alike. Mexican officials say some A.I.-generated images and fake news reports may have been linked to criminal actors.",
"日期": "2026-02-24 22:12:26",
"链接": "https://www.nytimes.com/video/world/americas/100000010731496/mexico-cartels-el-mencho-disinformation.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Do A.I. Agents Actually Make You More Productive?",
"内容": "Can A.I. be useful while still allowing us to use our minds creatively? On this week’s episode of “The Ezra Klein Show,” the Anthropic co-founder Jack Clark shares his perspective.",
"日期": "2026-02-24 22:08:21",
"链接": "https://www.nytimes.com/video/opinion/100000010732755/do-ai-agents-actually-make-you-more-productive.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. Agents: They’re Just Like Us",
"内容": "What does it mean that A.I. systems like Claude seem, like many humans, to dislike violence and love cute animals? Ezra asks the Anthropic co-founder Jack Clark this week on “The Ezra Klein Show.”",
"日期": "2026-02-24 21:42:05",
"链接": "https://www.nytimes.com/video/opinion/100000010725778/ai-agents-theyre-just-like-us.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How Fast Will A.I. Agents Rip Through the Economy?",
"内容": "The Anthropic co-founder Jack Clark tells Ezra Klein what he sees coming in the new era of A.I. agents.",
"日期": "2026-02-25 07:28:21",
"链接": "https://www.nytimes.com/2026/02/24/opinion/ezra-klein-podcast-jack-clark.html",
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
