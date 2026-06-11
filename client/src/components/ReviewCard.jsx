function ReviewCard({ review }) {
  return (
    <div className="rounded-[32px] bg-slate-900/90 p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-white">{review.user?.name || 'Customer'}</p>
        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm text-orange-300">{review.rating}★</span>
      </div>
      <p className="mt-4 text-slate-400">{review.comment}</p>
      <p className="mt-5 text-sm text-slate-500">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default ReviewCard;
