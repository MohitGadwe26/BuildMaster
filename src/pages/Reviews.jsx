import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Reviews.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sampleReviews = [
      {
        id: 1,
        name: "John Doe",
        text: "Excellent service and quality work! The team was professional and completed our project ahead of schedule.",
        rating: 5,
        image: "pic-1.png",
      },
      {
        id: 2,
        name: "Jane Smith",
        text: "Very professional team, highly recommend. They listened to our needs and delivered beyond expectations.",
        rating: 4,
        image: "pic-2.png",
      },
      {
        id: 3,
        name: "Mike Johnson",
        text: "Completed the project ahead of schedule with excellent craftsmanship. Will definitely hire again for future projects.",
        rating: 5,
        image: "pic-3.png",
      },
      {
        id: 4,
        name: "Sarah Williams",
        text: "Good communication throughout the project. The team was responsive and addressed all our concerns promptly.",
        rating: 4,
        image: "pic-4.png",
      },
      {
        id: 5,
        name: "David Brown",
        text: "Satisfied with the final results. The project was completed within budget and the quality was good.",
        rating: 3,
        image: "pic-5.png",
      },
      {
        id: 6,
        name: "Emily Davis",
        text: "Would use their services again. Professional approach and attention to detail made the process smooth.",
        rating: 5,
        image: "pic-6.png",
      },
    ];
    setReviews(sampleReviews);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewToAdd = {
      id: reviews.length + 1,
      name: newReview.name,
      text: newReview.text,
      rating: parseInt(newReview.rating),
      image: `pic-${(reviews.length % 6) + 1}.png`,
    };
    setReviews([...reviews, reviewToAdd]);
    setNewReview({ name: "", text: "", rating: 5 });
    setShowForm(false);
  };

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
    <section className={styles.reviewsComponent} id="reviews">
      <h1 className={styles.heading}>client reviews</h1>

      <div className={styles.container}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 2.5 },
            1200: { slidesPerView: 3 },
          }}
          centeredSlides={true}
          loop={true}
        >
          {reviews.slice(0, 6).map((review) => (
            <SwiperSlide key={review.id}>
              <div className={styles.slide}>
                <p>{review.text}</p>
                <div className={styles.user}>
                  <img src={`images/${review.image}`} alt={review.name} />
                  <div className={styles.userInfo}>
                    <h3>{review.name}</h3>
                    <div className={styles.stars}>
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.actions}>
          <button className={styles.btn} onClick={() => setShowForm(true)}>
            <FaPlus /> Add Review
          </button>

          <button
            className={`${styles.btn} ${styles.viewAllBtn}`}
            onClick={() => navigate("/all-reviews", { state: { reviews } })}
          >
            View All Reviews
          </button>
        </div>

        {showForm && (
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3>Add Your Review</h3>
              <div className={styles.formGroup}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="review">Your Review</label>
                <textarea
                  id="review"
                  name="text"
                  value={newReview.text}
                  onChange={handleInputChange}
                  required
                  placeholder="Share your experience..."
                />
              </div>
              <div className={styles.formGroup}>
                <label>Rating</label>
                <div className={styles.ratingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      className={
                        star <= newReview.rating
                          ? `${styles.ratingStar} ${styles.filled}`
                          : styles.ratingStar
                      }
                    >
                      {star <= newReview.rating ? <FaStar /> : <FaRegStar />}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.submitBtn}`}
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  className={`${styles.btn} ${styles.cancelBtn}`}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
