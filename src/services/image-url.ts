import noImage from "../assets/Image Placeholder/no-image-placeholder-6f3882e0.webp";

const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage;

  const target = "media/";
  const targetIndex = url.indexOf(target);

  // Only RAWG image URLs contain "media/". For all other hosts, use the original URL.
  if (targetIndex === -1) return url;

  const index = targetIndex + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
