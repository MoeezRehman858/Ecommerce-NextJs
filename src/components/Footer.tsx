import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B10] text-white mt-20 border-t border-[#2A2A35]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2
            className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#7C5CFC] to-[#33E6CC] bg-clip-text text-transparent"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            MyStore
          </h2>

          <p className="text-[#8B8B99] text-sm leading-relaxed">
            Modern ecommerce platform built with Next.js, MongoDB and
            Tailwind CSS.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 text-white tracking-wide uppercase">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2.5 text-[#8B8B99] text-sm">
            <Link href="/" className="hover:text-[#33E6CC] transition w-fit">
              Home
            </Link>
            <Link
              href="/cart"
              className="hover:text-[#33E6CC] transition w-fit"
            >
              Cart
            </Link>
            <Link
              href="/wishlist"
              className="hover:text-[#33E6CC] transition w-fit"
            >
              Wishlist
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 text-white tracking-wide uppercase">
            Follow Us
          </h3>

          <div className="flex flex-col gap-2.5 text-[#8B8B99] text-sm">
            <a href="#" className="hover:text-[#33E6CC] transition w-fit">
              Instagram
            </a>
            <a href="#" className="hover:text-[#33E6CC] transition w-fit">
              Facebook
            </a>
            <a href="#" className="hover:text-[#33E6CC] transition w-fit">
              Twitter
            </a>
            <a href="#" className="hover:text-[#33E6CC] transition w-fit">
              YouTube
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 text-white tracking-wide uppercase">
            Contact
          </h3>

          <div className="flex flex-col gap-2.5 text-[#8B8B99] text-sm">
            <p>support@mystore.com</p>
            <p>+92 300 1234567</p>
            <p>Pakistan</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2A2A35] text-center py-5 text-[#5A5A66] text-xs">
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
}
