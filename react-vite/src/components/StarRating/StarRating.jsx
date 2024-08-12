import './StarRating.css';

const StarRating = ({ onChange, value }) => {
  const handleStarClick = (rating) => {
    onChange(rating);
  };

  return (
    <div className="rating-container">
      <div className="create-review-stars-text-container">
        <span className="create-review-stars-text">Stars</span>
      </div>
      <div className="rating">
        <input
          value="5"
          name="rating"
          id="star5"
          type="radio"
          onClick={() => handleStarClick(5)}
          checked={value === 5}
          onChange={() => {}}
        ></input>
        <label htmlFor="star5" className="create-review-star"></label>
        <input
          value="4"
          name="rating"
          id="star4"
          type="radio"
          onClick={() => handleStarClick(4)}
          checked={value === 4}
          onChange={() => {}}
        ></input>
        <label htmlFor="star4" className="create-review-star"></label>
        <input
          value="3"
          name="rating"
          id="star3"
          type="radio"
          onClick={() => handleStarClick(3)}
          checked={value === 3}
          onChange={() => {}}
        ></input>
        <label htmlFor="star3" className="create-review-star"></label>
        <input
          value="2"
          name="rating"
          id="star2"
          type="radio"
          onClick={() => handleStarClick(2)}
          checked={value === 2}
          onChange={() => {}}
        ></input>
        <label htmlFor="star2" className="create-review-star"></label>
        <input
          value="1"
          name="rating"
          id="star1"
          type="radio"
          onClick={() => handleStarClick(1)}
          checked={value === 1}
          onChange={() => {}}
        ></input>
        <label htmlFor="star1" className="create-review-star"></label>
      </div>
    </div>
  );
};

export default StarRating;
