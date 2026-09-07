"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders", {
          credentials: "include",
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.log(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#2A2A35] border-t-[#7C5CFC] animate-spin" />
          <p className="text-[#8B8B99] text-sm">Loading your orders…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B10] px-4 md:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Your orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-[#15151D] border border-[#2A2A35] p-10 rounded-2xl text-center">
            <p className="text-[#8B8B99]">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, index) => {
              const orderTotal = order.products?.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0,
              );

              return (
                <div
                  key={index}
                  className="bg-[#15151D] border border-[#2A2A35] rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A35]">
                    <h2 className="text-white font-semibold">
                      Order #{index + 1}
                    </h2>
                    {order.status && (
                      <span className="text-[#33E6CC] text-xs font-medium px-3 py-1 rounded-full border border-[#2A2A35]">
                        {order.status}
                      </span>
                    )}
                  </div>

                  <div className="px-6 py-2">
                    {order.products?.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex justify-between py-3 border-b border-[#2A2A35] last:border-b-0 text-sm"
                      >
                        <span className="text-white">{item.name}</span>
                        <span className="text-[#8B8B99]">
                          {item.quantity} × ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {orderTotal !== undefined && (
                    <div className="flex justify-between items-center px-6 py-4 bg-[#0B0B10]/40">
                      <span className="text-[#8B8B99] text-sm">Total</span>
                      <span className="text-[#33E6CC] font-bold">
                        ${orderTotal}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
