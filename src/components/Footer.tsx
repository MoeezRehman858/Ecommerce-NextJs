import Link from "next/link";

export default function Footer() {
  return (
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
            Modern ecommerce platform built with Next.js, MongoDB and
            Tailwind CSS.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 text-ink tracking-wide uppercase">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2.5 text-muted text-sm">
            <Link href="/" className="hover:text-brand transition w-fit">
              Home
            </Link>
            <Link
              href="/cart"
              className="hover:text-brand transition w-fit"
            >
              Cart
            </Link>
            <Link
              href="/wishlist"
              className="hover:text-brand transition w-fit"
            >
              Wishlist
            </Link>
          </div>
        </div>

        <div>
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
              YouTube
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4 text-ink tracking-wide uppercase">
            Contact
          </h3>

          <div className="flex flex-col gap-2.5 text-muted text-sm">
            <p>support@mystore.com</p>
            <p>+92 300 1234567</p>
            <p>Pakistan</p>
          </div>
        </div>
      </div>

      <div className="border-t border-line text-center py-5 text-faint text-xs">
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
}
