import { assets } from "../assets/frontendassets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"About"} text2={"Us"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Forever, we blend style, comfort, and sustainability to offer
            timeless, high-quality clothing that empowers you to express your
            unique personality.
          </p>
          <p>
            Forever offers thoughtfully designed, high-quality fashion that lets
            you express your individuality with style and comfort.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Forever, we create high-quality, stylish clothing that empowers
            you to express your unique self. With a focus on comfort and
            sustainability, we deliver fashion that feels as good as it looks.
          </p>
        </div>
      </div>
      {/* another div */}
      <div className="text-4xl py-4">
        <Title text1={"Why"} text2={"Choose Us"} />
      </div>
      {/* another div */}
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Forever, quality is our top priority. We meticulously inspect
            every garment, ensuring it meets our high standards of durability,
            comfort, and craftsmanship. From the selection of premium materials
            to the final finishing touches, our commitment to excellence
            guarantees that you receive only the best. Our rigorous quality
            assurance process reflects our dedication to providing you with
            clothing that not only looks great but stands the test of time.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            At Forever, we understand that your time is valuable, which is why
            we ve designed our shopping experience to be as effortless and
            enjoyable as possible. From easy navigation on our website to
            seamless checkout and fast delivery, every aspect of our service is
            tailored to make your shopping journey smooth and hassle-free. Our
            customer support is always ready to assist you, ensuring that your
            needs are met with efficiency and care. We strive to provide you
            with the ultimate convenience, so you can focus on what truly
            matters—enjoying your new favorite pieces.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional:</b>
          <p className="text-gray-600">
            At Forever, we are committed to delivering an exceptional experience
            in every aspect of our service. From our carefully curated
            collections to our attention to detail in every stitch, we go above
            and beyond to exceed your expectations. Our team is dedicated to
            providing you with not just clothing, but a level of quality and
            service that stands out. We believe in creating moments of delight,
            ensuring that each interaction with us feels special, and that every
            piece you purchase becomes a cherished addition to your wardrobe.
          </p>
        </div>
      </div>
      {/* news component mount here */}
      <NewsLetterBox/>
    </div>
  );
};

export default About;
