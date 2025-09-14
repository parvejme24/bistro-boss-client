import PageHeader from "../../Components/Shared/PageHeader/PageHeader";

export default function AboutPage() {
  return (
    <div>
      <PageHeader title={"About Us"} />

      <div className="container mx-auto max-w-7xl px-5">
        {/* first  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-10">
          <div>
            <h3 className="text-xl font-semibold">Why Choose Our About</h3>
            <h1 className="text-4xl font-bold my-5">
              Unlimited Better foods, <span>all in one place</span>
            </h1>
            <p className="textgray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
              odio error corporis dolorem! Ratione, aut. Porro recusandae et id.
              Pariatur, iure. Odit ex quas animi quisquam totam fuga amet
              facere. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestias eum beatae tempore dolores, consectetur iste rerum est,
              quod exercitationem sint numquam voluptates? Provident, cumque!
              Rerum iste sit soluta et nobis ea animi id temporibus ullam eaque
              porro at ducimus, magnam nisi necessitatibus distinctio
              recusandae? Accusamus fugiat sequi qui repellendus molestiae.
            </p>
          </div>
          <div>
            <video
              className="w-full h-full rounded"
              src="https://youtu.be/1iIZeIy7TqM"
              controls
            ></video>
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
            <h2 className="text-2xl font-bold">About Our Company</h2>
            <p className="mt-5 text-gray-600">
              Massa a of est sit commodo convallis auctor as aliquet ready to
              ready work any more sem. Massa a of est sit commodo any convallis.
              to ready works at any more sem of est sit commodo any
              convallis.Massa a of est sit commodo convallis auctor as aliquet
              ready to ready work more sem. Massa a of est sit commodo any
              convallis.
            </p>
            <p className="mt-5 text-gray-600">
              Massa a of est sit commodo convallis auctor as aliquet ready to
              ready work more sem. Massa a of est sit commodo any convallis.
            </p>

            <button className="px-6 py-3 rounded-full border mt-5 bg-red-600 text-white font-semibold">
              See All Crities
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
              Discover Our Company The In You...
            </p>
            <button className="px-6 py-3 mt-5 rounded-full text-white border border-white">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* services  */}
      <div>
        <h2>Our Services</h2>
        <p>
          dolor sit amet consectetur. Massa a of est sit commodo convallis
          auctor aliquet ready works any more sem.
        </p>

        <div></div>
      </div>
    </div>
  );
}
