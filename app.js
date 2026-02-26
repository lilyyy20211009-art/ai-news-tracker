// 筛选和渲染功能
const newsData = [
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
"标题": "Google and Samsung just launched the AI features Apple couldn’t with Siri",
"内容": "Google just announced that Gemini will soon be able to take care of some multistep tasks on your phone, like ordering food or hailing a car, starting first with the Pixel 10, Pixel 10 Pro, and the just-announced Samsung Galaxy S26 phones. It all sounds a bit like features Apple announced for Siri way back [&#8230;]",
"日期": "2026-02-25 19:56:55",
"链接": "https://www.theverge.com/tech/884703/google-samsung-galaxy-s26-gemini-apple-siri",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Google Gemini can book an Uber or order food for you on Pixel 10 and Galaxy S26",
"内容": "Google's Gemini AI is getting one step closer to being more like an actual assistant. Starting with some Pixel 10 phones and the Samsung Galaxy S26 series, Gemini will be able to hail an Uber or put together a DoorDash order on its own. It's called task automation, and it starts with a prompt to [&#8230;]",
"日期": "2026-02-25 18:00:00",
"链接": "https://www.theverge.com/tech/884210/google-gemini-samsung-s26-pixel-10-uber",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amazon&#8217;s AGI lab leader is leaving",
"内容": "After less than two years at Amazon, David Luan, the head of Amazon's San Francisco AI lab, is departing the company. Luan announced the update in a post on LinkedIn on Tuesday, saying, \"I'll be leaving Amazon at the end of this week to cook up something new.\" He added that, \"There's incredible work to [&#8230;]",
"日期": "2026-02-25 15:24:39",
"链接": "https://www.theverge.com/tech/884372/amazon-agi-lab-leader-david-luan-departure",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Does Anthropic think Claude is alive? Define ‘alive’",
"内容": "Over the past several weeks, as more and more Anthropic executives do interviews on a publicity blitz for Claude, one thing has gotten increasingly clear: Anthropic sure seems to think Claude is alive in some way, shape, or form. \"Alive\" is obviously a loaded term; the more frequently used word is \"conscious.\" If you ask [&#8230;]",
"日期": "2026-02-25 14:24:30",
"链接": "https://www.theverge.com/report/883769/anthropic-claude-conscious-alive-moral-patient-constitution",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "You can now make Alexa’s AI personality more friendly, blunt, or chilled out",
"内容": "Amazon is giving you more control over how Alexa behaves during conversations and responses. Three \"personality style\" presets are launching today for Alexa Plus users in the US that allow you to make the AI-powered voice assistant more concise, cheerful, or relaxed, depending on your personal preferences. \"Alexa's personality is one of the things customers [&#8230;]",
"日期": "2026-02-25 14:00:00",
"链接": "https://www.theverge.com/tech/884269/amazon-alexa-plus-personality-styles-availability",
"来源": "The Verge AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Adobe’s new AI video editing tool stitches clips into a first draft",
"内容": "Adobe is launching a new Firefly tool that helps video editors to focus on storytelling by creating a first cut to refine and build around. The Quick Cut feature is launching in beta today for Firefly's video editor, allowing users to automatically assemble clips together based on text prompts and simple creator inputs. \"Quick Cut [&#8230;]",
"日期": "2026-02-25 14:00:00",
"链接": "https://www.theverge.com/tech/884285/adobe-firefly-ai-video-editing-quick-cut",
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
"标题": "Alphabet-owned robotics software company Intrinsic joins Google",
"内容": "Nearly five years after graduating into an independent Alphabet company, Intrinsic is moving under Google's domain.",
"日期": "2026-02-25 20:00:00",
"链接": "https://techcrunch.com/2026/02/25/alphabet-owned-robotics-software-company-intrinsic-joins-google/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Wearable startup CUDIS launches a new health ring line with an AI-fueled ‘coach’",
"内容": "The wearable incentivizes healthy behavior with points that can be redeemed for health products.",
"日期": "2026-02-25 19:10:04",
"链接": "https://techcrunch.com/2026/02/25/wearable-startup-cudis-launches-a-new-health-ring-line-with-an-ai-fueled-coach/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "The public opposition to AI infrastructure is heating up",
"内容": "Public backlash over the data center boom is leading to a variety of draconian policies — including bans on new construction.",
"日期": "2026-02-25 19:03:34",
"链接": "https://techcrunch.com/2026/02/25/the-public-opposition-to-ai-infrastructure-is-heating-up/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Gemini can now automate some multi-step tasks on Android",
"内容": "Gemini on Android will be able to automate tasks involving rideshare requests, or grocery or food delivery, says Google.",
"日期": "2026-02-25 18:00:00",
"链接": "https://techcrunch.com/2026/02/25/gemini-can-now-automate-some-multi-step-tasks-on-android/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenAI COO says ads will be ‘an iterative process’",
"内容": "COO Brad Lightcap noted that ads can add to the product experience of users if they are done right. He urged to give OpenAI a few months to see how the company fares in rolling out the product.",
"日期": "2026-02-25 17:37:37",
"链接": "https://techcrunch.com/2026/02/25/openai-coo-says-ads-will-be-an-iterative-process/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "OpenClaw creator’s advice to AI builders is to be more playful and allow yourself time to improve",
"内容": "Peter Steinberger talks about the creation of his viral AI agent OpenClaw and how being more \"playful\" makes for a better way to learn AI coding.",
"日期": "2026-02-25 16:54:46",
"链接": "https://techcrunch.com/2026/02/25/openclaw-creators-advice-to-ai-builders-is-to-be-more-playful-and-allow-yourself-time-to-improve/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Have hard-won scaling lessons to share? Take the stage at TechCrunch Founder Summit 2026",
"内容": "Apply to speak at TechCrunch Founder Summit 2026 by April 17 for a chance to lead a roundtable or breakout session for 1,000 founders and investors. If you’ve built, backed, or operated inside high-growth startups, your experience could shape how the next wave of founders scales.",
"日期": "2026-02-25 16:00:00",
"链接": "https://techcrunch.com/2026/02/25/have-hard-won-scaling-lessons-to-share-take-the-stage-at-techcrunch-founder-summit/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "About 12% of US teens turn to AI for emotional support or advice",
"内容": "General-purpose tools like ChatGPT, Claude, and Grok are not designed for this use, making mental health professionals wary.",
"日期": "2026-02-25 15:52:03",
"链接": "https://techcrunch.com/2026/02/25/about-12-of-u-s-teens-turn-to-ai-for-emotional-support-or-advice/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "3 days left: Save up to $680 on your TechCrunch Disrupt 2026 ticket",
"内容": "Just 3 days left to save up to $680 on your TechCrunch Disrupt 2026 ticket. Offer ends on Friday, February 27 at 11:59 p.m. PT. Don't miss unparalleled, curated networking and valuable insights from 250+ tech leaders, and discover 300+ breakout innovations. Register now.",
"日期": "2026-02-25 15:00:00",
"链接": "https://techcrunch.com/2026/02/25/3-days-left-save-up-to-680-on-your-techcrunch-disrupt-2026-ticket/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "US tells diplomats to lobby against foreign data sovereignty laws",
"内容": "The Trump administration has ordered U.S. diplomats to lobby against countries' attempts to regulate how American tech companies handle foreigners' data.",
"日期": "2026-02-25 14:56:52",
"链接": "https://techcrunch.com/2026/02/25/us-tells-diplomats-to-lobby-against-foreign-data-sovereignty-laws/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Jira’s latest update allows AI agents and humans to work side by side",
"内容": "Atlassian is unveiling \"agents in Jira,\" which gives users the ability to assign and manage work given to AI agents the same as humans.",
"日期": "2026-02-25 14:00:00",
"链接": "https://techcrunch.com/2026/02/25/jiras-latest-update-allows-ai-agents-and-humans-to-work-side-by-side/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Adobe Firefly’s video editor can now automatically create a first draft from footage",
"内容": "Adobe Firefly is getting a new feature called Quick Cut that uses AI to edit footage to create a first draft of the final video based on user instructions.",
"日期": "2026-02-25 14:00:00",
"链接": "https://techcrunch.com/2026/02/25/adobe-fireflys-video-editor-can-now-automatically-create-a-first-draft-from-footage/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Amazon’s AI-powered Alexa+ gets new personality options",
"内容": "Users will be able to choose from Alexa styles like Brief, Chill, or Sweet, Amazon says.",
"日期": "2026-02-25 14:00:00",
"链接": "https://techcrunch.com/2026/02/25/amazons-ai-powered-alexa-gets-new-personality-options/",
"来源": "TechCrunch AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Khosla’s Keith Rabois backs Comp, which wants to bolster HR teams with AI",
"内容": "The HR tech startup, which currently operates in Brazil, has raised a $17.25 million Series A.",
"日期": "2026-02-25 13:30:00",
"链接": "https://techcrunch.com/2026/02/25/khoslas-keith-rabois-backs-comp-which-wants-to-bolster-hr-teams-with-ai/",
"来源": "TechCrunch AI",
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
"标题": "Nvidia’s Quarterly Profit Hits $43 Billion on Strong A.I. Chip Sales",
"内容": "Total profit for the fiscal year was $120 billion, the company said. Three years ago, it was just $4.4 billion.",
"日期": "2026-02-25 23:28:10",
"链接": "https://www.nytimes.com/2026/02/25/technology/nvidia-earnings.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Trump Says Tech Firms Should Pay More for Electricity",
"内容": "The president said he had negotiated a deal with tech giants to cover the energy costs of data centers, but offered few details. Experts said such pledges could prove difficult in practice.",
"日期": "2026-02-25 18:59:17",
"链接": "https://www.nytimes.com/2026/02/25/climate/ai-data-centers-trump-energy-costs.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "Writers Are Being Targeted by Scams. This Reporter Knows the Feeling.",
"内容": "From George Saunders to the National Book Foundation, the literary world has been besieged by fake requests. Just like me.",
"日期": "2026-02-25 16:00:06",
"链接": "https://www.nytimes.com/2026/02/25/books/review/publishing-scams.html",
"来源": "NYT AI",
"板块": "新闻",
"分类": "AI"
    },
    {
"标题": "What Trump Did (and Didn’t) Say in the State of the Union Speech",
"内容": "The president boasted about a strong economy in his State of the Union address. But he spent less time on a potential weakness, affordability.",
"日期": "2026-02-25 13:16:58",
"链接": "https://www.nytimes.com/2026/02/25/business/dealbook/trump-state-of-union.html",
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
