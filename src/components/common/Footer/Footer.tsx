import React from 'react';

const Footer = () => (
  <footer className="mt-32 ">
    <div className="container px-4 py-8 tablet:py-12 ">
      <div className="flex justify-between flex-wrap gap-4 ipad:py-4 ">
        <div className=" ipad:w-1/4 laptop:w-1/6 ">
          <h5 className="text-xl text-white font-bold mb-4">Features</h5>
          <ul className="list-none footer-links">
            <li className="mb-2">
              <a
                href="/music"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Music
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/sound-effect"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Sound Effects
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/downloads"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Downloads
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/nextversion"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                For Artists
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/nextversion"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div className=" ipad:w-1/4 laptop:w-1/6 ">
          <h5 className="text-xl text-white font-bold mb-4">Help</h5>
          <ul className="list-none footer-links">
            <li className="mb-2">
              <a
                href="/nextversion"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Support
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/nextversion"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Help Center
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/nextversion"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className=" ipad:w-1/4 laptop:w-1/6 ">
          <h5 className="text-xl text-white font-bold mb-4">Social</h5>
          <ul className="list-none footer-links">
            <li className="mb-2">
              <a
                href="https://www.facebook.com/"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                FaceBook
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://www.spotify.com/"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Spotify
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://www.youtube.com/"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-white hover:text-white"
              >
                Youtube
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://www.instagram.com/"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-purple-800 hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li className="mb-2">
              <a
                href="https://twitter.com/"
                className="border-b border-solid border-transparent text-gray-500 font-semibold hover:border-purple-800 hover:text-white"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className="ipad:w-1/4 laptop:w-1/6 max-w-[100px] max-h-[100px]">
          {' '}
          <img src="/logosunny.jpg" alt=" logo sunny" />
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
