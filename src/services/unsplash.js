// For local development, you can use .env file with VUE_APP_UNSPLASH_KEY
const ACCESS_KEY =
  process.env.VUE_APP_UNSPLASH_ACCESS_KEY || "YOUR_UNSPLASH_API_KEY";

/**
 * Fetch random images from Unsplash API
 * @param {string} keyword - Search keyword
 * @param {number} count - Number of images to fetch
 * @returns {Promise<Array>} - Array of image objects
 */
export const fetchImages = async (keyword = "nature", count = 10) => {
  const url = `https://api.unsplash.com/photos/random?query=${keyword}&count=${count}&client_id=${ACCESS_KEY}`;

  try {
    // First check if we're online
    if (!navigator.onLine) {
      throw new Error("You are offline");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const images = await response.json();
    return images;
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);

    // Return placeholder images in case of error or offline
    return Array(count)
      .fill()
      .map((_, index) => ({
        id: `placeholder-${index}`,
        alt_description: "Placeholder image",
        urls: {
          regular: `/img/placeholder-${(index % 3) + 1}.jpg`,
        },
      }));
  }
};

/**
 * Fetch a specific image from Unsplash API
 * @param {string} id - Unsplash image ID
 * @returns {Promise<Object>} - Image object
 */
export const fetchImage = async (id) => {
  const url = `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`;

  try {
    if (!navigator.onLine) {
      throw new Error("You are offline");
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const image = await response.json();
    return image;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);

    // Return a placeholder image
    return {
      id: "placeholder",
      alt_description: "Placeholder image",
      urls: {
        regular: "/img/placeholder-1.jpg",
      },
    };
  }
};
