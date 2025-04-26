// pages/index.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, Download, X } from "lucide-react";

export default function FavoriteComponents() {
  const [likedVideos, setLikedVideos] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const meditationVideos = [
    {
      id: "1",
      title: "Gentle Morning Stretch",
      duration: "11 Min",
      thumbnail: "/assests/payerImage.png",
      videoUrl:
        "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rTl3vg0veiylgd0ih/67b9b23cbe35d27f504d4bb7-p3-m41wef7__95cf3e9af7013f8c30516ea56660faae__P360.mp4",
      description:
        "Yoga is a holistic practice that blends physical postures, breath control, meditation, and ethical principles to promote overall well-being. Rooted in ancient Indian traditions, yoga offers a pathway to connect the mind, body, and spirit, fostering balance and harmony in daily life.",
    },
    {
      id: "2",
      title: "Gentle Morning Stretch",
      duration: "11 Min",
      thumbnail: "/assests/payerImage.png",
      videoUrl:
        "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rTl3vg0veiylgd0ih/67b9b23cbe35d27f504d4bb7-p3-m41wef7__95cf3e9af7013f8c30516ea56660faae__P360.mp4",
      description:
        "Yoga is a holistic practice that blends physical postures, breath control, meditation, and ethical principles to promote overall well-being. Rooted in ancient Indian traditions, yoga offers a pathway to connect the mind, body, and spirit, fostering balance and harmony in daily life.",
    },
    {
      id: "3",
      title: "Gentle Morning Stretch",
      duration: "11 Min",
      thumbnail: "/assests/payerImage.png",
      videoUrl:
        "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rTl3vg0veiylgd0ih/67b9b23cbe35d27f504d4bb7-p3-m41wef7__95cf3e9af7013f8c30516ea56660faae__P360.mp4",
      description:
        "Yoga is a holistic practice that blends physical postures, breath control, meditation, and ethical principles to promote overall well-being. Rooted in ancient Indian traditions, yoga offers a pathway to connect the mind, body, and spirit, fostering balance and harmony in daily life.",
    },
    {
      id: "4",
      title: "Gentle Morning Stretch",
      duration: "11 Min",
      thumbnail: "/assests/payerImage.png",
      videoUrl:
        "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/rTl3vg0veiylgd0ih/67b9b23cbe35d27f504d4bb7-p3-m41wef7__95cf3e9af7013f8c30516ea56660faae__P360.mp4",
      description:
        "Yoga is a holistic practice that blends physical postures, breath control, meditation, and ethical principles to promote overall well-being. Rooted in ancient Indian traditions, yoga offers a pathway to connect the mind, body, and spirit, fostering balance and harmony in daily life.",
    },
  ];

  const toggleLike = (id) => {
    setLikedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openVideoModal = (video) => {
    setCurrentVideo(video);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentVideo(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 gap-6">
        {meditationVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-lg overflow-hidden shadow flex flex-col md:flex-row"
          >
            {/* Left Side - Thumbnail */}
            <div className="w-full md:w-1/3 h-48 md:h-auto relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-2/3 p-4 flex flex-col relative">
              <div className="items-start ">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {video.title}
                </h2>
                <span className="text-sm font-medium text-gray-500">
                  {video.duration}
                </span>
              </div>

              <div className="absolute border bottom-10 p-4 rounded-xl">
                <h3 className="text-sm text-red font-medium mb-1">
                  About this Class
                </h3>
                <p className="text-xs text-gray-700 line-clamp-3 mb-1">
                  {video.description}
                </p>
                <p className="text-xs text-gray-700 line-clamp-3">
                  Through a variety of physical poses (asanas), yoga strengthens
                  and tones the body, enhances flexibility, and improves
                  posture. The focus on conscious breathing (pranayama) helps
                  calm the nervous system, reduce stress, and increase mental
                  clarity. Additionally, yoga encourages mindfulness and
                  self-awareness, cultivating a sense of inner peace and
                  relaxation.
                </p>
              </div>

              {/* Action Buttons */}
            </div>
            <div className="flex flex-col h-full py-10 justify-between items-center ">
              <div className="flex space-x-12 items-center justify-center">
                <button
                  onClick={() => toggleLike(video.id)}
                  className="flex items-center"
                  aria-label="Like video"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      likedVideos[video.id]
                        ? "fill-rose-500 text-rose-500"
                        : "text-rose-500"
                    }`}
                  />
                </button>
                <button
                  className="flex items-center"
                  aria-label="Download video"
                >
                  <Download className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="">
                <div className="flex flex-col gap-5 w-40">
                  <Link href={`/favorite/${video.id}`} className="mx-auto">
                    <button className="px-4 py-3 w-[104px]  bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600">
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() => openVideoModal(video)}
                    className="px-4 py-3 w-2/3 mx-auto bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600"
                  >
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {showModal && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-5xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-1 bg-black bg-opacity-50 rounded-full"
              aria-label="Close modal"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <div className="aspect-video bg-black">
              <video className="w-full h-full" controls autoPlay>
                <source src={currentVideo.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{currentVideo.title}</h2>
              <span className="text-sm text-gray-500">
                {currentVideo.duration}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
