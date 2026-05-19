import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            MyStore
          </h2>

          <p className="text-gray-400 text-sm md:text-base">
            Modern ecommerce platform built with Next.js,
            MongoDB and Tailwind CSS.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-gray-400 text-sm md:text-base">
            <Link href="/">Home</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/wishlist">Wishlist</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex flex-col gap-2 text-gray-400 text-sm md:text-base">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <div className="flex flex-col gap-2 text-gray-400 text-sm md:text-base">
            <p>Email: support@mystore.com</p>
            <p>Phone: +92 300 1234567</p>
            <p>Pakistan</p>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 text-center py-4 text-gray-500 text-sm">
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
}