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
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">
         Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow">
          <p className="text-xl">
            No orders yet
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <h2 className="text-2xl font-bold mb-4">
                Order #{index + 1}
              </h2>

              {order.products?.map((item: any) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b py-2"
                >
                  <span>{item.name}</span>

                  <span>
                    {item.quantity} × ${item.price}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}