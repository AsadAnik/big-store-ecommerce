import React from 'react';
import "./ReviewCard.css";
import Menu from '../../assets/menu.png';
// import ReviewStars from '../widgets/ReviewStars/ReviewStars';
import { ReviewStarsMUI } from '../widgets/ReviewStars/ReviewStars';

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <img src={Menu} alt="User" />
      <p>{review.name}</p>
      <div className="mb-1">
        <ReviewStarsMUI ratings={review.rating} size="medium" />
        {/* <ReviewStars ratings={review.rating} size={15} /> */}
      </div>
      <span className="review-card-comment">{review.comment}</span>
    </div>
  )
}
