"use client";

import Link from "next/link";
import React from "react";

const routes = [
  { href: "/", label: "Home" },
  { href: "/add", label: "Add Title" },
];

export default function NavBar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold">Vercel Title Board</span>
        <div className="flex gap-6">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className="hover:underline">
              {route.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
