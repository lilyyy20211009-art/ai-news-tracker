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
"标题": "AI-generated ads dropped the ball at this year&#8217;s Super Bowl",
"内容": "It feels like everyone who produced ad spots for this year's Super Bowl with generative AI failed in terms of making gen AI seem useful or like something worth getting excited about. Though we've seen plenty of AI-generated commercials before (at previous Super Bowls, no less), this year's event was oversaturated with them. That's in [&#8230;]",
"日期": "2026-02-09 17:59:07",
"链接": "https://www.theverge.com/entertainment/875886/super-bowl-2026-ai-generated-ads-were-terrible",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Siemens CEO Roland Busch’s mission to automate everything",
"内容": "Today, I’m talking with Roland Busch, who is the CEO of Siemens. Siemens is one of those absolutely giant, extremely important, but fairly opaque companies we love to dig into on Decoder. At a very basic, reductive level, Siemens makes the hardware and software that allow other companies to run and automate their stuff. Everyone [&#8230;]",
"日期": "2026-02-09 15:00:00",
"链接": "https://www.theverge.com/podcast/875233/siemens-ceo-roland-busch-ai-automation-digital-twins-nato-tariffs",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI will reportedly start testing ads in ChatGPT today",
"内容": "OpenAI plans to start testing ads in ChatGPT today, according to a report from CNBC. The \"clearly labeled\" ads will appear in a separate area beneath your chat, OpenAI announced last month. A source close to the situation tells CNBC that OpenAI \"expects ads to make up less than half of its revenue long term.\" [&#8230;]",
"日期": "2026-02-09 14:45:41",
"链接": "https://www.theverge.com/news/875724/openai-chatgpt-ads-test-launch",
"来源": "The Verge AI",
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
"标题": "Workday CEO Eschenbach departs, with co-founder Aneel Bhusri returning as CEO",
"内容": "Bhusri said in a statement that the company's next chapter would be focused on AI.",
"日期": "2026-02-09 18:15:08",
"链接": "https://techcrunch.com/2026/02/09/workday-ceo-eschenbach-departs-with-co-founder-aneel-bhusri-returning-as-ceo/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Anthropic closes in on $20B round",
"内容": "The company raised $13 billion in equity funding just five months ago, but intense competition between frontier labs and the ongoing cost of compute have made them eager to raise as quickly as possible.",
"日期": "2026-02-09 17:37:23",
"链接": "https://techcrunch.com/2026/02/09/anthropic-closes-in-on-20b-round/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Ex-Googlers are building infrastructure to help companies understand their video data",
"内容": "Founded by former Google Japan leaders, InfiniMind is building enterprise AI to turn vast, unused video archives into searchable, actionable business intelligence.",
"日期": "2026-02-09 17:00:00",
"链接": "https://techcrunch.com/2026/02/09/ex-googlers-are-building-infrastructure-to-help-companies-understand-their-video-data/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Call for speakers: TechCrunch Founder Summit 2026",
"内容": "Submit to speak at TechCrunch Founder Summit 2026 to lead a roundtable. Share scaling insights with 1,100 founders on June 23 in Boston.",
"日期": "2026-02-09 15:00:00",
"链接": "https://techcrunch.com/2026/02/09/call-for-speakers-techcrunch-founder-summit-2026/",
"来源": "TechCrunch AI",
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
"标题": "A.I. Is Making Doctors Answer a Question: What Are They Really Good For?",
"内容": "Many physicians find chatbots threatening, but that doesn’t mean they’re giving up on medicine.",
"日期": "2026-02-09 17:17:56",
"链接": "https://www.nytimes.com/2026/02/09/health/ai-chatbots-doctors-medicine.html",
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
    {
"标题": "Michael Pollan Says Humanity Is About to Undergo a Revolutionary Change",
"内容": "The best-selling author Michael Pollan grapples with big questions about A.I., consciousness and the distractions polluting our minds.",
"日期": "2026-02-09 15:06:44",
"链接": "https://www.nytimes.com/video/podcasts/100000010699275/michael-pollan-says-humanity-is-about-to-undergo-a-revolutionary-change.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "It’s the A.I. Economy, Stupid",
"内容": "The Democratic Party needs to prepare for the coming tech revolution.",
"日期": "2026-02-09 15:34:20",
"链接": "https://www.nytimes.com/2026/02/08/opinion/ai-democrats-jobs-economy.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "These A.I. Dreamers Don’t Fit the Stereotype",
"内容": "Young tech entrepreneurs in San Francisco are hoping to cash in, even as they wonder how artificial intelligence will affect society.",
"日期": "2026-02-09 16:15:44",
"链接": "https://www.nytimes.com/2026/02/08/style/ai-tech-san-francisco.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Can AI Chatbots Write Emotionally Rich Romance Books?",
"内容": "The romance industry, always at the vanguard of technological change, is rapidly adapting to A.I. Not everyone is on board.",
"日期": "2026-02-09 23:31:12",
"链接": "https://www.nytimes.com/2026/02/08/business/ai-claude-romance-books.html",
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
