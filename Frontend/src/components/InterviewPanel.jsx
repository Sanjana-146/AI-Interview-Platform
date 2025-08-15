// updated code

import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";

export default function InterviewPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  const { questions, duration } = location.state || { questions: [], duration: 30 };

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration ? Number(duration) * 60 : 60 * 5);
  const [listening, setListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const userVideoRef = useRef(null);
  const currentQuestionIndex = useRef(0);
  const fullTranscriptRef = useRef(""); 
  const isManuallyStopped = useRef(false); // New ref to track manual stops

  const speakQuestion = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      synth.speak(utterance);
    } else {
      console.warn("Web Speech Synthesis API is not supported in this browser.");
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (questions && questions.length > 0) {
      const firstQuestion = questions[0];
      setMessages([{ sender: "ai", text: firstQuestion.text }]);
      speakQuestion(firstQuestion.text);
    }
  }, [questions]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (userVideoRef.current) userVideoRef.current.srcObject = stream;
      })
      .catch(() => alert("Please allow camera and microphone access."));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return { m, s };
  };

  const { m, s } = formatTime(timeLeft);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "me", text: input }]);
    setInput("");
    fullTranscriptRef.current = "";
    
    // Stop listening before the AI speaks the next question
    if (listening) {
      isManuallyStopped.current = true;
      recognitionRef.current.stop();
      setListening(false);
    }

    currentQuestionIndex.current += 1;
    if (currentQuestionIndex.current < questions.length) {
      const nextQuestion = questions[currentQuestionIndex.current];
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: nextQuestion.text },
      ]);
      speakQuestion(nextQuestion.text);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Thank you for your time. The interview is complete." },
      ]);
      speakQuestion("Thank you for your time. The interview is complete.");
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = true;
      recognitionRef.current.continuous = true; // Key change: enables continuous listening
      
      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript.trim().length > 0) {
          fullTranscriptRef.current += finalTranscript + ' ';
        }
        
        setInput(fullTranscriptRef.current + interimTranscript);
      };
      
      recognitionRef.current.onend = () => {
        // Auto-restarts the recognition session if not manually stopped
        if (listening && !isManuallyStopped.current) {
          recognitionRef.current.start();
        } else {
          setListening(false);
        }
        isManuallyStopped.current = false; // Reset the flag
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== 'no-speech' && event.error !== 'audio-capture') {
          setListening(false);
        }
      };
    }

    if (!listening) {
      setListening(true);
      isManuallyStopped.current = false; // Ensure flag is false when starting
      fullTranscriptRef.current = ""; // Clear the transcript on start
      recognitionRef.current.start();
    } else {
      isManuallyStopped.current = true;
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleLeave = () => {
    const score = Math.floor(Math.random() * 100);
    navigate("/interimResult", { state: { score } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-white rounded-xl shadow-lg flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg ${msg.sender === "me"
                ? "ml-auto bg-blue-500 text-white border-2 border-gray-400 shadow-2xl"
                : "bg-gray-200 text-gray-900"
                }`}
            >
              <p className="text-xs font-semibold mb-1">
                {msg.sender === "me" ? "You" : "AI Agent"}
              </p>
              {msg.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          ))}
        </div>
        <div className="p-3 border-t flex gap-2 items-center">
          <input
            type="text"
            placeholder="Write your message or use mic..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-gray-600 border rounded-lg p-2 focus:outline-none"
            disabled={isSpeaking}
          />
          <button
            onClick={startListening}
            className={`px-3 py-2 rounded-full transition-colors ${listening ? "bg-red-500 text-white" : "bg-gray-300"
              }`}
            title="Click to speak"
            disabled={isSpeaking}
          >
            {listening ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          <button
            onClick={sendMessage}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            disabled={isSpeaking || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center gap-4">
        <div className="text-lg font-bold text-gray-900">
          Time Left:{" "}
          <span className="ml-2 text-blue-600">
            {m}:{s}
          </span>
        </div>
        <div className="flex flex-col gap-6 w-full items-center mt-20">
          {isSpeaking && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-2 text-blue-600">
              <Volume2 size={24} className="animate-pulse" />
              <span>AI is speaking...</span>
            </div>
          )}
          <video
            ref={userVideoRef}
            autoPlay
            playsInline
            muted
            className="w-76 h-54 object-cover rounded-lg border"
          />
          <video
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-76 h-54 object-cover rounded-lg border"
          />
        </div>
        <button
          onClick={handleLeave}
          className="flex items-center bg-[#C64C4C] hover:bg-[#b84343] text-white px-3 py-1 rounded-md mt-32">
          <PhoneOff size={16} className="mr-1" />
          Leave
        </button>
      </div>
    </div>
  );
}
