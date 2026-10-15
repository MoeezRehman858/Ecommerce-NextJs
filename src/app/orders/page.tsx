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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
          <p className="text-muted text-sm">Loading your orders…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1
          className="text-ink text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Your orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-surface border border-line p-10 rounded-2xl text-center">
            <p className="text-muted">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-5 stagger">
            {orders.map((order, index) => {
              const orderTotal = order.products?.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0,
              );

              return (
                <div
                  key={index}
                  className="bg-surface border border-line rounded-2xl overflow-hidden"
                >
                  <div className="flex items-center justify-between px-6 py-4 border-b border-line">
                    <h2 className="text-ink font-semibold">
                      Order #{index + 1}
                    </h2>
                    {order.status && (
                      <span className="text-accent text-xs font-medium px-3 py-1 rounded-full border border-line">
                        {order.status}
                      </span>
                    )}
                  </div>

                  <div className="px-6 py-2">
                    {order.products?.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex justify-between py-3 border-b border-line last:border-b-0 text-sm"
                      >
                        <span className="text-ink">{item.name}</span>
                        <span className="text-muted">
                          {item.quantity} × ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {orderTotal !== undefined && (
                    <div className="flex justify-between items-center px-6 py-4 bg-bg/40">
                      <span className="text-muted text-sm">Total</span>
                      <span className="text-accent font-bold">
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
