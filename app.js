// 筛选和渲染功能
const newsData = [
    {
"标题": "Google takes control of ‘Android of robotics’ project in quest for physical AI",
"内容": "Google is folding Alphabet's AI robotics \"moonshot,\" Intrinsic, into the company after five years as an independent unit. The move marks a strategic shift as Google doubles down on physical AI and pulls experimental projects closer to its core business. Intrinsic \"graduated\" into an independent company inside Alphabet's Other Bets division in 2021, a portfolio [&#8230;]",
"日期": "2026-02-26 11:06:33",
"链接": "https://www.theverge.com/tech/885113/google-swallows-ai-robotics-moonshot-intrinsic",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Trump claims tech companies will sign deals next week to pay for their own power supply",
"内容": "President Donald Trump tried to quell Americans' concerns about rising electricity costs during his State of the Union speech - and now we're learning that the deals he promised could land next week. Trump claimed that he's negotiated a \"rate payer protection pledge\" with major tech companies, which would see them build out or pay [&#8230;]",
"日期": "2026-02-25 20:37:25",
"链接": "https://www.theverge.com/science/884191/ai-data-center-energy-state-of-the-union-trump",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Salesforce CEO Marc Benioff: This isn’t our first SaaSpocalypse",
"内容": "Salesforce reported a solid year-end earnings and then pulled out all the stops to ward off more talk of the death of its business to AI.",
"日期": "2026-02-26 01:59:12",
"链接": "https://techcrunch.com/2026/02/25/salesforce-ceo-marc-benioff-this-isnt-our-first-saaspocalypse/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Gushwork bets on AI search for customer leads — and early results are emerging",
"内容": "Gushwork has raised $9 million in a seed round led by SIG and Lightspeed. The startup has seen early customer traction from AI search tools like ChatGPT.",
"日期": "2026-02-26 00:00:00",
"链接": "https://techcrunch.com/2026/02/25/gushwork-bets-on-ai-search-for-customer-leads-and-early-results-are-emerging/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic acquires computer-use AI startup Vercept after Meta poached one of its founders",
"内容": "Seattle-based Vercept developed complex agentic tools, including a computer-use agent that could complete tasks inside applications like a person with a laptop would.",
"日期": "2026-02-25 23:49:19",
"链接": "https://techcrunch.com/2026/02/25/anthropic-acquires-vercept-ai-startup-agents-computer-use-founders-investors/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Nvidia has another record quarter amid record capex spends",
"内容": "\"The demand for tokens in the world has gone completely exponential,\" Nvidia CEO Jensen Huang said about the company's earnings.",
"日期": "2026-02-25 23:04:42",
"链接": "https://techcrunch.com/2026/02/25/nvidia-earnings-record-capex-spend-ai/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The White House wants AI companies to cover rate hikes. Most have already said they would.",
"内容": "Many hyperscalers have already made public commitments to cover electricity cost increases.",
"日期": "2026-02-25 20:42:14",
"链接": "https://techcrunch.com/2026/02/25/the-white-house-wants-ai-companies-to-cover-rate-hikes-most-have-already-said-they-would/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How A.I.-Generated Videos Are Distorting Your Child’s YouTube Feed",
"内容": "Experts caution that low-quality, A.I.-generated videos on YouTube geared toward children often feature conflicting information, lack plot structure and can be cognitively overwhelming — all of which could affect young children’s development.",
"日期": "2026-02-26 10:00:09",
"链接": "https://www.nytimes.com/2026/02/26/us/ai-videos-children-youtube.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. Dating Apps Complicate China’s Efforts to Boost Birthrate",
"内容": "As China grapples with a shrinking population and historically low birthrate, people are finding romance with chatbots instead.",
"日期": "2026-02-26 05:00:07",
"链接": "https://www.nytimes.com/2026/02/26/technology/china-ai-dating-apps.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Bleak Research Report Stokes A.I. Debate on Wall St.",
"内容": "In a widely circulated note, Citrini Research painted a dire picture of job losses and stock market sell-offs, though many analysts and economists questioned its conclusions.",
"日期": "2026-02-25 22:44:34",
"链接": "https://www.nytimes.com/2026/02/25/business/citrini-ai-stock-market.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "What It’s Like to Grow Up With A.I.: The Winners of Our Multimedia Challenge",
"内容": "Via essays, poems, videos, artwork and graphics, 35 students across the globe reflect on how this technology is affecting teenagers.",
"日期": "2026-02-26 10:32:33",
"链接": "https://www.nytimes.com/2026/02/26/learning/teens-on-growing-up-with-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Teachers on How A.I. Is Reshaping the Classroom",
"内容": "We asked high school educators what it’s like to teach at a time when A.I. is transforming education. They answered in images, essays and videos.",
"日期": "2026-02-26 10:30:04",
"链接": "https://www.nytimes.com/2026/02/26/learning/teachers-on-how-ai-is-reshaping-the-classroom.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. Complicates Old Internet Privacy Risks",
"内容": "Artificial intelligence is convenient and easy to use, but you should think about what you say to the chatbots.",
"日期": "2026-02-26 10:06:05",
"链接": "https://www.nytimes.com/2026/02/26/technology/personaltech/ai-complicates-old-internet-privacy-risks.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "When Chatbots Are Used to Plan Violence, Is There a Duty to Warn?",
"内容": "People are revealing sensitive personal information to A.I. chatbots — including plans to commit violent acts.",
"日期": "2026-02-26 10:33:19",
"链接": "https://www.nytimes.com/2026/02/26/technology/chatbots-duty-warn-police.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The A.I. Videos on Kids’ YouTube Feeds",
"内容": "The YouTube algorithm is pushing bizarre, often nonsensical A.I.-generated videos targeting children. Our video journalist Arijeta Lajka explains why experts say that these videos could affect their cognitive development, and how parents can identify this type of content.",
"日期": "2026-02-26 11:11:20",
"链接": "https://www.nytimes.com/video/technology/100000010717886/the-ai-videos-on-kids-youtube-feeds.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Nvidia’s Quarterly Profit Hits $43 Billion on Strong A.I. Chip Sales",
"内容": "Total profit for the fiscal year was $120 billion, the company said. Three years ago, it was just $4.4 billion.",
"日期": "2026-02-25 23:28:10",
"链接": "https://www.nytimes.com/2026/02/25/technology/nvidia-earnings.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "I Thought I Understood A.I. Companies. I Couldn’t Have Been More Wrong.",
"内容": "The future of the field is still up for grabs.",
"日期": "2026-02-25 22:01:34",
"链接": "https://www.nytimes.com/2026/02/25/opinion/ai-industry-competition-innovation.html",
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
