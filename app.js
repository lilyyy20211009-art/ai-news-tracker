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
"标题": "What Both Anthropic and the Pentagon Get Wrong",
"内容": "Neither Anthropic nor the Pentagon are thinking about this issue in a meaningful way.",
"日期": "2026-02-27 10:04:13",
"链接": "https://www.nytimes.com/2026/02/27/opinion/anthropic-pentagon-ai-defense.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A World Where All Is Free? That’s Elon Musk’s Theory of ‘Sustainable Abundance.’",
"内容": "The Tesla and SpaceX chief has told his followers that they will live in a world where robots will take care of every need and people do not have to work, in what has become his latest slogan.",
"日期": "2026-02-27 10:02:41",
"链接": "https://www.nytimes.com/2026/02/27/business/a-world-where-all-is-free-thats-elon-musks-theory-of-sustainable-abundance.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "India Built the World’s Back Office. A.I. Is Starting to Shrink It.",
"内容": "Artificial intelligence promises to automate the white-collar work that made India a tech powerhouse. The country is racing to adapt before it’s too late.",
"日期": "2026-02-27 05:01:15",
"链接": "https://www.nytimes.com/2026/02/27/technology/india-technology-jobs-ai.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "How the S&P 500 Stock Index Became So Skewed to Tech and A.I.",
"内容": "The shifting composition of big public companies in the stock index shows how lopsided and less dynamic the American economy has become.",
"日期": "2026-02-27 08:21:12",
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
