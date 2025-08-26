export default async function handler(req, res) {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  
  // Sample data structure - Replace this with actual API calls
  const newsData = {
    date: "MONDAY, AUGUST 25, 2025",
    greeting: "Good morning, typhoon chaos hits Asia's coastal millions",
    readingTime: "2 minute read",
    stories: [
      {
        id: 1,
        emoji: "🌀",
        title: "Massive Typhoon Forces Vietnam and China Emergency Evacuations",
        summary: "Typhoon Kajiki threatens millions as Vietnam evacuates 586,000 people and cancels flights. China's resort city Sanya closed businesses and public transport. The powerful storm will hit south China or central Vietnam soon.",
        url: "https://reuters.com/typhoon-news",
        source: "Reuters"
      },
      {
        id: 2,
        emoji: "☕",
        title: "Coffee Giants Near Record $18 Billion Merger Deal",
        summary: "Keurig Dr Pepper is close to buying Dutch company JDE Peet's for $18 billion. This merger would create a global coffee powerhouse, combining brands like Keurig pods with European coffee labels.",
        url: "https://bloomberg.com/coffee-merger",
        source: "Bloomberg"
      },
      {
        id: 3,
        emoji: "🌾",
        title: "Brazil Farm Bankruptcies Surge Threatening Global Food Supply",
        summary: "Brazil's agricultural sector faces crisis with farm bankruptcies jumping 138% to 1,272 cases in 2024. High interest rates and tariffs pressure farmers affecting global food prices.",
        url: "https://reuters.com/brazil-farms",
        source: "Reuters"
      },
      {
        id: 4,
        emoji: "🤖",
        title: "UK Government Considers Free ChatGPT Plus for All Citizens",
        summary: "Minister Peter Kyle discussed a £2 billion deal with OpenAI's Sam Altman to provide ChatGPT Plus to all 67 million UK residents, making Britain the first nation offering state-sponsored AI.",
        url: "https://bbc.com/uk-ai",
        source: "BBC"
      },
      {
        id: 5,
        emoji: "🚀",
        title: "NASA Discovers Earth-Like Planet With Water Signatures",
        summary: "James Webb telescope identifies potentially habitable exoplanet just 40 light-years away. The planet shows clear water vapor signatures in its atmosphere, marking a breakthrough in the search for extraterrestrial life.",
        url: "https://nasa.gov/space",
        source: "NASA"
      },
      {
        id: 6,
        emoji: "📈",
        title: "Tech Stocks Drive S&P 500 to All-Time Record High",
        summary: "Markets surge as artificial intelligence companies lead unprecedented rally. S&P 500 closes at historic peak with tech giants posting strong quarterly earnings amid cooling inflation data.",
        url: "https://cnbc.com/markets",
        source: "CNBC"
      },
      {
        id: 7,
        emoji: "🏅",
        title: "Paris Olympics Shatters All Previous Attendance Records",
        summary: "Summer games attract record-breaking 15 million spectators across innovative urban venues. France celebrates most successful games in history with unprecedented global viewership exceeding 5 billion.",
        url: "https://reuters.com/olympics",
        source: "Reuters"
      },
      {
        id: 8,
        emoji: "🎬",
        title: "Disney Launches Major Offensive in Streaming Wars",
        summary: "Entertainment giant announces $50 billion content investment and new pricing strategy. Disney+ to merge with Hulu creating unified platform to challenge Netflix dominance in streaming market.",
        url: "https://bloomberg.com/streaming",
        source: "Bloomberg"
      },
      {
        id: 9,
        emoji: "🧬",
        title: "Revolutionary Cancer Treatment Shows 90% Success Rate",
        summary: "New immunotherapy approach demonstrates unprecedented results in late-stage clinical trials. FDA fast-tracks approval process as thousands of patients show complete remission within six months.",
        url: "https://reuters.com/medical",
        source: "Reuters"
      },
      {
        id: 10,
        emoji: "🌍",
        title: "Breakthrough Carbon Capture Technology Promises Net Zero by 2040",
        summary: "Scientists unveil revolutionary atmospheric carbon removal system with 99% efficiency rate. Major corporations pledge $100 billion for immediate deployment across industrial sectors worldwide.",
        url: "https://bloomberg.com/climate",
        source: "Bloomberg"
      }
    ],
    historicalEvents: [
      { year: "1991", description: "Linux operating system released by Linus Torvalds" },
      { year: "1944", description: "Paris liberated from Nazi occupation during World War II" },
      { year: "1835", description: "New York Sun publishes Great Moon Hoax articles" },
      { year: "1609", description: "Galileo demonstrates his first telescope to Venetian lawmakers" }
    ]
  };

  res.status(200).json(newsData);
}
