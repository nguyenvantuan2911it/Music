import { message } from 'antd';
import Link from 'next/link';
import * as React from 'react';
import MainLayout from 'src/components/common/LayOut/Layout';
export interface OurMusicProps {}
export const startFreeTrial = () => {
  message.info('We have develop funtion in next verion');
};
export default function OurMusic(props: OurMusicProps) {
  return (
    <MainLayout disableTab>
      <div className="mt-20 -mx-6 tablet:-mx-20 laptop:-mx-8">
        <div className="flex flex-col-reverse laptop:flex-row">
          <div className="px-8 -ml-4 ipad:mx-2 laptop:w-160 laptop:my-auto desktop:w-1/2">
            <div className=" text-4xl pr-10 my-4 ipad:text-6xl font-bold laptop:text-5xl ">
              Our license model
            </div>
            <div className="text-2xl ipad:mr-10 laptop:font-bold laptop:py-8">
              Epidemic Sound's definition of royalty-free music goes beyond the standard definition.
              We own all economic rights connected to our music and can offer a direct license.
            </div>
          </div>
          <div className="w-full h-80 laptop:h-136 grow desktop:h-182">
            <img className="w-full h-full object-cover" alt="" src="/lading.jpg" />
          </div>
        </div>
        <div className="flex flex-col mx-4 my-12 ipad:mx-12 ipad:flex ipad:flex-row ipad:py-40 desktop:mx-0 ">
          <div className="py-12 text-4xl font-bold pr-8 desktop:text-5xl ipad:w-1/2 ipad:py-0 ipad:text-4xl">
            Globally cleared music
          </div>
          <div className="w-full ipad:w-1/2">
            <div className="text-2xl font-bold">
              With our music licenses you’re free to use the music without having to worry about
              paying additional fees or royalties. Forget synchronisation rights, mechanical rights
              and public performance rights – we offer all rights included.
            </div>
            <div className="text-xl mt-4 text-blue-500 cursor-pointer">
              <Link href="/account/subscriptions">
                <a>Our subscriptions →</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse my-32 mx-4 ipad:mx-12 laptop:flex-row desktop:mx-0 ">
          <div className="mx-4 ipad:mx-0 laptop:w-1/2 pr-8 desktop:px-0 desktop:w-816 desktop:my-auto">
            <div className="text-4xl font-bold py-10 laptop:pt-0 desktop:px-0">
              What is royalty-free music?
            </div>
            <div className="text-2xl font-bold laptop:font-normal">
              Royalty-free isn't actually “free” in a monetary sense. What it means is that you
              don't have to pay royalties to a music creator when using their music. However, the
              company you buy your license from can still pay royalties (from e.g. streaming) to
              their music creators, like Epidemic Sound does.
            </div>
          </div>
          <div className="laptop:w-160 desktop:pl-4 desktop:h-111 desktop:w-1/2">
            <img className="desktop:w-full desktop:h-111" alt="" src="/blue.jpg"></img>
          </div>
        </div>
        <div className="mt-24 mx-4 ipad:-mx-8 ">
          <div className="tablet:mx-5 ipad:mx-24 laptop:grid grid-cols-12 gap-x-8 mx-0 laptop:mx-12">
            <div style={{ backgroundColor: '#333333' }} className="w-full mb-8 desktop: col-span-4">
              <div className="p-8">
                <div className="text-3xl font-bold">Personal</div>
                <div className="h-64 laptop:h-111 desktop:h-80">
                  <div className="py-4 text-xl font-bold">
                    You're creating videos or podcasts for your own use.
                  </div>
                  <ul className="pl-4 text-base text-gray-500">
                    <li className="list-disc">
                      Covered for YouTube, Facebook, Instagram, TikTok, Twitch and podcasts
                    </li>
                    <li className="list-disc">Add one channel per platform</li>
                    <li className="list-disc">You can have unlimited followers and views</li>
                    <li className="list-disc">Includes monetization</li>
                  </ul>
                </div>
                <div className="">
                  <div className="laptop:h-28">
                    <div className="text-3xl">$12/month*</div>
                    <div className="text-base text-gray-500">
                      * When you pay $144/year upfront for one year. Otherwise $15 monthly.
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-base">
                    <button
                      className=" cursor-pointer w-36 h-10 bg-blue-500  font-bold laptop:w-32"
                      onClick={startFreeTrial}
                    >
                      Start free trial
                    </button>
                    <div className="cursor-pointer text-blue-500">Learn more</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#333333' }} className="w-full mb-8 desktop: col-span-4">
              <div className="p-8">
                <div className="text-3xl font-bold">Commercial</div>
                <div className=" h-64 laptop:h-111 desktop:h-80">
                  <div className="py-4 text-xl font-bold">
                    You're a freelancer or a business creating commercial productions.
                  </div>
                  <ul className="pl-4 text-base text-gray-500">
                    <li className="list-disc">Everything included from Personal</li>
                    <li className="list-disc">
                      Covered for social media, online platforms and websites
                    </li>
                    <li className="list-disc">Simple clearance for client productions</li>
                    <li className="list-disc">Unlimited use in digital ads</li>
                  </ul>
                </div>
                <div className="">
                  <div className="laptop:h-28">
                    <div className="text-3xl">$25/month*</div>
                    <div className="text-base text-gray-500">
                      * When you pay $299/year upfront for one year. Otherwise $49 monthly.
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-base">
                    <button
                      className=" cursor-pointer w-36 h-10 bg-blue-500  font-bold laptop:w-32"
                      onClick={startFreeTrial}
                    >
                      Start free trial
                    </button>
                    <div className="cursor-pointer text-blue-500">Learn more</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: '#333333' }} className="w-full mb-8 desktop: col-span-4">
              <div className="p-8">
                <div className="text-3xl font-bold">Enterprise</div>
                <div className=" h-64 laptop:h-111 desktop:h-80 text-base text-gray-500">
                  <div className="py-4 text-xl font-bold">
                    You're a media/publishing company, broadcaster or team in need of a customized
                    solution.
                  </div>
                  <ul className="pl-4 text-base text-gray-500">
                    <li className="list-disc">Multiple user accounts</li>
                    <li className="list-disc">Clearance for TV and streaming services</li>
                    <li className="list-disc">Music curation support</li>
                    <li className="list-disc">Customized music productions</li>
                    <li className="list-disc">A dedicated customer success manager</li>
                    <li className="list-disc">Customized deal terms</li>
                  </ul>
                </div>
                <div className="mt-24 ipad:mt-0">
                  <div className="laptop:h-28">
                    <div className="text-xl">Request a quote</div>
                  </div>
                  <div className="flex justify-between items-center mt-4 text-base">
                    <button
                      className=" cursor-pointer w-36 h-10 bg-blue-500  font-bold laptop:w-32"
                      onClick={startFreeTrial}
                    >
                      Start free trial
                    </button>
                    <div className="cursor-pointer text-blue-500">Learn more</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
