// src/components/HowItWorks.js
import React from "react";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <span className="ml-2 font-bold">Moo-tivation</span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-black hover:text-gray-700">
              Barn
            </a>
            <a href="#" className="text-black hover:text-gray-700">
              Grazing
            </a>
            <a href="#" className="text-black hover:text-gray-700">
              Pasture
            </a>
            <div className="flex items-center space-x-2">
              <span className="text-black">Howdy, Partner</span>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto py-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4">Add daily task</h1>
          <div className="flex justify-center space-x-2">
            <button className="bg-white border px-4 py-2 rounded-md">
              ALL
            </button>
            <button className="bg-white border px-4 py-2 rounded-md">
              FOCUS
            </button>
            <button className="bg-green-300 border px-4 py-2 rounded-md">
              ORGANIZE
            </button>
            <button className="bg-white border px-4 py-2 rounded-md">
              MOTIVATE
            </button>
            <button className="bg-white border px-4 py-2 rounded-md">
              PRODUCTIVITY
            </button>
            <button className="bg-white border px-4 py-2 rounded-md">
              TOOLS
            </button>
            <button className="bg-white border px-4 py-2 rounded-md">
              RESOURCES
            </button>
          </div>
        </div>

        {/* Moo-sic Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Moo-sic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="bg-green-300 p-4 rounded-md">Milking Time</div>
            <div className="bg-green-300 p-4 rounded-md">Moo-dy Cat</div>
            <div className="bg-green-300 p-4 rounded-md">Haystack Dreams</div>
            <div className="bg-green-300 p-4 rounded-md">Cowboy Sleep</div>
            <div className="bg-green-300 p-4 rounded-md">Moo-tivation</div>
            <div className="bg-green-300 p-4 rounded-md">Nap Time</div>
            <div className="bg-green-300 p-4 rounded-md">Yeehaw, Focus!</div>
            <div className="bg-green-300 p-4 rounded-md">Cowboy Relax</div>
          </div>
        </div>

        {/* Moo-tations Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Moo-tations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-300 p-4 rounded-md">Roundup & Focus</div>
            <div className="bg-green-300 p-4 rounded-md">Barn Routine</div>
            <div className="bg-green-300 p-4 rounded-md">
              Bringing Farm Vibes
            </div>
            <div className="bg-green-300 p-4 rounded-md">Rancher's Beauty</div>
            <div className="bg-green-300 p-4 rounded-md">Less Stress, More</div>
          </div>
        </div>

        {/* Cow-videos Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Cow-videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-300 p-4 rounded-md">
              Moo-ful Slumber: Udderly Restful
            </div>
            <div className="bg-green-300 p-4 rounded-md">
              Milk Well, Live Well
            </div>
            <div className="bg-green-300 p-4 rounded-md">
              The Moo of Good Milk
            </div>
            <div className="bg-green-300 p-4 rounded-md">
              Milkful Moo-silience
            </div>
            <div className="bg-green-300 p-4 rounded-md">
              Daily Milks: Enhancing Moo
            </div>
          </div>
        </div>

        {/* Cowizzes Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Cowizzes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-green-300 p-4 rounded-md">Moo Matters</div>
            <div className="bg-green-300 p-4 rounded-md">Path to Milkgress</div>
            <div className="bg-green-300 p-4 rounded-md">Milkness Wisdom</div>
            <div className="bg-green-300 p-4 rounded-md">Farm Growth</div>
            <div className="bg-green-300 p-4 rounded-md">Unlock your moo</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-10">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="text-2xl font-bold">Moo-</span>
            <span className="text-2xl">Crafting Productive</span>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="w-10 h-10 bg-gray-300 rounded-full"></a>
            <a href="#" className="w-10 h-10 bg-gray-300 rounded-full"></a>
            <a href="#" className="w-10 h-10 bg-gray-300 rounded-full"></a>
          </div>
          <div className="flex justify-center space-x-10 text-sm">
            <div className="space-y-1">
              <a href="#" className="block">
                Dashboard
              </a>
              <a href="#" className="block">
                Tools
              </a>
              <a href="#" className="block">
                Opportunities
              </a>
              <a href="#" className="block">
                Career
              </a>
              <a href="#" className="block">
                Contact
              </a>
            </div>
            <div className="space-y-1">
              <a href="#" className="block">
                Moo-Privacy
              </a>
              <a href="#" className="block">
                Moo-Terms of Service
              </a>
              <a href="#" className="block">
                Moo-Copyright
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
