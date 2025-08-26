export const getImageUrl = (path) => {
  if (!path) {
    return "https://i.ibb.co/fYZx5zCP/Region-Gallery-Viewer.png"; // default image
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  } else {
    // const baseUrl = "http://10.10.7.62:7005";
    const baseUrl = "https://www.api.coralstash.com";
    return `${baseUrl}/${path}`;
  }
};
