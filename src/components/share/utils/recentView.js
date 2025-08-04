

// ✅ Function to save a product to recent views
export const saveToRecentViews = (product, userEmail) => {
  if (!userEmail || !product || !product._id) return;

  const key = `recentViews-${userEmail}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  const isExist = existing.find(item => item._id === product._id);
  if (!isExist) {
    const updated = [product, ...existing];

    if (updated.length > 4) {
      updated.pop(); // remove last (oldest) item
    }

    localStorage.setItem(key, JSON.stringify(updated));
  }
};

// ✅ Function to get recent views for a user
export const getRecentViews = (userEmail) => {
  if (!userEmail) return [];
  const key = `recentViews-${userEmail}`;
  const data = JSON.parse(localStorage.getItem(key)) || [];
  return data;
};
