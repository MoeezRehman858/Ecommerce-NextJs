"use client";

import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";

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
  const [uploadingReviewImage, setUploadingReviewImage] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

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
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Added to cart");
  };

  const handleReviewImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      setUploadingReviewImage(true);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });

        const data = await res.json();
        setReviewImage(data.url);
      } finally {
        setUploadingReviewImage(false);
      }
    };
  };

  const submitReview = async () => {
    if (!comment.trim()) {
      toast.error("Write something first.");
      return;
    }

    setSubmittingReview(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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
        toast.success("Review added");
      } else {
        toast.error(data.message);
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    const res = await fetch("/api/reviews", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewId }),
    });

    if (res.ok) {
      setReviews(reviews.filter((review) => review._id !== reviewId));
      toast.success("Review deleted");
    }
  };

  if (!product)
    return (
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2A2A35] border-t-[#7C5CFC] animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0B10] px-4 md:px-8 py-12">
      <div className="bg-[#15151D] border border-[#2A2A35] rounded-2xl overflow-hidden max-w-6xl mx-auto grid md:grid-cols-2">
        <div className="h-72 md:h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <span className="text-[#33E6CC] text-xs font-medium tracking-wide uppercase mb-2">
            {product.category}
          </span>

          <h1
            className="text-white text-3xl md:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            {product.name}
          </h1>

          <p className="text-2xl font-bold mt-4 text-[#33E6CC]">
            ${product.price}
          </p>

          <p className="text-[#8B8B99] mt-4 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={addToCart}
            className="mt-6 text-[#0B0B10] font-semibold py-3 rounded-xl transition"
            style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
          >
            Add to cart
          </button>

          <div className="mt-10 border-t border-[#2A2A35] pt-6">
            <h2 className="text-white text-xl font-bold mb-4">Add a review</h2>

            <textarea
              placeholder="Write your review…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm resize-none mb-3"
            />

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm mb-3"
            >
              <option value={5}>5 stars</option>
              <option value={4}>4 stars</option>
              <option value={3}>3 stars</option>
              <option value={2}>2 stars</option>
              <option value={1}>1 star</option>
            </select>

            <label className="relative flex flex-col items-center justify-center border border-dashed border-[#2A2A35] hover:border-[#7C5CFC] rounded-xl p-5 cursor-pointer transition text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleReviewImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {uploadingReviewImage ? (
                <p className="text-[#8B8B99] text-sm">Uploading…</p>
              ) : reviewImage ? (
                <img
                  src={reviewImage}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ) : (
                <p className="text-[#8B8B99] text-sm">
                  Attach a photo (optional)
                </p>
              )}
            </label>

            <button
              onClick={submitReview}
              disabled={submittingReview || uploadingReviewImage}
              className="mt-4 w-full bg-[#0B0B10] border border-[#2A2A35] text-white py-3 rounded-xl hover:border-[#7C5CFC] transition disabled:opacity-60"
            >
              {submittingReview ? "Submitting…" : "Submit review"}
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2
          className="text-white text-2xl md:text-3xl font-bold mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Customer reviews
        </h2>

        {reviews.length === 0 ? (
          <div className="bg-[#15151D] border border-[#2A2A35] p-6 rounded-2xl">
            <p className="text-[#8B8B99]">No reviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#15151D] border border-[#2A2A35] p-5 rounded-2xl"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  <p className="text-amber-400 font-semibold text-sm">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                </div>

                <p className="mt-3 text-[#B8B8C4] text-sm leading-relaxed">
                  {review.comment}
                </p>

                {review.image && (
                  <img
                    src={review.image}
                    alt="Review"
                    className="w-32 h-32 object-cover rounded-xl mt-4"
                  />
                )}

                {user?.isAdmin && (
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="mt-4 text-red-400 border border-red-400/30 px-4 py-2 rounded-lg text-sm hover:bg-red-400/10 transition"
                  >
                    Delete review
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
