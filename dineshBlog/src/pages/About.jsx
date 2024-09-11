import React from "react";

const About = () => {
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="max-w-2xl mx-auto p-3 text-center ">
        <div className="">
          <h1 className="text-3xl font-semibold text-center my-7">
            About this blog:
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Welcome to <span className="text-teal-400">Dinesh's Blog</span>, a
              space where I explore a variety of topics that inspire me. Whether
              you're passionate about technology, web development, or personal
              growth, this blog has something for everyone. My aim is to provide
              valuable insights and helpful tips to guide you through these
              exciting areas.
            </p>
            <p>
              In the world of technology, I'll dive into web development trends,
              coding tutorials, and best practices for building efficient
              applications. For those seeking to boost productivity or improve
              their personal development, I'll share strategies, tools, and
              experiences that have helped me grow.
            </p>
            <p>
              Whether you're here to learn, get inspired, or join in on
              thought-provoking conversations, I hope this blog serves as a
              resource for your journey. Don't hesitate to engage with the
              content, share your thoughts, and be part of this ever-growing
              community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
