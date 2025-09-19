// Placeholder MeTube dataset with plenty of content
// Generates a diverse offline video catalog across many categories

const colorPalette = [
  '#e57373',
  '#64b5f6',
  '#81c784',
  '#ffb74d',
  '#ba68c8',
  '#4db6ac',
  '#9575cd',
  '#f06292',
  '#7986cb',
  '#aed581',
  '#ffd54f',
  '#4fc3f7',
];

const categories = [
  { name: 'Music', channels: ['Echo Beats', 'RetroWave', 'Lofi Corner'] },
  { name: 'Gaming', channels: ['PixelPlays', 'BossFights', 'IndieQuest'] },
  { name: 'Education', channels: ['BrainFuel', 'MinuteLearn', 'Study Hall'] },
  { name: 'Science', channels: ['Deep Space', 'Lab Notes', 'Quantum Club'] },
  { name: 'News', channels: ['Daily Digest', 'Global Brief', 'Local Loop'] },
  { name: 'Sports', channels: ['CourtSide', 'Goal Rush', 'TrailRun'] },
  { name: 'Tech', channels: ['Dev Bytes', 'CircuitCity', 'AI Insider'] },
  { name: 'Cooking', channels: ['Pan & Spoon', 'KitchenCraft', 'QuickBites'] },
  { name: 'Travel', channels: ['Wanderly', 'CityWalks', 'Nomad North'] },
  { name: 'Comedy', channels: ['LaughTrack', 'Sketch Nook', 'Bit Gags'] },
  { name: 'DIY', channels: ['MakerMind', 'FixItFast', 'Home Hacks'] },
  { name: 'Art', channels: ['CanvasLab', 'Ink&Pixel', 'Color Theory'] },
  { name: 'Vlogs', channels: ['Daily Dave', 'City Wanderer', 'HomeLife'] },
  { name: 'ASMR', channels: ['Tingle Time', 'Soft Sounds', 'Whisper Lab'] },
  { name: 'Pranks', channels: ['Prank Patrol', 'Gotcha Gang', 'Hidden Camera HQ'] },
  { name: 'Memes', channels: ['Meme Stream', 'Dank Depot', 'Template Town'] },
  { name: 'Absurdist Humor', channels: ['Nonsense Network', 'Banana Desk', 'Left Field Laughs'] },
  { name: 'Brain Rot', channels: ['Infinite Scroll', 'Dopamine Loops', 'Short Attention'] },
];

const sampleTitles = {
  Music: [
    'Chill Beats to Focus To',
    'Synthwave Night Drive Mix',
    'Top Acoustic Covers 2025',
    'Piano for Deep Work',
  ],
  Gaming: [
    'Speedrunning Classic Levels',
    'Top 10 Boss Fights',
    'Indie Game Hidden Gems',
    'Hardcore Survival Challenge',
  ],
  Education: [
    'Learn Calculus in 30 Minutes',
    'History of the Internet',
    'Critical Thinking Crash Course',
    'Language Learning Tips',
  ],
  Science: [
    'The James Webb Explained',
    'Quantum Entanglement Visualized',
    'The Microbiome in 12 Minutes',
    'Why the Sky is Not Blue',
  ],
  News: [
    'Weekly Tech Roundup',
    'Global Headline Recap',
    'Market Watch: This Week',
    'Local Stories You Missed',
  ],
  Sports: [
    'Epic Last-Minute Goals',
    'Marathon Training Guide',
    'Top Dunks of the Season',
    'Trail Running Essentials',
  ],
  Tech: [
    'AI Trends You Should Know',
    'Build a PC in 20 Minutes',
    'Frontend Performance Myths',
    'The Future of Mobile',
  ],
  Cooking: [
    '5-Minute Breakfast Ideas',
    'Perfect Pasta Every Time',
    'Knife Skills 101',
    'Meal Prep on a Budget',
  ],
  Travel: [
    'Hidden Gems in Tokyo',
    'Backpacking Europe Basics',
    'City Walks: Paris',
    'Best Coastal Drives',
  ],
  Comedy: [
    'Sketch: The WiFi Wizard',
    'Try Not to Laugh Challenge',
    'Office Pranks Compilation',
    'One Minute Improv',
  ],
  DIY: [
    'Build a Bookshelf Fast',
    'Fix a Dripping Faucet',
    '3D Printing for Beginners',
    'Home Automation Basics',
  ],
  Art: [
    'Watercolor Landscapes',
    'Digital Painting Workflow',
    'Sketching People in Motion',
    'Color Theory Essentials',
  ],
  Vlogs: [
    'Day in My Life',
    'City Walk Vlog',
    'Morning Routine Vlog',
    'Travel Vlog: Weekend Getaway',
  ],
  ASMR: [
    'Keyboard Typing ASMR',
    'Soft Spoken Storytime',
    'Tapping and Scratching',
    'Sleep Triggers Compilation',
  ],
  Pranks: [
    'Epic Office Prank',
    'Prank Call Compilation',
    'Hidden Camera Reactions',
    'Public Pranks Gone Right',
  ],
  Memes: [
    'Top Memes of the Week',
    'Meme Review',
    'Dank Meme Compilation',
    'Try Not to Laugh: Memes',
  ],
  'Absurdist Humor': [
    'The Chair That Sings',
    'Banana Interview Series',
    'Microwave Philosophy',
    'Unboxing Nothing',
  ],
  'Brain Rot': [
    'Infinite Skibidi Megamix',
    'Gyatt Compilation 24/7',
    'Sigma Edit Marathon',
    'Random Core Aesthetic',
  ],
};

function toDuration(minutes) {
  const m = Math.max(1, Math.floor(minutes));
  const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${m}:${s}`;
}

function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeId(categoryIndex, i) {
  return `v_${categoryIndex}_${i}`;
}

// Fisher-Yates shuffle to randomize arrays without mutating input
function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Expand a small set of base titles into a larger set of unique, varied titles
function expandTitles(baseTitles, count) {
  const variants = [
    'Chill Mix',
    'Live Session',
    'Extended Cut',
    'Compilation',
    'Highlights',
    'Tutorial',
    '2025 Edition',
    'Instrumental',
    'Ambient',
    'Night Drive',
    'Study Mix',
    'Acoustic',
    'Remastered',
    'Deep Focus',
    'Beginner Guide',
    'Pro Tips',
  ];

  const pool = [];
  baseTitles.forEach((base) => {
    pool.push(base);
    variants.forEach((variant) => {
      pool.push(`${base} - ${variant}`);
    });
  });

  const unique = Array.from(new Set(pool));
  const shuffled = shuffle(unique);
  if (shuffled.length >= count) return shuffled.slice(0, count);
  // Fallback (unlikely): pad with generic unique titles
  const padded = [...shuffled];
  for (let i = shuffled.length; i < count; i += 1) {
    padded.push(`Untitled Video Variant ${i + 1}`);
  }
  return padded;
}

export function generateVideos() {
  const all = [];
  let colorIndex = 0;
  categories.forEach((cat, cIdx) => {
    const baseTitles = sampleTitles[cat.name] || ['Untitled Video'];
    const titles = expandTitles(baseTitles, 8);
    // Generate 8 videos per category with unique, varied titles
    for (let i = 0; i < 8; i += 1) {
      const id = makeId(cIdx, i);
      const title = titles[i % titles.length];
      const channel = randomFrom(cat.channels);
      const duration = toDuration(4 + Math.random() * 30);
      const views = formatViews(Math.floor(1000 + Math.random() * 5_000_000));
      const ageDays = Math.floor(1 + Math.random() * 1000);
      const ago = ageDays < 30 ? `${ageDays} days ago` : `${Math.floor(ageDays / 30)} months ago`;
      const tags = [cat.name.toLowerCase(), 'metube', 'offline', 'video'];
      const color = colorPalette[colorIndex % colorPalette.length];
      colorIndex += 1;
      all.push({
        id,
        title,
        channel,
        category: cat.name,
        duration,
        views,
        ago,
        tags,
        thumbnailColor: color,
        description:
          `${title} — A ${cat.name.toLowerCase()} video on MeTube. Offline-friendly placeholder content for the Interverse.`,
      });
    }
  });
  return all;
}

export const videos = generateVideos();

export function getVideoById(id) {
  return videos.find((v) => v.id === id);
}

export function getVideosByChannel(channel) {
  return videos.filter((v) => v.channel === channel);
}

export default videos;


