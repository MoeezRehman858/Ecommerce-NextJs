"use client";

import { useEffect, useState, use } from "react";

type ParamsType = {
  id: string;
};

export default function ProductPage({
  params,
}: {
  params: Promise<ParamsType>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [reviewImage, setReviewImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${resolvedParams.id}`);

      const data = await res.json();

      setProduct(data);

      const reviewRes = await fetch(
        `/api/reviews?productId=${resolvedParams.id}`,
      );

      const reviewData = await reviewRes.json();

      setReviews(reviewData);
      const userRes = await fetch("/api/user/me", {
        credentials: "include",
      });

      if (userRes.ok) {
        const userData = await userRes.json();

        setUser(userData);
      }
    };

    fetchProduct();
  }, [resolvedParams.id]);

  const addToCart = () => {
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const itemIndex = existingCart.findIndex(
      (item: any) => item._id === product._id,
    );

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Added to cart 🛒");
  };

  const submitReview = async () => {
    const res = await fetch("/api/reviews", {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        productId: product._id,
        name: "Customer",
        comment,
        rating,
        image: reviewImage,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setReviews([data, ...reviews]);

      setComment("");

      setRating(5);

      setReviewImage("");

      alert("Review added ⭐");
    } else {
      alert(data.message);
    }
  };
  const deleteReview = async (reviewId: string) => {
    const res = await fetch("/api/reviews", {
      method: "DELETE",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        reviewId,
      }),
    });

    if (res.ok) {
      setReviews(reviews.filter((review) => review._id !== reviewId));

      alert("Review deleted 🗑");
    }
  };

  // LOADING UI
  if (!product)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-2xl font-bold">Loading Product...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-6xl mx-auto grid md:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-2xl text-blue-600 mt-4">${product.price}</p>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <button
            onClick={addToCart}
            className="mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Add To Cart
          </button>

          <div className="mt-10 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">⭐ Add Review</h2>


            <textarea
              placeholder="Write review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4"
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-3 rounded-lg mb-4 w-full"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>

            {/* IMAGE UPLOAD */}
            <input
              type="file"
              accept="image/*"
              onChange={async (e: any) => {
                const file = e.target.files[0];

                const reader = new FileReader();

                reader.readAsDataURL(file);

                reader.onloadend = async () => {
                  const res = await fetch("/api/upload", {
                    method: "POST",

                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      image: reader.result,
                    }),
                  });

                  const data = await res.json();

                  setReviewImage(data.url);
                };
              }}
              className="border p-3 rounded-lg w-full"
            />

            {/* IMAGE PREVIEW */}
            {reviewImage && (
              <img
                src={reviewImage}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl mt-4"
              />
            )}

            {/* SUBMIT BUTTON */}
            <button
              onClick={submitReview}
              className="mt-5 bg-yellow-500 text-white px-6 py-3 rounded-xl hover:bg-yellow-600 transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow">
            <p>No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white p-5 rounded-2xl shadow">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xl">{review.name}</h3>

                  <p className="text-yellow-500 font-bold">
                    ⭐ {review.rating}/5
                  </p>
                </div>

                <p className="mt-3 text-gray-700">{review.comment}</p>
                {user?.isAdmin && (
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete Review
                  </button>
                )}
                {review.image && (
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-40 h-40 object-cover rounded-xl mt-4"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
