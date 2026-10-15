import Link from "next/link";

export default function Footer() {
  return (
<<<<<<< HEAD
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
=======
    <footer className="bg-bg text-ink mt-20 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2
            className="text-2xl font-bold mb-4 text-ink"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            My<span className="text-brand">Store</span>
          </h2>

          <p className="text-muted text-sm leading-relaxed">
>>>>>>> 414d771 (CSS Changes)
            Modern ecommerce platform built with Next.js, MongoDB and
            Tailwind CSS.
          </p>
        </div>

        <div>
<<<<<<< HEAD
          <h3 className="text-sm font-semibold mb-4 text-white tracking-wide uppercase">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2.5 text-[#8B8B99] text-sm">
            <Link href="/" className="hover:text-[#33E6CC] transition w-fit">
=======
          <h3 className="text-sm font-semibold mb-4 text-ink tracking-wide uppercase">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2.5 text-muted text-sm">
            <Link href="/" className="hover:text-brand transition w-fit">
>>>>>>> 414d771 (CSS Changes)
              Home
            </Link>
            <Link
              href="/cart"
<<<<<<< HEAD
              className="hover:text-[#33E6CC] transition w-fit"
=======
              className="hover:text-brand transition w-fit"
>>>>>>> 414d771 (CSS Changes)
            >
              Cart
            </Link>
            <Link
              href="/wishlist"
<<<<<<< HEAD
              className="hover:text-[#33E6CC] transition w-fit"
=======
              className="hover:text-brand transition w-fit"
>>>>>>> 414d771 (CSS Changes)
            >
              Wishlist
            </Link>
          </div>
        </div>

        <div>
<<<<<<< HEAD
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
=======
          <h3 className="text-sm font-semibold mb-4 text-ink tracking-wide uppercase">
            Follow Us
          </h3>

          <div className="flex flex-col gap-2.5 text-muted text-sm">
            <a href="#" className="hover:text-brand transition w-fit">
              Instagram
            </a>
            <a href="#" className="hover:text-brand transition w-fit">
              Facebook
            </a>
            <a href="#" className="hover:text-brand transition w-fit">
              Twitter
            </a>
            <a href="#" className="hover:text-brand transition w-fit">
>>>>>>> 414d771 (CSS Changes)
              YouTube
            </a>
          </div>
        </div>

        <div>
<<<<<<< HEAD
          <h3 className="text-sm font-semibold mb-4 text-white tracking-wide uppercase">
            Contact
          </h3>

          <div className="flex flex-col gap-2.5 text-[#8B8B99] text-sm">
=======
          <h3 className="text-sm font-semibold mb-4 text-ink tracking-wide uppercase">
            Contact
          </h3>

          <div className="flex flex-col gap-2.5 text-muted text-sm">
>>>>>>> 414d771 (CSS Changes)
            <p>support@mystore.com</p>
            <p>+92 300 1234567</p>
            <p>Pakistan</p>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div className="border-t border-[#2A2A35] text-center py-5 text-[#5A5A66] text-xs">
=======
      <div className="border-t border-line text-center py-5 text-faint text-xs">
>>>>>>> 414d771 (CSS Changes)
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
}
