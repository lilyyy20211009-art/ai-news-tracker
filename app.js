// 筛选和渲染功能
const newsData = [
    {
"标题": "Anthropic refuses Pentagon’s new terms, standing firm on lethal autonomous weapons and mass surveillance",
"内容": "Less than 24 hours before the deadline in an ultimatum issued by the Pentagon, Anthropic has refused the Department of Defense's demands for unrestricted access to its AI. It's the culmination of a dramatic exchange of public statements, social media posts, and behind-the-scenes negotiations, coming down to Defense Secretary Pete Hegseth's desire to renegotiate all [&#8230;]",
"日期": "2026-02-26 23:22:44",
"链接": "https://www.theverge.com/news/885773/anthropic-department-of-defense-dod-pentagon-refusal-terms-hegseth-dario-amodei",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Microsoft&#8217;s Copilot Tasks AI uses its own computer to get things done",
"内容": "Microsoft is previewing a new AI system, Copilot Tasks, that it says is designed to take care of busywork for you in the background, the company announced on Thursday. The feature takes the load off your device using its own cloud-based computer and browser, allowing it to handle a variety of jobs ranging from scheduling [&#8230;]",
"日期": "2026-02-26 22:56:09",
"链接": "https://www.theverge.com/tech/885741/microsoft-copilot-tasks-ai",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Jack Dorsey’s Block cuts nearly half of its staff in AI gamble",
"内容": "Jack Dorsey's Block, the financial tech company that runs Square and the Cash app, is cutting its workforce by \"nearly half\" and axing more than 4,000 jobs. The company will shrink from more than 10,000 people to less than 6,000, Dorsey says in a post on X. And the reason why? AI. \"We're not making [&#8230;]",
"日期": "2026-02-26 22:11:13",
"链接": "https://www.theverge.com/tech/885710/jack-dorsey-block-layoffs-job-cuts-ai",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google’s Nano Banana 2 brings advanced AI image tools to free users",
"内容": "Google is bringing a more powerful version of its Nano Banana AI image model to free users. Nano Banana 2 (also known as Gemini 3.1 Flash Image) is rolling out today across the Gemini app and other Google AI platforms, making knowledge and rendering features that were previously exclusive to Nano Banana Pro available for [&#8230;]",
"日期": "2026-02-26 16:00:00",
"链接": "https://www.theverge.com/tech/885275/google-nano-banana-2-ai-image-model-gemini-launch",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic gives its retired Claude AI a Substack",
"内容": "In January, Anthropic \"retired\" Claude 3 Opus, which at one time was the company's most powerful AI model. Today, it's back - and writing on Substack. The newsletter, called Claude's Corner, will give Opus 3 space to publish its \"musings, insights, or creative works,\" Anthropic said in a blog post. The model will post weekly [&#8230;]",
"日期": "2026-02-26 14:21:05",
"链接": "https://www.theverge.com/ai-artificial-intelligence/885200/anthropic-retired-claude-given-a-substack",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Burger King will use AI to check if employees say ‘please’ and ‘thank you’",
"内容": "Burger King is launching an AI chatbot that will live in the headsets used by employees. The voice-enabled chatbot, called \"Patty,\" is part of an overarching BK Assistant platform that will not only assist employees with meal preparation but also evaluate their interactions with customers for \"friendliness.\" Thibault Roux, Burger King's chief digital officer, tells [&#8230;]",
"日期": "2026-02-26 13:00:00",
"链接": "https://www.theverge.com/ai-artificial-intelligence/884911/burger-king-ai-assistant-patty",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Jack Dorsey just halved the size of Block’s employee base — and he says your company is next",
"内容": "Jack Dorsey has long been an open admirer of Elon Musk. Now, it seems, he may have been taking notes.",
"日期": "2026-02-26 23:43:32",
"链接": "https://techcrunch.com/2026/02/26/jack-dorsey-block-layoffs-4000-halved-employees-your-company-is-next/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic CEO stands firm as Pentagon deadline looms",
"内容": "Anthropic CEO Dario Amodei said Thursday that he \"cannot in good conscience accede\" to the Pentagon's demands to give the military unrestricted access to its AI systems.",
"日期": "2026-02-26 23:19:06",
"链接": "https://techcrunch.com/2026/02/26/anthropic-ceo-stands-firm-as-pentagon-deadline-looms/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "So, we’re getting Prada Meta AI glasses, right?",
"内容": "Mark Zuckerberg was at Prada's fashion week event in Milan, leaving everyone to wonder if we're getting Meta AI glasses under the Prada brand.",
"日期": "2026-02-26 20:11:55",
"链接": "https://techcrunch.com/2026/02/26/so-were-getting-prada-meta-ai-glasses-right/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Sophia Space raises $10M seed to demo novel space computers",
"内容": "The company's modular computer tiles offer a new vision for space data centers.",
"日期": "2026-02-26 19:55:20",
"链接": "https://techcrunch.com/2026/02/26/sophia-space-raises-10m-seed-to-demo-novel-space-computers/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Mistral AI inks a deal with global consulting giant Accenture",
"内容": "Mistral AI lands a partnership with Accenture, the consultant that has also recently announced partnerships with rivals OpenAI and Anthropic.",
"日期": "2026-02-26 19:17:27",
"链接": "https://techcrunch.com/2026/02/26/mistral-ai-inks-a-deal-with-global-consulting-giant-accenture/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Read AI launches an email-based ‘digital twin’ to help you with schedules and answers",
"内容": "Read AI is launching Ada, which can reply with your availability and extract answers from the company knowledge base and the web.",
"日期": "2026-02-26 17:00:00",
"链接": "https://techcrunch.com/2026/02/26/read-ai-launches-an-email-based-digital-twin-to-help-you-with-schedules-and-answers/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Bumble adds AI-powered photo feedback and profile guidance tools",
"内容": "Bumble and other popular dating apps, like Match Group's Tinder and Hinge, have all embraced AI-powered features.",
"日期": "2026-02-26 16:38:59",
"链接": "https://techcrunch.com/2026/02/26/bumble-adds-ai-powered-photo-feedback-and-profile-guidance-tools/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google launches Nano Banana 2 model with faster image generation",
"内容": "Google is making Nano Banana 2 a default model in Gemini app and in AI mode.",
"日期": "2026-02-26 16:00:00",
"链接": "https://techcrunch.com/2026/02/26/google-launches-nano-banana-2-model-with-faster-image-generation/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "2 days left: Lock in the best discounts for TechCrunch Disrupt 2026",
"内容": "Register now to secure discounts of up to $680 on your TechCrunch Disrupt 2026 pass. Offer ends tomorrow, February 27, at 11:59 p.m. PT.",
"日期": "2026-02-26 15:00:00",
"链接": "https://techcrunch.com/2026/02/26/2-days-left-lock-in-the-best-discounts-for-techcrunch-disrupt-2026/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Exhibit in Boston’s startup ecosystem at TechCrunch Founder Summit 2026",
"内容": "On June 9, over 1,000 founders, investors, and decision-makers will gather for TechCrunch Founder Summit 2026. This isn’t just foot traffic. It’s a full day of concentrated deal flow.",
"日期": "2026-02-26 14:00:00",
"链接": "https://techcrunch.com/2026/02/26/exhibit-in-bostons-startup-ecosystem-at-techcrunch-founder-summit-2026/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Figma partners with OpenAI to bake in support for Codex",
"内容": "Figma is integrating OpenAI's coding assistant Codex a week after it announced a similar integration with Anthropic's Claude Code.",
"日期": "2026-02-26 14:00:00",
"链接": "https://techcrunch.com/2026/02/26/figma-partners-with-openai-to-bake-in-support-for-codex/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Trace raises $3M to solve the AI agent adoption problem in enterprise",
"内容": "Trace is launching with $3 million in seed funding, including investment from Y Combinator, Zeno Ventures, Transpose Platform Management, Goodwater Capital, Formosa Capital, and WeFunder.",
"日期": "2026-02-26 14:00:00",
"链接": "https://techcrunch.com/2026/02/26/trace-raises-3-million-to-solve-the-agent-adoption-problem/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How A.I.-Generated Videos Are Distorting Your Child’s YouTube Feed",
"内容": "Experts caution that low-quality, A.I.-generated videos on YouTube geared toward children often feature conflicting information, lack plot structure and can be cognitively overwhelming — all of which could affect young children’s development.",
"日期": "2026-02-26 17:34:35",
"链接": "https://www.nytimes.com/2026/02/26/us/ai-videos-children-youtube.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. Dating Apps Complicate China’s Efforts to Boost Birthrate",
"内容": "As China grapples with a shrinking population and historically low birthrate, people are finding romance with chatbots instead.",
"日期": "2026-02-26 12:58:41",
"链接": "https://www.nytimes.com/2026/02/26/technology/china-ai-dating-apps.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How the S&P 500 Stock Index Became So Skewed to Tech and A.I.",
"内容": "The shifting composition of big public companies in the stock index shows how lopsided and less dynamic the American economy has become.",
"日期": "2026-02-27 03:58:43",
"链接": "https://www.nytimes.com/interactive/2026/02/26/business/stock-market-sp-500-nvidia-tech-bubble-crises.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google Workers Seek ‘Red Lines’ on Military A.I., Echoing Anthropic",
"内容": "More than 100 Google A.I. employees sent a letter to Jeff Dean, a chief scientist, opposing Gemini’s use for U.S. surveillance and some autonomous weapons.",
"日期": "2026-02-27 02:53:19",
"链接": "https://www.nytimes.com/2026/02/26/technology/google-deepmind-letter-pentagon.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Block Cuts 40% of Its Work Force Because of Its Embrace of A.I.",
"内容": "About 4,000 workers will lose their jobs as the payments company does more work with new artificial intelligence tools, its top executive said.",
"日期": "2026-02-27 01:08:55",
"链接": "https://www.nytimes.com/2026/02/26/technology/block-square-job-cuts-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic Says It Cannot ‘Accede’ to Pentagon in Talks Over A.I.",
"内容": "Anthropic said it was standing firm on not having its A.I. used in certain scenarios by the Pentagon, which has imposed a Friday deadline on the company to give unfettered access to its technology.",
"日期": "2026-02-27 01:03:49",
"链接": "https://www.nytimes.com/2026/02/26/technology/anthropic-pentagon-talks-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Justice Gorsuch’s Tariffs Warning",
"内容": "Granting a president new power is easy, he said. But taking it back is almost impossible.",
"日期": "2026-02-26 18:37:13",
"链接": "https://www.nytimes.com/2026/02/26/us/politics/the-docket-tariff-warning.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Why Nvidia’s Big Profits Aren’t Lifting Markets",
"内容": "The chip giant at the center of the artificial intelligence boom again beat expectations. But it didn’t overcome investor jitters.",
"日期": "2026-02-26 13:25:15",
"链接": "https://www.nytimes.com/2026/02/26/business/dealbook/nvidia-ai-markets.html",
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
