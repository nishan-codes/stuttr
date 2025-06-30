import React from "react";
import { Github, Mail } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="Contact" className="bg-background border-t border-border mt-auto">
      <div className="container mx-auto font-inter px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              <span className="font-[Osake] font-bold">S</span>
              <span className="font-[Mars] font-bold">TUTTR</span>
            </h3>
            <p>
              Analyze - Optimize - Win. STUTTR identifies lag, uncovers
              performance bottlenecks, and helps you optimize every frame.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://github.com/nishan-codes"
                className="text-foreground hover:text-foreground/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:revbus21@gmail.com"
                className="text-foreground hover:text-foreground/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://support.microsoft.com/en-us/windows/tips-to-improve-pc-performance-in-windows-b3b3ef5b-5953-fb6a-2528-4bbed82fba96"
                  className="text-foreground hover:text-foreground/50 transition-colors inline-flex items-center"
                >
                  Performance Guide
                </a>
              </li>
              <li>
                <a
                  href="https://tealtech.com/blog/computer-practices/"
                  className=" text-foreground hover:text-foreground/50 transition-colors inline-flex items-center"
                >
                  Best Practices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:revbus21@gmail.com"
                  className=" text-foreground hover:text-foreground/50 transition-colors inline-flex items-center"
                >
                  Contact Me
                </a>
              </li>
              <li>
                <a
                  href="mailto:revbus21@gmail.com"
                  className=" text-foreground hover:text-foreground/50 transition-colors inline-flex items-center"
                >
                  Feature Request
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex justify-center flex-col md:flex-row items-center">
            <p className="text-sm">
              © {currentYear} Nishan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
