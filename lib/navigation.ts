import {
  Compass,
  House,
  MessageCircle,
  PlusSquare,
  UserRound,
} from "lucide-react";

export const appNavItems = [
  { label: "Home", href: "/app/home", icon: House },
  { label: "Explore", href: "/app/explore", icon: Compass },
  { label: "Create", href: "/app/create", icon: PlusSquare },
  { label: "Inbox", href: "/app/inbox", icon: MessageCircle },
  { label: "Profile", href: "/app/profile", icon: UserRound },
];
