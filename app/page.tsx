"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Upload,
  BarChart3,
  Zap,
  Shield,
  Clock,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/neon-button";
import { redirect } from "next/navigation";

// Animated background particles component
const ParticleBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-teal/20 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What file formats does STUTTR support?",
      answer:
        "STUTTR currently supports CSV log files from most popular games and performance monitoring tools. We're continuously adding support for more formats based on user feedback.",
    },
    {
      question: "How accurate is the performance analysis?",
      answer:
        "Our AI-powered analysis engine provides highly accurate insights by examining multiple performance metrics simultaneously. The system has been trained on thousands of gaming sessions to identify patterns and issues.",
    },
    {
      question: "Do I need technical knowledge to use STUTTR?",
      answer:
        "Yes. Little knowledge of MSI Afterburner is needed to generate CSVs for benchmark",
    },
  ];

  return (
    // <BackgroundLines className="bg-background flex w-full flex-col px-4">
    <section className="">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            Get answers to common questions about STUTTR
          </p>
        </motion.div>

        <div className="mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-lg border border-border"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-card/90 transition-colors rounded-lg"
              >
                <span className="font-medium text-foreground">
                  {faq.question}
                </span>
                {openFaq === index ? (
                  <ChevronDown className="w-5 h-5 text-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-foreground" />
                )}
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-foreground">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    // </BackgroundLines>
  );
};

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />

        {/* Gradient Background */}

        <div className="absolute inset-0 bg-background" />
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8 }}
              >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-card border-border rounded-2xl mb-6 shadow-xl">
                  <Gamepad2 className="w-10 h-10 text-foreground" />
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
                Stop the{" "}
                <span className="bg-gradient-to-t from-cyan-200 to-cyan-900 bg-clip-text text-transparent">
                  Stutter
                </span>
                <br />
                <span className="text-teal">
                  Start{" "}
                  <span className="bg-gradient-to-t from-red-100 to-red-500 bg-clip-text text-transparent">
                    Winning
                  </span>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Advanced AI-powered performance analysis that identifies lag
                causes, optimizes your setup, and gives you the competitive edge
                you deserve.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => redirect("/upload")}
                    variant={"default"}
                  >
                    Analyze Your Performance
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Three Steps to Perfect Performance
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Our AI-powered analysis makes performance optimization simple and
              effective
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Your Log",
                description:
                  "Simply drag and drop your game's performance log file. We support all major formats and games.",
              },
              {
                icon: BarChart3,
                title: "AI Analysis",
                description:
                  "Our advanced AI analyzes thousands of data points to identify performance bottlenecks and issues.",
              },
              {
                icon: Zap,
                title: "Get Optimized",
                description:
                  "Receive personalized recommendations and watch your performance soar to new heights.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="hover:border-accent relative bg-card p-8 rounded-2xl border border-border shadow-xl hover:border-teal/50 transition-all duration-300 group"
              >
                <div className="group-hover:text-teal-500 transition-colors ease-in-out mb-6 mt-4 text-foreground">
                  <item.icon className="w-12 h-12 text-teal transition-transform duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-background py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Powerful Features for Peak Performance
            </h2>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Everything you need to identify, analyze, and eliminate
              performance issues
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Real-time Analysis",
                description:
                  "Get instant insights into your game's performance with our lightning-fast analysis engine.",
              },
              {
                icon: Clock,
                title: "Frame Time Precision",
                description:
                  "Detect micro-stutters and frame time inconsistencies that impact your gaming experience.",
              },
              {
                icon: TrendingUp,
                title: "Performance Trends",
                description:
                  "Track your performance improvements over time with detailed historical data.",
              },
              {
                icon: Award,
                title: "Competitive Edge",
                description:
                  "Gain the advantage with optimizations specifically designed for competitive gaming.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border shadow-xl hover:border-teal/50 transition-all duration-300 text-center group"
              >
                <div className="mb-4">
                  <feature.icon className="w-10 h-10 text-teal mx-auto  transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA Section */}
      <section className="max-sm:pt-60 pb-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-12 mb-6">
              Ready to Eliminate Lag Forever?
            </h2>
            <p className="text-xl text-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of gamers who have already optimized their
              performance with STUTTR
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={() => redirect("/upload")} variant={"default"}>
                Start Your Analysis Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
