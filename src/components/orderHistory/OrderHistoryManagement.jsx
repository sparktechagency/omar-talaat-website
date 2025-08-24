"use client";

import React, { useState } from "react";
import { Package } from "lucide-react";
import { useGetMyOrderQuery } from "@/redux/featured/cart/cartPageApi";
import { useGetMyWalletQuery } from "@/redux/featured/auth/authApi";
import { getUserPlan } from "../share/utils/getUserPlan";
import Spinner from "@/app/(commonLayout)/Spinner";

const OrderHistoryManagement = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { data: wallet } = useGetMyWalletQuery();
  const walletData = wallet?.data;
  const { plan, classes, svgColor } = getUserPlan(walletData);

  const queryParams = [
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
  ];

  // API call
  const { data, isLoading } = useGetMyOrderQuery(queryParams);
  const orderData = data?.data || [];
  console.log(orderData);

  const meta = data?.meta;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) <Spinner />;

  return (
    <div className="min-h-screen bg-black/30 text-white p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Order History</h1>
        </div>

        {/* Orders */}
        {orderData.length === 0 ? (
          <Spinner />
        ) : (
          <>
            <div className="space-y-3">
              {orderData.map((order, index) => (
                <div
                  key={order?._id || index}
                  className={`${classes.border} rounded-lg p-4 h-16 md:h-16`}
                >
                  <div
                    className={`${classes.inner} flex items-center rounded-lg`}
                  >
                    {/* Desktop view - same as original */}
                    <div className="hidden md:flex flex-wrap items-center justify-around w-full">
                      <p className="text-white font-medium">
                        Order Number:{" "}
                        {order?.orderId?.replace("PRD#", "") || "N/A"}
                      </p>
                      <p className="text-white text-sm">
                        Date: {formatDate(order.createdAt)}
                      </p>
                      <p className="text-white text-sm">
                        Transaction ID: {order?._id?.slice(-8) || "N/A"}
                      </p>
                      <p className="text-white text-sm">
                        Payment Via: {order?.paymentId?.paymentMethod || "Cash"}
                      </p>
                      <p className="text-white text-sm">
                        Delivery Status: {order?.status || "Pending"}
                      </p>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          ${order?.finalAmount || order?.totalAmount || 160}
                        </p>
                      </div>
                    </div>

                    {/* Mobile view - responsive */}
                    <div className="md:hidden grid grid-cols-2 gap-2 w-full">
                      <div className="flex flex-col">
                        <p className="text-white font-medium text-xs">
                          Order: {order?.orderId?.replace("PRD#", "") || "N/A"}
                        </p>
                        <p className="text-white text-sm">
                          Trans.ID: {order?._id?.slice(-8) || "N/A"}
                        </p>
                        <p className="text-white text-xs">
                          Date: {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-white text-xs">
                          Status: {order?.status || "Pending"}
                        </p>
                        <p className="text-white text-sm">
                          Payment Via:{" "}
                          {order?.paymentId?.paymentMethod || "Cash"}
                        </p>
                        <p className="text-white font-bold text-sm">
                          ${order?.finalAmount || order?.totalAmount || 160}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {meta?.totalPage > 1 && (
              <div className="flex justify-center mt-8 space-x-2">
                {/* Prev */}
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? "text-white/20 border border-white/20 cursor-not-allowed"
                      : `${classes.text} border-gray-600 hover:bg-gray-700`
                  }`}
                >
                  Prev
                </button>

                {/* Pages - Desktop view (same as original) */}
                <div className="hidden md:flex space-x-2">
                  {Array.from({ length: meta.totalPage }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md border ${
                          page === currentPage
                            ? `${classes.bg} text-${classes.text2} `
                            : `${classes.text} `
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Pages - Mobile view (simplified) */}
                <div className="flex md:hidden space-x-1">
                  {Array.from({ length: meta.totalPage }, (_, i) => i + 1)
                    .filter((page) => {
                      // Show only current page, first, last, and adjacent pages
                      return (
                        page === 1 ||
                        page === meta.totalPage ||
                        Math.abs(page - currentPage) <= 1
                      );
                    })
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-2 py-1 text-xs rounded-md border ${
                          page === currentPage
                            ? `${classes.bg} text-${classes.text2} `
                            : `${classes.text} `
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                </div>

                {/* Next */}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, meta.totalPage))
                  }
                  disabled={currentPage === meta.totalPage}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === meta.totalPage
                      ? `text-white/20 border border-white/20 cursor-not-allowed`
                      : `${classes.text} `
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryManagement;
