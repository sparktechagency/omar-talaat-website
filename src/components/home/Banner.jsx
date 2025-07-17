
import { Button } from "@/components/ui/button";
import { Check, Copy, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { MainLogo } from "../share/svg/Logo";
import { useUser } from "../share/UserProvider";
import AnimatedShopButton from "../share/utils/AnimatedShopButton";
import { getUserStyles } from "../share/utils/userStyles";
import BannerButtonAnimation from "../share/utils/BannerButtonAnimation";

const Banner = () => {
  const { userType } = useUser();
  const { bg, text, border, logo, buttonBg, buttonText } =
    getUserStyles(userType);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter()

  // Discount offers data
  const discountOffers = [
    {
      id: 1,
      title: "10% Off for orders AED600 or above",
      code: "XMAS600",
    },
    {
      id: 2,
      title: "15% Off of orders AED1000 or above",
      code: "XMAS1000",
    },
    {
      id: 3,
      title: "20% Off of orders AED1300 or above",
      code: "XMAS1300",
    },
  ];

  useEffect(() => {
    // Set target date to January 10th (you can adjust this)
    const targetDate = new Date("2025-01-10T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, "0");

  const handleGetCode = (offer) => {
    setSelectedOffer(offer);
    setModalOpen(true);
    setCopied(false);
  };

  const handleShopClick = () => {
    router.push("/shop");
    console.log("Navigating to shop page...");
  };

  const handleCopyCode = async () => {
    if (selectedOffer) {
      try {
        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(selectedOffer.code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } else {
          // Fallback method for older browsers or unsecure contexts
          const textArea = document.createElement("textarea");
          textArea.value = selectedOffer.code;
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand("copy");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (err) {
            console.error("Fallback copy failed: ", err);
            // Show alert as last resort
            alert(`Copy this code: ${selectedOffer.code}`);
          }

          document.body.removeChild(textArea);
        }
      } catch (err) {
        console.error("Copy failed: ", err);
        // Fallback: show alert with code
        alert(`Copy this code: ${selectedOffer.code}`);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOffer(null);
    setCopied(false);
  };

  return (
    <>
      <div className={`h-auto z-20 pt-32 lg:pt-60 ${bg}  overflow-hidden`}>
        <div className="absolute inset-0 ">
          <div
            className="absolute inset-0 bg-cover bg-center mt-0 lg:mt-24 h-screen lg:h-[1100px]"
            style={{
              backgroundImage: `url('/assets/banner3.png')`,
            }}
          ></div>
        </div>

        {/* Main Content */}
        <div className="relative top-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          {/* Logo */}


          <div className="mb:2 lg:mb-8">
            <MainLogo
              className="w-32 h-36 lg:w-[168px] lg:h-[182px] mx-auto mb-8"
              color={`${logo}`}
            />
            <h1 className="text-[40px] md:text-6xl font-bold font-brush text-white mb-2 lg:mb-6">
              Coral Stash
            </h1>
          </div>

          {/* Announcement */}
          <p className="text-white/90 text-lg mb-2">
            Deliveries commence January 10th
          </p>
          <p className="text-white/80 text-base mb-4 lg:mb-8 max-w-2xl">
            We deliver to all emirates in the UAE - we accept trades - we accept
            new suppliers
          </p>

          {/* Animated Shop Button */}
          <div className="h-20">
            <BannerButtonAnimation
              onClick={handleShopClick}
              size="md"
              text="Shop Now"
              className="mb-6 lg:mb-16 shadow-xl hover:shadow-2xl"
            />
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-8 mb-6 lg:mb-12">
            <div className="text-center">
              <div className="text-[40px] flex justify-center gap-3 items-center md:text-[40px] font-bold text-white mb-1">
                {formatTime(timeLeft.days)}
                <div className="text-white text-3xl">:</div>
              </div>

              <div className="text-white/70 text-sm uppercase tracking-wider mr-3">
                Days
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-[40px] font-bold text-white mb-1 flex items-center justify-center gap-3">
                {formatTime(timeLeft.hours)}
                <div className="text-white text-3xl">:</div>
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider mr-3">
                Hours
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-[40px] font-bold text-white mb-1 flex items-center justify-center gap-3">
                {formatTime(timeLeft.mins)}
                <div className="text-white text-3xl ">:</div>
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider mr-3">
                Mins
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-[40px] font-bold text-white mb-1">
                {formatTime(timeLeft.secs)}
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wider ">
                Secs
              </div>
            </div>
          </div>

          {/* Discount Offers */}
          <div className="space-y-4 w-full max-w-2xl">
            {discountOffers.map((offer) => (
              <div
                key={offer.id}
                className="flex items-center justify-between pr-10 backdrop-blur-[5px] bg-black/30 border-2 border-white/50 rounded-full px-6 h-[67px] py-4"
              >
                <span className="text-white font-medium">{offer.title}</span>

                <AnimatedShopButton
                  onClick={() => handleGetCode(offer)}
                  size="md"
                  text="Get Code"
                  icon={FaRegCopy}
                  className="  shadow-xl hover:shadow-2xl "
                />

              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0% {
              opacity: 0.3;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0.6;
              transform: translate(-50%, -50%) scale(1.1);
            }
          }
        `}</style>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-black/90 border border-white/20 rounded-3xl p-8 max-w-md w-full mx-4 text-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              <h3 className="text-white text-xl font-semibold">
                {selectedOffer?.title}
              </h3>

              <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4">
                <div className="text-white text-2xl font-bold tracking-wider">
                  {selectedOffer?.code}
                </div>
              </div>

              <Button
                onClick={handleCopyCode}
                className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-black rounded-2xl px-8 py-3 flex items-center gap-2 mx-auto transition-all duration-200"
                variant="outline"
              >
                {copied ? (
                  <>
                    <Check size={20} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
