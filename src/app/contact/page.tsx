/* eslint-disable react/no-unescaped-entities */
import LogoShift from "../components/logoshift";

const ContactPage = () => {
  return (
    <main className="min-h-screen  p-6">
      <div className="max-w-xl mx-auto  shadow-md rounded-lg p-8">
        <div className="flex justify-center">
          <LogoShift />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center ">Contact Us</h1>
        <p className="text-center  mb-8">
          Have questions, suggestions, or feedback? We'd love to hear from you.
        </p>
        <p className="text-center  mb-8">
          You can also write an email to cosmocoding1@gmail.com
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium ">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium ">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
