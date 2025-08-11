"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MainLogo } from "@/components/share/svg/Logo";
import {
  useGetSubscriptionApiQuery,
  useSubscriptionCheckoutMutation,
} from "@/redux/featured/subscription/subscriptionApi";

export default function MyMembershipTab() {
  const { data, isLoading } = useGetSubscriptionApiQuery();
  const [subscriptionCheckout, { isLoading: creating } ] =
    useSubscriptionCheckoutMutation();

  const subscriptionPackages = data?.data || [];

  const handleCheckout = async (packageId) => {
    try {
      const res = await subscriptionCheckout(packageId).unwrap();
      if (res?.success && res?.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  return (
    <div className="lg:space-y-8 space-y-2 max-w-5xl mx-auto">
      <div className="text-center">
        <MainLogo
          className="w-12 h-12 lg:w-16 lg:h-16 mx-auto lg:mb-6 mb-2"
          color="#ffffff"
        />
        <h3 className="lg:text-3xl text-xl font-bold text-white mb-2">
          My Membership
        </h3>
      </div>

      {isLoading ? (
        <div className="text-center text-gray-300 py-10">Loading packages...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subscriptionPackages.map((pkg, idx) => (
            <Card
              key={pkg?._id || idx}
              className={`bg-transparent rounded-2xl overflow-hidden h-full border-2 ${
                idx % 2 === 0 ? "border-cyan-400" : "border-yellow-400"
              }`}
            >
              <CardContent className="lg:p-8 p-4 text-center h-full flex flex-col">
                <h4
                  className={`lg:text-2xl text-xl font-bold lg:mb-4 mb-2 ${
                    idx % 2 === 0 ? "text-cyan-400" : "text-yellow-400"
                  }`}
                >
                  {pkg?.title || "Membership"}
                </h4>

                <MainLogo
                  className="w-12 h-12 lg:w-20 lg:h-20 mx-auto lg:mb-6 mb-2"
                  color={idx % 2 === 0 ? "#22d3ee" : "#facc15"}
                />

                <p className="text-gray-300 lg:mb-6 mb-3 text-sm leading-relaxed flex-grow">
                  {pkg?.description || ""}
                </p>

                <div className="text-gray-300 text-sm mb-4 space-y-1">
                  {pkg?.paymentType && (
                    <div>
                      <span className="text-gray-400">Billing: </span>
                      <span className="font-medium">{pkg.paymentType}</span>
                    </div>
                  )}
                  {pkg?.duration && (
                    <div>
                      <span className="text-gray-400">Duration: </span>
                      <span className="font-medium">{pkg.duration}</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pb-5">
                  <Button
                    disabled={creating}
                    onClick={() => handleCheckout(pkg?._id)}
                    className={`w-full text-black font-bold py-4 rounded-xl text-lg transition-all duration-200 ${
                      idx % 2 === 0
                        ? "bg-cyan-400 hover:bg-cyan-500"
                        : "bg-yellow-400 hover:bg-yellow-500"
                    }`}
                  >
                    {`AED ${pkg?.price ?? "--"}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}