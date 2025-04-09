import React from "react";
import JoinCTAImg from "../assets/joinCTA.png";
interface JoinCTAProps {
  signupUrl: string;
}

const JoinCTA: React.FC<JoinCTAProps> = ({ signupUrl = "/signup" }) => {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 rounded-full opacity-50"></div>
              <div className="relative overflow-hidden ">
                <img
                  src={JoinCTAImg}
                  alt="Peaceful introvert gathering"
                  className="w-full h-auto object-cover rounded-xl"
                />
                <div className="absolute inset-0 "></div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Ready to join a safe and supportive introvert space?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Join our community where you can connect with like-minded people,
              share experiences, and grow at your own pace in a judgment-free
              environment.
            </p>
            <div className="mt-8">
              <a
                href={signupUrl}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Join Now
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 ml-1">4.9/5 rating</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600 ml-1">
                  Join in minutes
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600 ml-1">No pressure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinCTA;
