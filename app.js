// 筛选和渲染功能
const newsData = [
    {
"标题": "ChatGPT’s deep research tool adds a built-in document viewer so you can read its reports",
"内容": "OpenAI is updating ChatGPT's deep research tool with a full-screen viewer that you can use to scroll through and navigate to specific areas of its AI-generated reports. As shown in a video shared by OpenAI, the built-in viewer allows you to open ChatGPT's reports in a window separate from your chat, while showing a table [&#8230;]",
"日期": "2026-02-10 23:02:32",
"链接": "https://www.theverge.com/ai-artificial-intelligence/876775/openai-deep-research-chatgpt-full-screen-report-viewer",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Facebook can animate your profile pic with AI",
"内容": "Facebook is rolling out new AI features that let you animate your profile picture and restyle Stories and Memories. You'll also be able to add animated backgrounds to text posts to make them pop in the feed. With the animated profile pictures, you'll be able to give a still photo motion with some preset types [&#8230;]",
"日期": "2026-02-10 18:14:21",
"链接": "https://www.theverge.com/tech/876480/meta-facebook-animate-profile-picture-restyle-ai",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Autodesk is suing Google over the name of its Flow AI videomaker",
"内容": "Autodesk, a company known for its suite of 3D design software, is suing Google over claims that it infringed on its \"Flow\" trademark, as reported earlier by Reuters. The lawsuit, filed in a California court last week, alleges that the name of Google's AI video generator, Flow, will likely confuse customers with Autodesk's own AI-enabled [&#8230;]",
"日期": "2026-02-10 14:47:14",
"链接": "https://www.theverge.com/tech/876266/autodesk-google-flow-trademark-infringement-lawsuit",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Could the Trump Phone be a good phone?",
"内容": "We have long had our doubts about the Trump Phone. Since its very first debut, the device - technically called the Trump Mobile T1 Phone 8002 - has seemed utterly impossible to execute as advertised. The Trump Mobile team has also spent the last eight months rapidly moving the goalposts, changing specs and making increasingly [&#8230;]",
"日期": "2026-02-10 13:30:00",
"链接": "https://www.theverge.com/podcast/876188/trump-phone-specs-price-date-moltbook-openclaw-vergecast",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Vibe coding Nothing’s apps is fun, until you try to make them useful",
"内容": "After a week vibe coding apps using Nothing's Essential Apps Builder, I'm conflicted. I buy into the smartphone maker's vision for software that adapts to you, not the other way around, but right now it doesn't deliver. It's hard to see how this goes from cool novelty to a reliable tool without serious refinement, and [&#8230;]",
"日期": "2026-02-10 13:00:00",
"链接": "https://www.theverge.com/tech/876229/nothing-essential-ai-app-builder",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amazon may launch a marketplace where media sites can sell their content to AI companies",
"内容": "A new report claims the e-commerce giant is looking to create a pipeline of licensable content between media publishers and AI companies.",
"日期": "2026-02-10 23:16:28",
"链接": "https://techcrunch.com/2026/02/10/amazon-may-launch-a-marketplace-where-media-sites-can-sell-their-content-to-ai-companies/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "An ice dance duo skated to AI music at the Olympics",
"内容": "Czech ice dancers Katerina Mrazkova and Daniel Mrazek are learning the hard way that LLMs sometimes spit out straight-up plagiarism.",
"日期": "2026-02-10 22:31:13",
"链接": "https://techcrunch.com/2026/02/10/olympics-czech-ice-dancers-duo-ai-music/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "This Sequoia-backed lab thinks the brain is ‘the floor, not the ceiling’ for AI",
"内容": "AI lab&#160;Flapping Airplanes&#160;just landed $180 million in seed funding from the likes of Google Ventures, Sequoia, and Index to do something most labs have quietly given up on: making models learn like humans instead of vacuuming up the internet. The founding team, made up of brothers Ben and Asher Spector and co-founder Aidan Smith, is [&#8230;]",
"日期": "2026-02-10 21:48:29",
"链接": "https://techcrunch.com/podcast/this-sequoia-backed-lab-thinks-the-brain-is-the-floor-not-the-ceiling-for-ai/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Boston Dynamics CEO Robert Playter steps down after 30 years at the company",
"内容": "Robert Playter announcd he is leaving Boston Dynamics after 30 years at the company in various roles, including six years as CEO.",
"日期": "2026-02-10 21:20:10",
"链接": "https://techcrunch.com/2026/02/10/boston-dynamics-ceo-robert-playter-steps-down-after-30-years-at-the-company/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Nearly half of xAI’s founding team has now left the company",
"内容": "Whatever the cause of the departures, the cumulative impact is alarming. There is a lot of work left to do at xAI, and an IPO will bring more scrutiny than the lab has ever faced before.",
"日期": "2026-02-10 20:31:51",
"链接": "https://techcrunch.com/2026/02/10/nearly-half-of-xais-founding-team-has-now-left-the-company/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Facebook adds new AI features, animated profile photos, and backgrounds for text posts",
"内容": "Facebook's new AI features let users animate their profile pics, restyle their Stories and Memories, and add  backgrounds to text posts.",
"日期": "2026-02-10 19:34:51",
"链接": "https://techcrunch.com/2026/02/10/facebook-adds-new-ai-features-animated-profile-photos-and-backgrounds-for-text-posts/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Vega raises $120M Series B to rethink how enterprises detect cyber threats",
"内容": "Vega Security raised $120 million, bringing its valuation to $700 million, in a round led by Accel. The company aims to rethink how enterprises detect cybersecurity threats.",
"日期": "2026-02-10 16:00:00",
"链接": "https://techcrunch.com/2026/02/10/vega-raises-120m-series-b-to-rethink-how-enterprises-detect-cyber-threats/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Hauler Hero collects $16M for its AI waste management software",
"内容": "Hauler Hero has seen its customer base, revenue, and head count double since the company raised its seed round in 2024.",
"日期": "2026-02-10 15:00:00",
"链接": "https://techcrunch.com/2026/02/10/hauler-hero-collects-16m-for-its-ai-waste-management-software/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "India orders social media platforms to take down deepfakes faster",
"内容": "India’s new rules take effect February 20, tightening deepfake oversight and shrinking takedown windows to as little as two hours.",
"日期": "2026-02-10 14:51:13",
"链接": "https://techcrunch.com/2026/02/10/india-orders-social-media-platforms-to-take-down-deepfakes-faster/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Former GitHub CEO raises record $60M dev tool seed round at $300M valuation",
"内容": "Thomas Dohmke's new startup offers an AI system to allow developers to better manage all the code AI agents produce.",
"日期": "2026-02-10 14:30:00",
"链接": "https://techcrunch.com/2026/02/10/former-github-ceo-raises-record-60m-dev-tool-seed-round-at-300m-valuation/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "AI video startup Runway raises $315M at $5.3B valuation, eyes more capable world models",
"内容": "Startup Runway has raised a $315 million round at a $5.3 billion valuation, funds it will use to expand beyond AI video generation and into world models.",
"日期": "2026-02-10 14:00:00",
"链接": "https://techcrunch.com/2026/02/10/ai-video-startup-runway-raises-315m-at-5-3b-valuation-eyes-more-capable-world-models/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. May Put Progressives to the Test",
"内容": "The left needs a sharper A.I. politics.",
"日期": "2026-02-11 00:54:25",
"链接": "https://www.nytimes.com/2026/02/10/opinion/ai-politics-left-progressive.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. Personalizes the Internet but Takes Away Control",
"内容": "The relentless addition of artificial intelligence in popular apps raises questions about what’s at stake. The answer: the future of the internet and its lifeblood, digital advertising.",
"日期": "2026-02-10 19:28:27",
"链接": "https://www.nytimes.com/2026/02/10/technology/personaltech/ai-google-meta-opt-out.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "A.I. Can Fool Us Into Thinking It’s Human. Now What?",
"内容": "And if A.I. tells us it is conscious, should we believe it? The writer Michael Pollan dug into those questions and more on “The Interview.”",
"日期": "2026-02-10 16:23:08",
"链接": "https://www.nytimes.com/video/podcasts/100000010702270/ai-can-fool-us-into-thinking-its-human-now-what.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Elon Musk’s Edge in the A.I. Race",
"内容": "Casey Newton and Kevin Roose, the hosts of “Hard Fork,” consider how the news that SpaceX is acquiring Elon Musk’s company xAI could give him an edge in the artificial intelligence race.",
"日期": "2026-02-10 16:23:03",
"链接": "https://www.nytimes.com/video/podcasts/100000010702414/elon-musks-edge-in-the-ai-race.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "I Just Returned From China. We Are Not Winning.",
"内容": "If we are going to be competitive with China, we have to get our economic house in order.",
"日期": "2026-02-10 20:25:03",
"链接": "https://www.nytimes.com/2026/02/10/opinion/china-ai-ev-trump.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Michael Pollan Says Humanity Is About to Undergo a Revolutionary Change",
"内容": "The best-selling author Michael Pollan grapples with big questions about A.I., consciousness and the distractions polluting our minds.",
"日期": "2026-02-10 13:51:21",
"链接": "https://www.nytimes.com/video/podcasts/100000010699275/michael-pollan-says-humanity-is-about-to-undergo-a-revolutionary-change.html",
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
