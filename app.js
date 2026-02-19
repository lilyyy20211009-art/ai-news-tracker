// 筛选和渲染功能
const newsData = [
    {
"标题": "Google’s AI music maker is coming to the Gemini app",
"内容": "Google has given Gemini the ability to spit out AI-generated music, courtesy of DeepMind's latest audio model. Beta access to Lyria 3 is rolling out in the Gemini app, enabling users to generate 30-second tracks based on text, images, and videos, without having to leave the chatbot window. The new music-making tool is available globally [&#8230;]",
"日期": "2026-02-18 16:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/880584/google-gemini-ai-music-maker-lyria-3-beta",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI deepens India push with Pine Labs fintech partnership",
"内容": "OpenAI moves beyond ChatGPT in India with a Pine Labs deal targeting enterprise payments and AI-driven commerce.",
"日期": "2026-02-19 03:30:00",
"链接": "https://techcrunch.com/2026/02/18/openai-deepens-india-push-with-pine-labs-fintech-partnership/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Is your startup’s check engine light on? Google Cloud’s VP explains what to do",
"内容": "Startup founders are being pushed to move faster than ever, using AI while facing tighter funding, rising infrastructure costs, and more pressure to show real traction early. Cloud credits, access to GPUs, and foundation models have made it easier to get started, but those early infrastructure choices can have unforeseen consequences once startups move beyond [&#8230;]",
"日期": "2026-02-18 21:07:00",
"链接": "https://techcrunch.com/video/is-your-startups-check-engine-light-on-google-clouds-vp-explains-what-to-do/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google Cloud’s VP for startups on reading your ‘check engine light’ before it’s too late",
"内容": "Startup founders are being pushed to move faster than ever, using AI while facing tighter funding, rising infrastructure costs, and more pressure to show real traction early. Cloud credits, access to GPUs, and foundation models have made it easier to get started, but those early infrastructure choices can have unforeseen consequences once startups move beyond [&#8230;]",
"日期": "2026-02-18 20:22:29",
"链接": "https://techcrunch.com/podcast/google-clouds-vp-for-startups-on-reading-your-check-engine-light-before-its-too-late/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amazon halts Blue Jay robotics project after less than 6 months",
"内容": "Amazon said Blue Jay's core tech will be used for other robotics projects and the employees who worked on it were moved to other projects.",
"日期": "2026-02-18 18:27:10",
"链接": "https://techcrunch.com/2026/02/18/amazon-halts-blue-jay-robotics-project-after-less-than-six-months/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "World Labs lands $1B, with $200M from Autodesk, to bring world models into 3D workflows",
"内容": "The partnership will see the two companies exploring how World Labs’ models can work alongside Autodesk’s tools, and vice versa, starting with a focus on entertainment use cases.",
"日期": "2026-02-18 18:07:16",
"链接": "https://techcrunch.com/2026/02/18/world-labs-lands-200m-from-autodesk-to-bring-world-models-into-3d-workflows/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google adds music-generation capabilities to the Gemini app",
"内容": "Users will be able to use text, images, and videos as a reference to generate music.",
"日期": "2026-02-18 16:00:00",
"链接": "https://techcrunch.com/2026/02/18/google-adds-music-generation-capabilities-to-the-gemini-app/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Kana emerges from stealth with $15M to build flexible AI agents for marketers",
"内容": "Kana, a new AI marketing startup from the founders of Rapt and Krux, has raised $15 million to build customizable, agent-based marketing tools.",
"日期": "2026-02-18 15:08:40",
"链接": "https://techcrunch.com/2026/02/18/kana-emerges-from-stealth-with-15m-to-build-flexible-ai-agents-for-marketers/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Microsoft says Office bug exposed customers’ confidential emails to Copilot AI",
"内容": "Microsoft said the bug meant that its Copilot AI chatbot was reading and summarizing paying customers' confidential emails, bypassing data-protection policies.",
"日期": "2026-02-18 14:44:28",
"链接": "https://techcrunch.com/2026/02/18/microsoft-says-office-bug-exposed-customers-confidential-emails-to-copilot-ai/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI pushes into higher education as India seeks to scale AI skills",
"内容": "OpenAI says its India education partnerships aim to reach more than 100,000 students, faculty, and staff over the next year.",
"日期": "2026-02-18 14:32:42",
"链接": "https://techcrunch.com/2026/02/18/openai-pushes-into-higher-education-as-india-seeks-to-scale-ai-skills/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "India’s Sarvam wants to bring its AI models to feature phones, cars, and smart glasses",
"内容": "The company is using edge models that take up only megabytes of space, can run on most phones with existing processors, and can work offline.",
"日期": "2026-02-18 13:01:04",
"链接": "https://techcrunch.com/2026/02/18/indias-sarvam-wants-to-bring-its-ai-models-to-feature-phones-cars-and-smart-glasses/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Indian AI lab Sarvam’s new models are a major bet on the viability of open source AI",
"内容": "The new lineup includes 30-billion- and 105-billion-parameter models; a text-to-speech model; a speech-to-text model; and a vision model to parse documents.",
"日期": "2026-02-18 12:55:20",
"链接": "https://techcrunch.com/2026/02/18/indian-ai-lab-sarvams-new-models-are-a-major-bet-on-the-viability-of-open-source-ai/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Decoding the A.I. Beliefs of Anthropic and Its C.E.O., Dario Amodei",
"内容": "The company is at odds with the Pentagon over how its A.I. will be used. The conflict has its roots in the foundational plan for Anthropic.",
"日期": "2026-02-18 23:08:27",
"链接": "https://www.nytimes.com/2026/02/18/technology/anthropic-dario-amodei-effective-altruism.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Defense Department and Anthropic Square Off in Dispute Over A.I. Safety",
"内容": "How artificial intelligence will be used in future battlefields is an issue that has turned increasingly political and may put Anthropic in a bind.",
"日期": "2026-02-19 00:35:17",
"链接": "https://www.nytimes.com/2026/02/18/technology/defense-department-anthropic-ai-safety.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Inside the Birthplace of Your Favorite Technology",
"内容": "How Bell Labs shaped cellphones, satellites, video calls and A.I. technology.",
"日期": "2026-02-18 22:05:06",
"链接": "https://www.nytimes.com/interactive/2026/02/18/technology/bell-labs-history.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "What Do A.I. Chatbots Discuss Among Themselves? We Sent One to Find Out.",
"内容": "We interviewed our bot about what it learned on Moltbook, the A.I.-only social network.",
"日期": "2026-02-18 18:20:50",
"链接": "https://www.nytimes.com/2026/02/18/upshot/moltbook-artificial-intelligence-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Meta Begins $65 Million Election Push to Advance A.I. Agenda",
"内容": "Meta’s biggest election investment aims to prevent state legislation that it fears could inhibit artificial intelligence development. Its spending starts this week in Texas and Illinois.",
"日期": "2026-02-18 19:02:28",
"链接": "https://www.nytimes.com/2026/02/18/technology/meta-65-million-election-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Elon Musk’s xAI Gets $3 Billion Investment From Saudi-Backed A.I. Firm",
"内容": "Humain, which was created by Crown Prince Mohammed bin Salman last year, said it made the investment just before xAI was acquired by SpaceX, Mr. Musk’s rocket company.",
"日期": "2026-02-18 14:35:12",
"链接": "https://www.nytimes.com/2026/02/18/business/xai-humain-saudi-musk-spacex.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The A.I. Disruption Has Arrived, and It Sure Is Fun",
"内容": "We’re entering a new renaissance of software development. We should all be excited, despite the uncertainties that lie ahead.",
"日期": "2026-02-18 22:18:36",
"链接": "https://www.nytimes.com/2026/02/18/opinion/ai-software.html",
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
