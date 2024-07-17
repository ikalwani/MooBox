import React from "react";
import {BrowserRouter as Router,Route,Routes,Link,useLocation,} from "react-router-dom";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import "./App.css";
import cow from "./images/cow.png";
import cowSound from "./cow-sound.mp3";
import checkList from "./images/checklist.png";
import timer from "./images/timer.png";
import motivation from "./images/motivation.png";
import fm from "./images/fm.webp";
import PomodoroPage from "./PomodoroPage.js";
import TodoListPage from "./TodoListPage.js";
import MotivationPage from "./MotivationPage.js";
import { SpeedInsights } from "@vercel/speed-insights/react";

const LoginPage = () => {
  //store input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password");
    } else {
      // Perform login logic here (e.g., API call)
      // For demonstration purposes, we'll just log the email and password
      console.log("Email:", email);
      console.log("Password:", password);
      // Reset the form fields and error message
      setEmail("");
      setPassword("");
      setError("");
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-8">Login</h1>
      <p className="text-md font-bold text-center mt-2">Howdy!</p>
      <form className="mt-8" onSubmit={handleSubmit}>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center mb-10px">
          <form className="flex flex-col">{/* Your form fields here */}</form>
          <button
            type="submit"
            className="bg-[#eee8aa] border shadow-md text-black px-4 py-2 rounded-md hover:bg-[#d3d3d3] transition-colors font-bold mt-4"
            style={{ marginTop: "50px", marginBottom: "220px" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto flex justify-between items-center p-6">
      <div
        className="text-xl font-bold flex items-center"
        style={{ fontFamily: "Roboto Mono, sans-serif" }}
      >
        <Link to="/" className="flex items-center mr-2">
          <img src={cow} alt="Cow" className="h-8" />
          <span className="ml-2 mooBoxText">MooBox</span>
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-9">
          <li>
            <a href="/" className="text-gray-700 hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-gray-700 hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/todo" className="text-gray-700 hover:underline">
              Tasks
            </a>
          </li>
          <li>
            <a href="/motivation" className="text-gray-700 hover:underline">
              Moo-tivation
            </a>
          </li>
        </ul>
      </nav>
      <Link to="/login" className="text-gray-700 hover:underline">
        <button className="border border-black border-b-2 border-r-2 px-4 py-2 hover:bg-gray-200 shadow-lg">
          LOG IN
        </button>
      </Link>
    </div>
  </header>
);

const PomodoroLink = () => {
  return (
    <Link to="/pomodoro">
        <h2 className="text-xl font-bold">Pomodoro Timer</h2>
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-700">
            Adjust the duration of tasks to suit your preferences and attention
            span.
          </p>
          <img src={timer} alt="timer" className="h-20 mx-auto mt-2" />
        </div>
    </Link>
  );
};


const ToDoLink = () => {
  return (
    <Link to="/todo">
      <h2 className="text-xl font-bold">To-Do List and Daily Planner</h2>
      <div className="mt-3 text-center">
        <p className="text-sm text-gray-700">
          Organize tasks with cow-themed categories.
        </p>
        <img src={checkList} alt="checklist" className="h-20 mx-auto mt-2" />
      </div>
    </Link>
  );
};

const MotivationLink = () =>{
return (
  <Link to="/motivation">
    <h2 className="text-xl font-bold">Moo-tivation</h2>
    <div className="mt-3 text-center">
      <p className="text-sm text-gray-700">
        A place to find encouragement and "Moo-tivational Quotes" to keep you
        inspired.
      </p>
      <img src={motivation} alt="motivation" className="h-20 mx-auto mt-2" />
    </div>
  </Link>
);
};

const MainSection = () => {
  //cow sound
  const playCowSound = () => {
    const audio = new Audio(cowSound);
    audio.play();
  };

  return (
    <main className="bg-[#eee8aa] text-center py-20">
      <div className="container mx-auto flex items-center">
        <div className="flex-1 text-left">
          <div>
            <h1 className="text-4xl font-bold mb-4">Welcome to MooBox</h1>
            <p className="text-lg mb-6">
              Tired of feeling overwhelmed and unfocused? Say goodbye to
              productivity woes and hello to MooBox - your ultimate
              moo-tivational companion.
            </p>
            <div className="flex justify-left space-x-4 mb-8">
              <Link to="/about" className="text-black">
                <button className="border border-black border-b-2 border-r-2 px-6 py-2 hover:bg-gray-100 bg-white">
                  ABOUT
                </button>
              </Link>
              <button
                className="border border-black border-b-2 border-r-2 px-6 py-2 bg-white hover:bg-gray-100"
                onClick={playCowSound}
              >
                MOO IT!
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex-1 relative"
          style={{ top: "-90px", left: "100px" }}
        >
          <img
            src={cow}
            alt="Cow icon"
            className="mx-auto"
            style={{
              position: "absolute",
              animation: "walk 10s infinite",
              width: "200px",
              height: "auto",
            }}
          />
        </div>
      </div>
    </main>
  );
};

const StatisticsSection = () => (
  <section className="bg-[#fffff] text-center py-10">
    <div className="container mx-auto grid grid-cols-4 gap-4">
      <div className="relative p-4 rounded-lg bg-[#eee8aa] shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
        <ToDoLink />
      </div>
      <div className="p-4 rounded-lg bg-[#eee8aa] shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
          <PomodoroLink />
      </div>
      <div className="p-4 rounded-lg bg-[#eee8aa] shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
        <MotivationLink />
      </div>
      <div className="p-4 rounded-lg bg-[#eee8aa] shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
        <h2 className="text-xl font-bold">Focus Mode</h2>
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-700">
            Enhance your concentration with the distraction-free zone to keep
            you on track.
          </p>
          <img src={fm} alt="focus_mode" className="h-20 mx-auto mt-2" />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const handleHover = (e) => {
    e.target.style.color = e.type === "mouseenter" ? "#3b82f6" : "black";
  };

  return (
    <footer className="bg-gray-300 py-5 border border-black">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-left">
          <h2 className="text-xl mb-2">Moo-</h2>
          <p className="text-xl font-bold mb-4">Crafting Productive</p>
        </div>
        <div className="grid grid-cols-1.5 gap-6 text-left">
          <div className="space-y-2">
            <p className="text-sm">Moo-Privacy Policy</p>
            <p className="text-sm">Moo-Terms of Service</p>
            <p className="text-sm">Moo-Copyright Information</p>
            <p className="text-sm flex items-center">
              Contact
              <a
                href="mailto:ikalwani@umich.edu"
                className="ml-2 contact-link"
                style={{ color: "black", transition: "color 0.3s" }}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
              >
                <FaEnvelope />
              </a>
              <a
                href="https://www.linkedin.com/in/isha-kalwani"
                className="ml-2 contact-link"
                style={{ color: "black", transition: "color 0.3s" }}
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
              >
                <FaLinkedin />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AboutPage = () => {
  return (
    <>
      <header className="bg-[#eee8aa] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About MooBox</h1>
          <p className="text-md">
            At MooBox, productivity should not be a chore - it should be an
            enjoyable journey filled with fun, creativity, and a whole lot of
            moo-tivation! Inspired by the calming presence and endearing nature
            of cows, I have created a productivity app that combines practical
            tools with a delightful cow-themed twist.
          </p>
        </div>
      </header>
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-bold mb-4">The Mission</h2>
              <p className="text-sm">
                At Moobox, my aim is to help individuals who have experienced
                the challenges of staying focused and organized through
                comprehensive productivity features and a playful, cow-themed
                aesthetic. MooBox aims to create an immersive and stimulating
                environment that fosters focus, organization, and a sense of
                accomplishment.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-bold mb-4">The Inspiration</h2>
              <p className="text-sm">
                As an individual who has experienced the challenges of staying
                focused and organized, especially as a college student, I
                understand the struggle of balancing productivity with
                enjoyment. That is why MooBox has been infused with a playful
                cow-themed aesthetic - because who doesn't love cows?
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2 hover:shadow-xl transform transition duration-300 hover:scale-105">
              <h2 className="text-2xl font-bold mb-4">Research Articles</h2>
              <p className="text-sm">
                Numerous studies have shown that combining practical tools with
                engaging and enjoyable elements can significantly enhance
                motivation, attention, and overall task completion rates. I have
                included specific references to research studies and articles
                that help to reinforce the scientific and research-backed
                principles behind MooBox's approach.
              </p>
              <ul className="list-disc list-inside text-sm mt-4">
                <li>
                  <a
                    href="https://www.researchgate.net/publication/311357296_Finding_Fun_in_Work_The_Effect_of_Workplace_Fun_on_Taking_Charge_and_Job_Engagement"
                    className="text-blue-500 hover:underline"
                  >
                    Finding Fun in Work
                  </a>
                </li>
                <li>
                  <a
                    href="https://globusedujournal.in/wp-content/uploads/2021/08/GE-JD21-Dr.-Sugay-J..pdf"
                    className="text-blue-500 hover:underline"
                  >
                    The Effects of Pomodoro Technique On Academic-related tasks
                  </a>
                </li>
                <li>
                  <a
                    href="https://slejournal.springeropen.com/articles/10.1186/s40561-019-0098-x"
                    className="text-blue-500 hover:underline"
                  >
                    The Impact of Gamification on Students' Learning
                  </a>
                </li>
                <li>
                  <a
                    href="https://dailyfreepress.com/2022/02/15/the-psychology-behind-to-do-lists-and-why-you-should-make-one/"
                    className="text-blue-500 hover:underline"
                  >
                    The Psychology Behind To-do Lists and Why you Should Make
                    One
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.literaturelust.com/post/the-powerful-effects-motivational-quotes-have-on-our-brains-and-our-lives"
                    className="text-blue-500 hover:underline"
                  >
                    The Powerful Effects Motivational Quotes Have on Our Brains
                    and Our Lives
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/todo" element={<TodoListPage />} />
        <Route path="/motivation" element={<MotivationPage />} />
      </Routes>
      {isHome && <StatisticsSection />}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
