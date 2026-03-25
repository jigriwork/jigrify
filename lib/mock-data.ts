export type FeedPost = {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  caption: string;
  image: string;
  likes: string;
  comments: number;
  time: string;
};

export type InboxThread = {
  id: string;
  name: string;
  preview: string;
  unread: number;
  status: "online" | "away";
};

export const feedPosts: FeedPost[] = [
  {
    id: "p1",
    author: "Aarya Glow",
    handle: "@aaryaglows",
    avatar: "AG",
    caption: "Night core edits + rooftop vibes. Who's awake? ✨",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&q=80&auto=format&fit=crop",
    likes: "12.4K",
    comments: 492,
    time: "2m",
  },
  {
    id: "p2",
    author: "Ritvik Lane",
    handle: "@ritvklane",
    avatar: "RL",
    caption: "Dropped a mini vlog from campus fest — chaos but make it cinematic 🎬",
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=80&auto=format&fit=crop",
    likes: "8.1K",
    comments: 301,
    time: "15m",
  },
];

export const exploreTiles = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460355976672-71c3f0a4bdac?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515165562835-c4c9ea6a1f74?w=900&q=80&auto=format&fit=crop",
];

export const inboxThreads: InboxThread[] = [
  {
    id: "t1",
    name: "Creators Room",
    preview: "New collab brief just dropped 🚀",
    unread: 4,
    status: "online",
  },
  {
    id: "t2",
    name: "Nia",
    preview: "Sending the reel cover in 2 mins",
    unread: 1,
    status: "away",
  },
  {
    id: "t3",
    name: "Dev Meme Squad",
    preview: "This bug is now a feature 😭",
    unread: 0,
    status: "online",
  },
];
