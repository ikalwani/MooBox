import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const postsData = [
  {
    id: 1,
    type: "post",
    content: "Feeling productive today! 🚀 #Productivity #Motivation",
    likes: 20,
  },
  {
    id: 2,
    type: "post",
    content: "Stay focused and keep moo-ving forward! 🐮 #Focus #Progress",
    likes: 15,
  },
  {
    id: 3,
    type: "post",
    content: "Stay focused and keep moo-ving forward! 🐮 #Focus #Progress",
    likes: 15,
  },
  {
    id: 4,
    type: "post",
    content: "Stay focused and keep moo-ving forward! 🐮 #Focus #Progress",
    likes: 15,
  },
];

const quizzesData = [
  {
    id: 1,
    type: "quiz",
    question: "What's the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    id: 2,
    type: "quiz",
    question: "What's the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
];

const cowVideosData = [
  {
    id: 1,
    type: "video",
    title: "Funny Cow Compilation",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const FeedPage = ({ posts }) => (
  <div className="grid grid-cols-3 gap-4">
    {posts.map((post) => (
      <div
        key={post.id}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="px-6 py-4">
          <p className="text-lg font-bold">{post.content}</p>
        </div>
        <div className="px-6 py-2 flex items-center justify-between">
          <div>
            <FaHeart className="text-red-500 mr-1" />
            <span className="text-gray-600">{post.likes} Likes</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const QuizzesPage = ({ quizzes }) => {
  const [answers, setAnswers] = useState({});

  const handleOptionChange = (quizId, optionIndex) => {
    setAnswers({ ...answers, [quizId]: optionIndex });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    let incorrectCount = 0;
    const results = quizzes.map((quiz) => {
      const userAnswer = answers[quiz.id];
      const isCorrect = quiz.options[userAnswer] === quiz.answer;
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
      return { question: quiz.question, isCorrect };
    });
    alert(`Correct: ${correctCount}, Incorrect: ${incorrectCount}`);
    console.log(results);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="px-6 py-4">
            <p className="text-lg font-bold mb-2">{quiz.question}</p>
            {quiz.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`quiz-${quiz.id}`}
                  id={`option-${quiz.id}-${index}`}
                  onChange={() => handleOptionChange(quiz.id, index)}
                />
                <label htmlFor={`option-${quiz.id}-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmitQuiz}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

const CowVideosPage = ({ videos }) => (
  <div className="grid grid-cols-1 gap-4">
    {videos.map((video) => (
      <div
        key={video.id}
        className="bg-white shadow-md rounded-lg overflow-hidden"
      >
        <div className="px-6 py-4">
          <p className="text-lg font-bold">{video.title}</p>
          <iframe
            width="100%"
            height="315"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ))}
  </div>
);

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("feed");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-[#eee8aa] border-b border-gray-300 p-4 flex justify-center items-center">
        <button
          className={`mx-2 px-4 py-2 rounded focus:outline-none ${
            activeTab === "feed" ? "bg-[#fffaf0] text-black" : "text-blue-500"
          }`}
          onClick={() => handleTabChange("feed")}
        >
          Feed
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded focus:outline-none ${
            activeTab === "quizzes" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => handleTabChange("quizzes")}
        >
          Quizzes
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded focus:outline-none ${
            activeTab === "videos" ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
          onClick={() => handleTabChange("videos")}
        >
          Cow Videos
        </button>
      </header>

      {activeTab === "feed" && <FeedPage posts={postsData} />}
      {activeTab === "quizzes" && <QuizzesPage quizzes={quizzesData} />}
      {activeTab === "videos" && <CowVideosPage videos={cowVideosData} />}
    </div>
  );
};

export default HomePage;
