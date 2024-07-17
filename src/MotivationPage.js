import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import cow from "./images/cow.png";

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
    content:
      "Don't cry over spilled milk, learn and moo-ve on! 🥛 #Resilience #Growth",
    likes: 5,
  },
  {
    id: 4,
    type: "post",
    content: "Milk every opportunity for success! 🥇 #Determination #Ambition",
    likes: 20,
  },
  {
    id: 5,
    type: "post",
    content:
      "Herd your thoughts, focus your energy! 🧠 #Mindfulness #Productivity",
    likes: 21,
  },
  {
    id: 6,
    type: "post",
    content:
      "Moo-tivation is what gets you started, habit is what keeps you going! 🏃‍♀️ #Consistency #Habit",
    likes: 7,
  },
  {
    id: 7,
    type: "post",
    content:
      "Graze your way to greatness, one task at a time! 🌾 #SmallSteps #BigAchievements",
    likes: 34,
  },
  {
    id: 8,
    type: "post",
    content:
      "Don't let procrastination be the udder destruction of your dreams! ⏳ #TimeManagement #Action",
    likes: 10,
  },
];

// Sample data for quizzes
const quizzesData = [
  {
    id: 1,
    type: "quiz",
    question: "What is the average weight of an adult cow?",
    options: ["500 pounds", "1000 pounds", "1500 pounds", "2000 pounds"],
    answer: "1500 pounds",
  },
  {
    id: 2,
    type: "quiz",
    question: "How many stomachs does a cow have?",
    options: ["1", "2", "3", "4"],
    answer: "4",
  },
  {
    id: 3,
    type: "quiz",
    question: "What is the scientific name for a cow?",
    options: [
      "Bos taurus",
      "Equus ferus caballus",
      "Ovis aries",
      "Sus scrofa domesticus",
    ],
    answer: "Bos taurus",
  },
  {
    id: 4,
    type: "quiz",
    question: "What is a group of cows called?",
    options: ["Flock", "Herd", "Pack", "School"],
    answer: "Herd",
  },
  {
    id: 5,
    type: "quiz",
    question: "Which of the following is not a breed of dairy cow?",
    options: ["Jersey", "Hereford", "Holstein", "Guernsey"],
    answer: "Hereford",
  },
  {
    id: 6,
    type: "quiz",
    question:
      "Which breed of cow is known for its distinctive white and black patches?",
    options: ["Angus", "Limousin", "Simmental", "Holstein"],
    answer: "Holstein",
  },
  {
    id: 7,
    type: "quiz",
    question: "What is the gestation period of a cow?",
    options: ["6 months", "9 months", "12 months", "18 months"],
    answer: "9 months",
  },
];

// Sample data for cow videos
const cowVideosData = [
  {
    id: 1,
    type: "video",
    title: "Funny Cow Compilation",
    url: "https://www.youtube.com/embed/rCdWOMm0a-o?si=CyC9Qz0b-AXJHGS4",
  },
  {
    id: 2,
    type: "video",
    title: "Cute Baby Cow Playing",
    url: "https://www.youtube.com/embed/oHg5SJYRHA0",
  },
];

const FeedPage = ({ posts }) => (
  <div className="container mx-auto my-8">
    {" "}
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md hover:bg-gray-200 rounded-lg overflow-hidden"
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
  </div>
);

const QuizzesPage = ({ quizzes }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (quizId, optionIndex) => {
    setAnswers({ ...answers, [quizId]: optionIndex });
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSubmitted(false);
    setAnswers({});
    setCurrentQuizIndex(0);
  };

  const renderResults = () => {
    let correctCount = 0;
    quizzes.forEach((quiz) => {
      const userAnswer = answers[quiz.id];
      const isCorrect = quiz.options[userAnswer] === quiz.answer;
      if (isCorrect) correctCount++;
    });

    return (
      <div className="text-center mt-8 flex flex-col items-center pt:80px">
        <p className="text-lg font-bold mb-4">
          You got {correctCount} out of {quizzes.length} correct!
        </p>
        <img
          src={cow} 
          alt="Cow Image"
          className="mt-4"
          style={{ maxWidth: "30%", height: "auto" }}
        />
        <button
          onClick={handleRetry}
          className="bg-blue-500 text-black hover:blue px-4 py-2 rounded mt-4"
        >
          Retry
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center pt-20">
      {submitted ? (
        renderResults()
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-lg w-full p-6 mb-2">
          <div>
            <p className="text-lg font-bold mb-4">
              {quizzes[currentQuizIndex].question}
            </p>
            {quizzes[currentQuizIndex].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name={`quiz-${quizzes[currentQuizIndex].id}`}
                  id={`option-${quizzes[currentQuizIndex].id}-${index}`}
                  onChange={() =>
                    handleOptionChange(quizzes[currentQuizIndex].id, index)
                  }
                  disabled={submitted}
                />
                <label
                  htmlFor={`option-${quizzes[currentQuizIndex].id}-${index}`}
                  className="text-sm"
                >
                  {option}
                </label>
              </div>
            ))}
            {submitted && (
              <p
                className={`mt-2 ${
                  answers[quizzes[currentQuizIndex].id] !== undefined &&
                  quizzes[currentQuizIndex].options[
                    answers[quizzes[currentQuizIndex].id]
                  ] === quizzes[currentQuizIndex].answer
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {quizzes[currentQuizIndex].explanation}
              </p>
            )}
          </div>
        </div>
      )}
      {!submitted && (
        <button
          onClick={handleNextQuiz}
          className="bg-blue-500 text-black px-4 py-2 rounded mb-2"
        >
          {currentQuizIndex < quizzes.length - 1 ? "Next" : "Submit Quiz"}
        </button>
      )}
    </div>
  );
};



const CowVideosPage = ({ videos }) => (
  <div className="grid grid-cols-2 gap-4 container mx-auto my-8 pb-7">
    {videos.map((video) => (
      <div
        key={video.id}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:bg-gray-200"
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
            activeTab === "quizzes"
              ? "bg-[#fffaf0] text-black"
              : "text-blue-500"
          }`}
          onClick={() => handleTabChange("quizzes")}
        >
          Quiz
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded focus:outline-none ${
            activeTab === "videos" ? "bg-[#fffaf0] text-black" : "text-blue-500"
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
