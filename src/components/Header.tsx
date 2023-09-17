import { getCollection } from "astro:content";
import { Button } from "./ui/button";
import type { Link } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MoreHorizontal, X, ChevronUp, ChevronDown } from "lucide-react";
import React from "react";

const areas = await getCollection("climbingAreas");

const links: Link[] = [
  { name: "Home", link: "/", selected: (pathname) => pathname === "/" },
  {
    name: "Climbing Areas",
    link: "/areas",
    selected: (pathname) => pathname.startsWith("/areas"),
    children: areas.map((area) => ({
      name: area.data.title,
      link: `/areas/${area.slug}`,
      selected: (pathname) => pathname.startsWith(`/areas/${area.slug}`),
    })),
  },
  {
    name: "Resources",
    link: "/resources",
    selected: (pathname) => pathname.startsWith("/resources"),
  },
  {
    name: "Contact",
    link: "/contact",
    selected: (pathname) => pathname.startsWith("/contact"),
  },
];

const PageLink: React.FC<{ link: Link; pathname: string }> = ({
  link,
  pathname,
}) => (
  <li className="relative group">
    <a href={link.link}>
      <Button
        className="w-full"
        variant={link.selected(pathname) ? "default" : "secondary"}
      >
        {link.name}
      </Button>
    </a>
    {link.children && (
      <div className="absolute hidden md:group-hover:flex bg-card shadow border flex-col p-1 min-w-[10rem] rounded-md">
        {link.children.map((child) => (
          <a href={child.link}>
            <Button
              className="w-full justify-start"
              variant={child.selected(pathname) ? "secondary" : "ghost"}
            >
              {child.name}
            </Button>
          </a>
        ))}
      </div>
    )}
  </li>
);

export const Header: React.FC<{ pathname: string }> = ({ pathname }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="bg-card border-b shadow px-6 py-4 flex justify-center flex-col md:flex-row md:item-center md:justify-between gap-4">
      <div className="flex justify-between items-center">
        <a href="/">
          <h1 className="text-xl font-bold text-emerald-500 my-2">
            🧗 RockClimbPG
          </h1>
        </a>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden"
        >
          {open ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>

      <ul
        className={cn(
          "flex gap-3 flex-col",
          { hidden: !open },
          "md:flex md:flex-row md:items-center"
        )}
      >
        {links.map((link) => (
          <PageLink link={link} pathname={pathname} />
        ))}
      </ul>
    </header>
  );
};
