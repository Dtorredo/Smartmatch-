import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Reviews.css";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const fetchReviewsWithWorkerNames = async () => {
    const profileSnapshot = await getDocs(collection(db, "Profile"));
    const profiles = {};
    profileSnapshot.forEach(doc => {
      const data = doc.data();
      profiles[data.PROFILE_User_id] = data.Profile_name;
    });

    const reviewSnapshot = await getDocs(collection(db, "Reviews"));
    const reviewList = reviewSnapshot.docs.map(doc => {
      const review = doc.data();
      return {
        id: doc.id,
        ...review,
        workerName: profiles[review.Review_User_UID] || "Unknown Worker"
      };
    });

    setReviews(reviewList);
  };

  useEffect(() => {
    fetchReviewsWithWorkerNames();
  }, []);

  return (
    <div className="reviews-page-container">
      <div className="reviews-content">
        <h2>User Reviews</h2>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-rating">⭐ {review.Review_Rating}/5</div>
                <p className="review-comment">{review.Review_Comment}</p>
                <div className="review-meta">
                  <p><strong>Worker:</strong> {review.workerName}</p>
                  <p><strong>Job ID:</strong> {review.Review_Job_ID}</p>
                  <p><strong>Date:</strong> {review.createdAt?.toDate().toLocaleString() || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}