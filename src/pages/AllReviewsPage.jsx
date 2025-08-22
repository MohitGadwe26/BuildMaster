import { FaStar, FaRegStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import styles from "./AllReviewsPage.module.css";

const AllReviewsPage = () => {
  const location = useLocation();
  const reviews = location.state?.reviews || [];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) =>
      i < rating ? (
        <FaStar key={i} className={`${styles.star} ${styles.filled}`} />
      ) : (
        <FaRegStar key={i} className={styles.star} />
      )
    );
  };

  return (
    <section className={`${styles.reviews} ${styles.allReviews}`}>
      <h1 className={styles.heading}>All Client Reviews</h1>

      {reviews.length > 0 ? (
        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <p>{review.text}</p>
              <div className={styles.user}>
                <img src={`images/${review.image}`} alt={review.name} />
                <div className={styles.info}>
                  <h3>{review.name}</h3>
                  <div className={styles.stars}>
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noReviews}>
          <p>No reviews found.</p>
        </div>
      )}
    </section>
  );
};

export default AllReviewsPage;
