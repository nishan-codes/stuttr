import Link from "next/link";
import React from "react";
import { ModeToggle } from "./ui/Mode";
import Header from "./ui/curved-menu";
import { RevealText } from "./gsap/reveal-text";
import { SignedIn, UserButton } from "@clerk/nextjs";

const navLinks = [
  { link: "/", name: "Home" },
  { link: "#Contact", name: "Contact" },
  { link: "/dashboards", name: "Dashboards" },
];

const Navbar: React.FC = () => {
  return (
    <header className="mt-0 sm:mt-3 fixed top-0 left-0 right-0 z-50 shadow-header h-16">
      <div id="portal"></div>
      <div className="flex items-center justify-between container mx-auto px-3 max-sm:px-3 h-full">
        <nav className=" w-[100%] flex relative items-center justify-between h-full">
          {/* Left Side - Logo and Brand */}
          <div className="flex border bg-card border-border shadow-lg rounded-lg py-2 px-3 items-center gap-2">
            <div className="text-2xl lg:text-3xl max-sm:text-xl cursor-pointer">
              <Link href={"/"}>
                <span className="font-[Osake] font-bold">S</span>
                <span className="font-[Mars] font-bold">TUTTR</span>
              </Link>
            </div>
          </div>

          <div className="border py-2 px-3 border-border rounded-lg bg-card shadow-lg desktop relative font-arial font-semibold">
            <ul className="flex items-center mr-2">
              {navLinks.map(({ link, name }) => (
                <li key={name} className="group">
                  <Link href={link} scroll={true}>
                    <span>{name}</span>
                    <span className="underline" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex max-sm:relative max-sm:right-12">
              <RevealText type="lines">
                <ModeToggle />
              </RevealText>
              <div className="inline-block relative top-1 ml-2">
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-sm:border max-sm:p-1 bg-card shadow-lg border-border rounded-lg">
          <div className="sm:hidden flex items-center gap-x-2">
            <div className="relative max-sm:mr-12">
              <RevealText type="lines">
                <ModeToggle />
              </RevealText>
            </div>
            <div className="relative top-0.5 right-12">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
          <Header />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
