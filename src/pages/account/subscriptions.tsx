import * as React from 'react';
import Account from '.';
import { startFreeTrial } from '../landing/our-music-licenses';
export interface UserProps {}

export default function Me(props: UserProps) {
  return (
    <Account>
      <div className="text-lg my-4 laptop:my-0 laptop:mr-2">
        You are currently not subscribed to any of our online plans. Choose a plan below to start a
        subscription.
      </div>
      <div className="text-base my-4 laptop:mr-2">
        If you have an Enterprise plan contact your Customer Success Manager for questions regarding
        your plan.
      </div>
      <div className="laptop:grid grid-cols-2 gap-8 mr-2">
        <div className="w-full bg-gray-800 my-10">
          <div className="px-8 py-3">
            <div className="text-lg text-gray-400 h-8">MOST POPULAR</div>
            <div className="text-4xl my-2 ipad:mt-4">Personal</div>
            <div className="text-lg font-bold leading-6 ipad:mt-4">
              You're creating videos or podcasts for your own use.
            </div>
            <ul className="pl-4 mt-6 text-base text-gray-500">
              <li className="list-disc ">
                Covered for YouTube, Facebook, Instagram, TikTok, Twitch and podcasts
              </li>
              <li className="list-disc ">Add one channel per platform</li>
              <li className="list-disc ">You can have unlimited followers and views</li>
              <li className="list-disc ">Includes monetization</li>
            </ul>
            <div className="mt-6 text-3xl ipad:mt-16">$12/month*</div>
            <div className="text-gray-500 text-base">
              * When you pay $144/year upfront for one year. Otherwise $15 monthly.
            </div>
            <div className="mt-4 ipad:mt-10 laptop: flex-col laptop:items-start ">
              <button
                className=" w-32 h-10 mr-6 bg-blue-600 text-lg hover:text-black"
                onClick={startFreeTrial}
              >
                Start free trial
              </button>
              <button className="text-blue-500 text-lg ipad:float-right laptop:mb-8">
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-800 my-10">
          <div className="px-8 py-3">
            <div className="text-lg text-gray-400 h-8"></div>
            <div className="text-4xl my-2 ipad:mt-4">Commercial</div>
            <div className="text-lg font-bold leading-6 ipad:mt-4 ">
              You're a freelancer or a business creating commercial productions.
            </div>
            <ul className="pl-4 mt-6 text-base text-gray-500">
              <li className="list-disc ">Everything included from Personal</li>
              <li className="list-disc ">
                Covered for social media, online platforms and websites
              </li>
              <li className="list-disc ">Simple clearance for client productions</li>
              <li className="list-disc ">Unlimited use in digital ads</li>
            </ul>
            <div className="mt-6 text-3xl ipad:mt-16">$25/month*</div>
            <div className="text-gray-500 text-base">
              * When you pay $299/year upfront for one year. Otherwise $49 monthly.
            </div>
            <div className="mt-4 ipad:mt-10 laptop:flex-col laptop:items-start ">
              <button
                className="w-32 h-10 mr-6 bg-blue-600 text-lg hover:text-black  "
                onClick={startFreeTrial}
              >
                Start free trial
              </button>
              <button className="text-blue-500 text-lg ipad:float-right laptop:mb-8 ">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full block  border-gray-100 border-2 h-36 laptop:mt-10 mx-auto laptop:w-104">
        <div className="text-xl m-4">Did you find what you were looking for?</div>
        <div className="float-right flex items-center mx-4">
          <div className="mx-2 text-lg text-blue-500 cursor-pointer">Yes</div>
          <div className="mx-2 text-lg text-blue-500 cursor-pointer">No</div>
        </div>
      </div>
    </Account>
  );
}
