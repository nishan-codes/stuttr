import { HoverEffect } from "@/components/ui/hover-effect";
import { getDashboards } from "@/lib/actions/actions";
import React from "react";

const fallBackProjects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
];

const page = async () => {
    let dashboards;

    try {
        dashboards = await getDashboards();
    } catch (error) {
        console.error('Error fetching dashboards', error);
    }

    const cards = Array.isArray(dashboards) && dashboards.length > 0
    ? dashboards.map(item => ({
        title: item.title,
        description: `Created at ${new Date(item.created_at).toLocaleString()}`,
        link: `/dashboard/${item.id}`
    }))
    : fallBackProjects;
  
    return (
    <div className="h-dvh">
      <div className="container my-10 flex justify-around mx-auto">
        <HoverEffect items={cards} />
      </div>
    </div>
  );
};

export default page;
