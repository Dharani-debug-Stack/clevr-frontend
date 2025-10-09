import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = ({ onSuccess }) => {
  const [feedback, setFeedback] = useState("");
  const [author, setAuthor] = useState(""); //  customer name
  const [rating, setRating] = useState(5);  //  star rating
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting feedback:", { feedback, author, rating });

    try {
      const res = await axios.post("https://clevr-e-com-boew.onrender.com/api/testimonials", {
        feedback,
        author,
        rating,
      });
      console.log("Server response:", res.data);

      setFeedback("");
      setAuthor("");
      setRating(5);
      setStatusMessage("Feedback submitted successfully!");

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(res.data); // pass new testimonial back
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setStatusMessage("Failed to submit feedback. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 border rounded-lg shadow bg-white">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your Name"
        required
        className="border p-2 rounded-md"
      />
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback"
        required
        className="border p-2 rounded-md"
      />
      <label className="flex items-center gap-2">
        Rating:
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-1 rounded"
        >
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r} Star{r>1?'s':''}</option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
      >
        Submit
      </button>
      {statusMessage && <p className="text-sm text-gray-700">{statusMessage}</p>}
    </form>
  );
};

export default FeedbackForm;





