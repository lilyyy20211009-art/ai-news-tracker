// 筛选和渲染功能
const newsData = [
    {
"标题": "ChatGPT&#8217;s cheapest options now show you ads",
"内容": "ChatGPT users may soon start seeing ads in their chats, as OpenAI announced on Monday that it's officially beginning to test ads on its AI platform. They'll appear as labeled \"sponsored\" links at the bottom of ChatGPT answers, but OpenAI says the ads \"do not influence the answers ChatGPT gives you.\" Currently, ads will only [&#8230;]",
"日期": "2026-02-09 21:23:07",
"链接": "https://www.theverge.com/ai-artificial-intelligence/876029/openai-testing-ads-in-chatgpt",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The first signs of burnout are coming from the people who embrace AI the most",
"内容": "Because employees could do more, work began bleeding into lunch breaks and late evenings. The employees' to-do lists expanded to fill every hour that AI freed up, and then kept going.",
"日期": "2026-02-10 06:46:55",
"链接": "https://techcrunch.com/2026/02/09/the-first-signs-of-burnout-are-coming-from-the-people-who-embrace-ai-the-most/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Databricks CEO says SaaS isn’t dead, but AI will soon make it irrelevant",
"内容": "AI isn't going to replace major SaaS apps with vibe-coded versions, Databricks CEO Ali Ghodsi believes. But it could give rise to competitors.",
"日期": "2026-02-09 21:14:50",
"链接": "https://techcrunch.com/2026/02/09/databricks-ceo-says-saas-isnt-dead-but-ai-will-soon-make-it-irrelevant/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic’s India expansion collides with a local company that already had the name",
"内容": "India's Anthropic Software has taken the U.S. AI giant to court over a name dispute.",
"日期": "2026-02-09 21:01:41",
"链接": "https://techcrunch.com/2026/02/09/anthropics-india-expansion-collides-with-a-local-company-that-already-had-the-name/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "ChatGPT rolls out ads",
"内容": "OpenAI faced a backlash late last year when it tested app suggestions that looked like unwanted ads. Still, the AI company needs to generate revenue from its popular chatbot to cover the costs of developing its technology and growing the business.",
"日期": "2026-02-09 20:15:26",
"链接": "https://techcrunch.com/2026/02/09/chatgpt-rolls-out-ads/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "I Just Returned From China. We Are Not Winning.",
"内容": "If we are going to be competitive with China, we have to get our economic house in order.",
"日期": "2026-02-10 10:02:28",
"链接": "https://www.nytimes.com/2026/02/10/opinion/china-ai-ev-trump.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Lamenting ‘Our President’s Overt Racism’",
"内容": "Readers find the president’s posting of a racist video shameful and in keeping with his previous appeals to white supremacy. Also: Bad Bunny; Trump vs. Harvard; medical A.I.",
"日期": "2026-02-09 20:08:07",
"链接": "https://www.nytimes.com/2026/02/09/opinion/trump-obama-racist-video.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Health Advice From A.I. Chatbots Is Frequently Wrong, Study Shows",
"内容": "In part, the problem has to do with how users are asking their questions.",
"日期": "2026-02-09 21:37:01",
"链接": "https://www.nytimes.com/2026/02/09/well/chatgpt-health-advice.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "This Year’s Super Bowl Ads Were Dominated by AI Companies",
"内容": "Ads pitching artificial intelligence companies dominated the Super Bowl broadcast. Their huge cost probably didn’t ease investor worries about spending.",
"日期": "2026-02-09 20:14:18",
"链接": "https://www.nytimes.com/2026/02/09/business/dealbook/super-bowl-ads-ai.html",
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
