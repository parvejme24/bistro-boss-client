import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

export default function AboutPage() {
  return (
    <div>
      <PageHeader title={"About Us"} />

      <div className="container mx-auto max-w-7xl px-5">
        {/* first  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
          <div>
            <h3 className="text-xl font-semibold">Why Choose Bistro Boss</h3>
            <h1 className="text-4xl font-bold my-5">
              Elevated dining, <span>all in one place</span>
            </h1>
            <p className="text-gray-600">
              From farm-fresh ingredients handpicked each morning to
              chef-crafted recipes inspired by global and local cuisines, we
              bring the finest seasonal flavors straight to your table. Every
              dish is thoughtfully prepared with a balance of taste, texture,
              and presentation, ensuring that each bite tells a story of quality
              and care. Step into our warm, modern ambiance where comfort meets
              elegance, and let our attentive team make you feel right at home.
              Whether you're joining us for a quick yet satisfying lunch, an
              intimate dinner, or a joyful celebration with friends and family,
              we promise an unforgettable dining experience filled with fresh
              aromas, authentic flavors, and heartfelt hospitality that makes
              every meal truly memorable.
            </p>
          </div>
          <div>
            <div
              className="w-full rounded overflow-hidden"
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/xPPLbEFbCAo"
                title="About video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>

        {/* seconde  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10">
          <div>
            <img
              src="https://www.radiustheme.com/demo/wordpress/themes/foodymat/wp-content/uploads/2024/11/about-img1.png"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">About Our Restaurant</h2>
            <p className="mt-5 text-gray-600">
              Bistro Boss is a neighborhood kitchen serving comfort classics
              with a contemporary twist. We source responsibly, cook with care,
              and focus on honest flavors that let great ingredients shine. Our
              menu evolves with the seasons, and our team is dedicated to
              hospitality that feels effortless.
            </p>
            <p className="mt-5 text-gray-600">
              From handcrafted pastas and wood‑fired mains to fresh salads and
              desserts, there’s something for everyone. Dine in, order online,
              or book our space for your next event—we’ll handle the details.
            </p>

            <button className="px-6 py-3 rounded-full border mt-5 bg-red-600 text-white font-semibold">
              View Our Menu
            </button>
          </div>
        </div>
      </div>

      {/* third  */}
      <div
        style={{
          backgroundImage: `url("https://www.radiustheme.com/demo/wordpress/themes/foodymat/wp-content/uploads/2024/11/about-sec-banner1.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-gradient-to-r from-black/90 to-black/50">
          <div className="py-10 container mx-auto max-w-7xl px-5">
            <h2 className="text-xl font-semibold text-white">Careers</h2>
            <p className="text-3xl mt-2 font-semibold text-white">
              Join our team and create remarkable dining experiences
            </p>
            <button className="px-6 py-3 mt-5 rounded-full text-white border border-white">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* services  */}
      <div className="py-20">
        <div className="container mx-auto max-w-7xl px-5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From quality sourcing to quick service, here’s what sets Bistro
              Boss apart. We obsess over taste, consistency, and the little
              details that make each visit special.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Food</h3>
              <p className="text-gray-600">
                We serve the finest quality ingredients sourced from trusted
                suppliers to ensure every dish meets our high standards.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery service to bring your favorite meals
                to your doorstep in record time.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Customer Care</h3>
              <p className="text-gray-600">
                Dedicated customer support team available 24/7 to assist you
                with any questions or concerns.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Fresh Ingredients</h3>
              <p className="text-gray-600">
                Daily fresh ingredients delivered to our kitchen to ensure the
                best taste and nutritional value.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Affordable Prices</h3>
              <p className="text-gray-600">
                Great value for money with competitive pricing that doesn't
                compromise on quality or taste.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Wide Coverage</h3>
              <p className="text-gray-600">
                Serving multiple locations across the city to bring delicious
                food closer to your home or office.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
