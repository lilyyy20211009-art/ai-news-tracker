// 筛选和渲染功能
const newsData = [
    {
        "标题": "Google&#8217;s annual revenue tops $400 billion for the first time",
        "内容": "Google's parent company, Alphabet, has earned more than $400 billion in annual revenue for the first time. The company announced the milestone as part of its Q4 2025 earnings report released on Wednesday, which highlights the 15 percent year-over-year increase as its cloud business and YouTube continue to grow. As noted in the earnings report, [&#8230;]",
        "日期": "2026-02-04 22:41:03",
        "链接": "https://www.theverge.com/news/874161/google-400-billion-revenue-q4-2025-earnings",
        "来源": "The Verge AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Sam Altman responds to Anthropic’s ‘funny’ Super Bowl ads",
        "内容": "Sam Altman responded to Anthropic's new Super Bowl ad in an X post on Wednesday, saying the OpenAI competitor's campaign is \"clearly dishonest,\" and called it \"on brand\" for Anthropic to \"doublespeak.\" \"We would obviously never run ads in the way Anthropic depicts them,\" he wrote. \"We are not stupid and we know our users [&#8230;]",
        "日期": "2026-02-04 21:03:05",
        "链接": "https://www.theverge.com/news/874084/ai-chatgpt-claude-super-bowl-ads-openai-anthropic",
        "来源": "The Verge AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "OpenClaw&#8217;s AI &#8216;skill&#8217; extensions are a security nightmare",
        "内容": "OpenClaw, the AI agent that has exploded in popularity over the past week, is raising new security concerns after researchers uncovered malware in hundreds of user-submitted \"skill\" add-ons on its marketplace. In a post on Monday, 1Password product VP Jason Meller says OpenClaw's skill hub has become \"an attack surface,\" with the most-downloaded add-on serving [&#8230;]",
        "日期": "2026-02-04 19:03:38",
        "链接": "https://www.theverge.com/news/874011/openclaw-ai-skill-clawhub-extensions-security-nightmare",
        "来源": "The Verge AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "GitHub adds Claude and Codex AI coding agents",
        "内容": "GitHub is making Claude by Anthropic and OpenAI's Codex AI coding agents directly available inside GitHub today. A new public preview adds Claude and Codex to GitHub, GitHub Mobile, and Visual Studio Code, for users with a Copilot Pro Plus or Copilot Enterprise subscription. The move is part of Agent HQ, GitHub's vision to make [&#8230;]",
        "日期": "2026-02-04 17:00:00",
        "链接": "https://www.theverge.com/news/873665/github-claude-codex-ai-agents",
        "来源": "The Verge AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Anthropic says ‘Claude will remain ad-free,’ unlike ChatGPT",
        "内容": "Anthropic has announced that it won't be bringing ads to its AI chatbot Claude, in sharp contrast to confirmed plans from OpenAI to allow advertising in ChatGPT. To hammer the point home further, the company is releasing a Super Bowl commercial that makes fun of unnamed rivals adding adverts to their AI. \"We want Claude [&#8230;]",
        "日期": "2026-02-04 13:09:50",
        "链接": "https://www.theverge.com/ai-artificial-intelligence/873686/anthropic-claude-ai-ad-free-super-bowl-advert-chatgpt",
        "来源": "The Verge AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Sen. Warren wants to know what Google Gemini’s built-in checkout means for user privacy",
        "内容": "Sen. Elizabeth Warren (D-MA) is pressing Google for more information about its plans to build a checkout feature into its Gemini AI chatbot. In a letter to Google CEO Sundar Pichai, Warren expresses concerns that the integration could allow Google and retailers \"to exploit sensitive user data\" or \"manipulate consumers into spending more and paying [&#8230;]",
        "日期": "2026-02-04 12:00:00",
        "链接": "https://www.theverge.com/news/873476/senator-elizabeth-warren-google-gemini-ai-shopping-privacy",
        "来源": "The Verge AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Sam Altman got exceptionally testy over Claude Super Bowl ads",
        "内容": "He posted a novella-sized rant that devolved into to calling his rival \"dishonest\" and \"authoritarian.\"",
        "日期": "2026-02-05 00:45:11",
        "链接": "https://techcrunch.com/2026/02/04/sam-altman-got-exceptionally-testy-over-claude-super-bowl-ads/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Alphabet won’t talk about the Google-Apple AI deal, even to investors",
        "内容": "Alphabet CEO skipped an analyst's question about Apple on the company's earnings call.",
        "日期": "2026-02-04 23:28:31",
        "链接": "https://techcrunch.com/2026/02/04/alphabet-wont-talk-about-the-google-apple-ai-deal-even-to-investors/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Google’s Gemini app has surpassed 750M monthly active users",
        "内容": "Google revealed a significant milestone for its Gemini app, announcing over 750 million monthly active users as it competes with ChatGPT and Meta AI.",
        "日期": "2026-02-04 22:53:46",
        "链接": "https://techcrunch.com/2026/02/04/googles-gemini-app-has-surpassed-750m-monthly-active-users/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Meet Gizmo: A TikTok for interactive, vibe-coded mini apps",
        "内容": "Gizmo's app is like a TikTok for vibe-coded mini apps... and it's a lot of fun.",
        "日期": "2026-02-04 21:45:32",
        "链接": "https://techcrunch.com/2026/02/04/meet-gizmo-a-tiktok-for-interactive-vibe-coded-mini-apps/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "AI SRE Resolve AI confirms $125M raise, unicorn valuation",
        "内容": "The two-year-old startup confirms that it closed a Series A led by Lightspeed at $1 billion valuation.",
        "日期": "2026-02-04 21:39:26",
        "链接": "https://techcrunch.com/2026/02/04/ai-sre-resolve-ai-confirms-125m-raise-unicorn-valuation/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Amazon to begin testing AI tools for film and TV production next month",
        "内容": "Amazon MGM Studios will reportedly begin a closed beta program in March to test its AI tools to help with film and TV production.",
        "日期": "2026-02-04 21:26:43",
        "链接": "https://techcrunch.com/2026/02/04/amazon-to-begin-testing-ai-tools-for-film-and-tv-production-next-month/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "A16z just raised $1.7B for AI infrastructure. Here’s where it’s going.",
        "内容": "Andreessen Horowitz just raised&#160;a whopping&#160;⁠new&#160;$15 billion&#160;in funding⁠.&#160;And a&#160;$1.7 billion&#160;chunk&#160;of that is going to&#160;its&#160;⁠infrastructure&#160;team⁠,&#160;the one responsible for some of its biggest, most prominent&#160;AI investments including&#160;Black Forrest Labs, Cursor, OpenAI,&#160;⁠ElevenLabs⁠, Ideogram,&#160;⁠Fal⁠&#160;and dozens of others.&#160;&#160; A16z&#160;⁠general partner&#160;with the infra team Jennifer Li⁠&#160;(who oversees such&#160;investments&#160;as&#160;ElevenLabs&#160;– just valued at&#160;$11 billion);&#160;Ideagram&#160;and Fal, has a clear thesis on where&#160;the team is looking [&#8230;]",
        "日期": "2026-02-04 20:24:12",
        "链接": "https://techcrunch.com/video/a16z-just-raised-1-7b-for-ai-infrastructure-heres-where-its-going/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "What a16z is actually funding (and what it’s ignoring) when it comes to AI infra",
        "内容": "Andreessen Horowitz just raised&#160;a whopping&#160;new&#160;$15 billion&#160;in funding.&#160;And a&#160;$1.7 billion&#160;chunk&#160;of that is going to&#160;its&#160;infrastructure&#160;team,&#160;the one responsible for some of its biggest, most prominent&#160;AI investments, including&#160;Black Forest Labs, Cursor, OpenAI,&#160;ElevenLabs, Ideogram,&#160;Fal,&#160;and dozens of others.&#160;&#160; a16z&#160;general partner&#160;with the infra team Jennifer Li&#160;(who oversees such&#160;investments&#160;as&#160;ElevenLabs&#160;&#8212; just valued at&#160;$11 billion) has a clear thesis on where&#160;the team is looking to [&#8230;]",
        "日期": "2026-02-04 20:19:12",
        "链接": "https://techcrunch.com/podcast/what-a16z-is-actually-funding-and-what-its-ignoring-when-it-comes-to-ai-infra/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Tinder looks to AI to help fight ‘swipe fatigue’ and dating app burnout",
        "内容": "Tinder is testing AI recommendations and insight from your Camera Roll for better matches.",
        "日期": "2026-02-04 18:08:00",
        "链接": "https://techcrunch.com/2026/02/04/tinder-looks-to-ai-to-help-fight-swipe-fatigue-and-dating-app-burnout/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Roblox’s 4D creation feature is now available in open beta",
        "内容": "Roblox's highly anticipated 4D creation feature has officially arrived in open beta.",
        "日期": "2026-02-04 17:00:00",
        "链接": "https://techcrunch.com/2026/02/04/robloxs-4d-creation-feature-is-now-available-in-open-beta/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "ElevenLabs raises $500M from Sequoia at an $11 billion valuation",
        "内容": "ElevenLabs' valuation has raised more than three times in the last 12 months.",
        "日期": "2026-02-04 15:33:58",
        "链接": "https://techcrunch.com/2026/02/04/elevenlabs-raises-500m-from-sequioia-at-a-11-billion-valuation/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Alexa+, Amazon’s AI assistant, is now available to everyone in the US",
        "内容": "Amazon opens Alexa+ to everyone in the U.S. The AI feature is free for Prime members across devices, and free for everyone on mobile and web.",
        "日期": "2026-02-04 14:00:00",
        "链接": "https://techcrunch.com/2026/02/04/alexa-amazons-ai-assistant-is-now-available-to-everyone-in-the-u-s/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Accel doubles down on Fibr AI as agents turn static websites into one-to-one experiences",
        "内容": "Fibr AI replaces marketing agency- and engineering-heavy website personalization with autonomous systems designed for enterprise scale.",
        "日期": "2026-02-04 13:00:00",
        "链接": "https://techcrunch.com/2026/02/04/accel-doubles-down-on-fibr-ai-as-agents-turn-static-websites-into-one-to-one-experiences/",
        "来源": "TechCrunch AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Google Plans to Double Spending Amid A.I. Race",
        "内容": "Profits jumped 30 percent to $34.5 billion last quarter, and the tech giant is increasing its capital spending this year to as much as $185 billion.",
        "日期": "2026-02-05 00:43:08",
        "链接": "https://www.nytimes.com/2026/02/04/business/google-earnings-ai.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Babies, Robots and Climate Change",
        "内容": "It’s often assumed that lower birthrates could help slow climate change and A.I. disruption. The reality is more complex.",
        "日期": "2026-02-04 21:22:41",
        "链接": "https://www.nytimes.com/2026/02/04/world/population-decline-climate-change-ukraine-minneapolis.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Why A.I. Fears Are Battering Stocks, Again",
        "内容": "New tools by artificial intelligence companies like Anthropic have reignited worries that businesses will pare down their subscriptions to software services.",
        "日期": "2026-02-04 17:59:57",
        "链接": "https://www.nytimes.com/2026/02/04/business/dealbook/ai-software-stocks-anthropic.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Bedrock, an A.I. Start-Up for Construction, Raises $270 Million",
        "内容": "The two-year-old company, founded by veterans of the autonomous vehicle business Waymo, is seeking to automate excavators and other building equipment.",
        "日期": "2026-02-04 15:40:03",
        "链接": "https://www.nytimes.com/2026/02/04/business/dealbook/bedrock-robotics-ai-fundraise.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Moltbook Mania Explained",
        "内容": "Is this the year the internet changes forever?",
        "日期": "2026-02-04 12:00:06",
        "链接": "https://www.nytimes.com/2026/02/04/podcasts/moltbook-mania-explained.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "A.I. Loves Fake Images. But They’ve Been a Thing Since Photography Began.",
        "内容": "An exhibition at the Rijksmuseum in Amsterdam reminds us that photography has always had a complicated relationship with the truth.",
        "日期": "2026-02-04 10:51:44",
        "链接": "https://www.nytimes.com/2026/02/04/arts/design/fakes-rijksmuseum-photo-manipulation.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Once the Hottest Bet on Wall St., Private Credit Has Started to Crack",
        "内容": "Concerns about defaults, particularly among software companies, have spooked investors in the private credit firms that lend to them.",
        "日期": "2026-02-04 14:13:14",
        "链接": "https://www.nytimes.com/2026/02/04/business/private-credit-blue-owl-ai.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "What if Labor Becomes Unnecessary?",
        "内容": "Three economists debate the effects that artificial intelligence is having on the job market.",
        "日期": "2026-02-04 13:54:31",
        "链接": "https://www.nytimes.com/2026/02/04/opinion/ai-jobs-employment-industry.html",
        "来源": "NYT AI",
        "板块": "新闻",
        "分类": "AI"
    },
    {
        "标题": "Farming for the future | Where the Internet Lives",
        "内容": "This is the story of Alphabet’s moonshot, Heritable Agriculture. At Heritable’s lab in the Bay Area, CEO Brad Zamft and his team are developing a platform that can predict which genetic combinations w",
        "日期": "2026-02-04 20:15:35",
        "链接": "https://www.youtube.com/watch?v=7hnvRBjuCW8",
        "来源": "YouTube - Google",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "Interested in Architecture? Test Yourself IRL.",
        "内容": "Use Google Lens to take your studies out into the real world and test your practical knowledge. #GoogleSearch #GoogleLens",
        "日期": "2026-02-04 17:16:17",
        "链接": "https://www.youtube.com/shorts/aC0KO60yytE",
        "来源": "YouTube - Google",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "How a Graphic Designer uses AI Studio for Interactive Art",
        "内容": "In this episode, artist and designer Khyati Trehan from Creative Lab joins Alex Chen and Logan Kilpatrick to share live demos made in Google AI Studio. Together, they explore new AI interfaces for sto",
        "日期": "2026-02-02 22:51:15",
        "链接": "https://www.youtube.com/watch?v=QikCsFDvt9g",
        "来源": "YouTube - Google",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "Come on up–the air is fine!",
        "内容": "Search “SpongeBob” if nautical nonsense be something you wish 🫧 🧽",
        "日期": "2026-02-02 20:46:01",
        "链接": "https://www.youtube.com/shorts/OSgNg1Zv4os",
        "来源": "YouTube - Google",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "TFW you are one with the machine. 🧘",
        "内容": "The music hits just right, the caffeine is flowing, and you rewrite the entire legacy codebase in two hours. 🧘\n\nSubscribe to Google for Developers → https://goo.gle/developers \n\nSpeaker: M.E Francis",
        "日期": "2026-02-03 05:00:04",
        "链接": "https://www.youtube.com/shorts/3Imcjj1GWQs",
        "来源": "YouTube - Google for Developers",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "What number does this SQL query actually run? Go!",
        "内容": "Here’s a SQL puzzle that looks almost too straightforward.We’re counting users and excluding banned and inactive ones using NOT IN. Assume the table has 100 active users, plus some banned and inactive",
        "日期": "2026-02-02 14:00:39",
        "链接": "https://www.youtube.com/shorts/KW6bXeDJEUE",
        "来源": "YouTube - Google for Developers",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "I Built A Manga Drawing App In 24 Hours",
        "内容": "Build your own app with Bolt  👉 https://bolt.new/?utm_medium=social&amp;utm_source=influencer&amp;utm_campaign=V2&amp;utm_content=tinahuang\n\nI've always wanted to make a manga but alas I don't know ho",
        "日期": "2026-02-04 14:40:00",
        "链接": "https://www.youtube.com/watch?v=I5y6hYfVY5o",
        "来源": "YouTube - Tina Huang",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "How to Scale Your AI Agency (Forward Deployed Engineer Model Breakdown)",
        "内容": "📚 Grab Brandon’s board in the #1 community for AI entrepreneurs: https://bit.ly/4rmeaeP\n📈 Become a Wildly Profitable AI Entrepreneur: https://bit.ly/4rw2syC\n🤝 Ready to transform your business with AI?",
        "日期": "2026-02-03 09:35:22",
        "链接": "https://www.youtube.com/watch?v=HiC1J8a9V1I",
        "来源": "YouTube - Liam Ottley",
        "板块": "视频",
        "播放量": 0
    },
    {
        "标题": "New DeepSeek Research - The Future Is Here!",
        "内容": "❤️ Check out Lambda here and sign up for their GPU Cloud: https://lambda.ai/papers\nI use DeepSeek there by running an instance with enough GPU VRAM and using ollama.\n\n📝 The #DeepSeek paper is availabl",
        "日期": "2026-02-04 13:29:19",
        "链接": "https://www.youtube.com/watch?v=fFL7la73RO4",
        "来源": "YouTube - Two Minute Papers",
        "板块": "视频",
        "播放量": 0
    }
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
