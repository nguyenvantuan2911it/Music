import { CheckOutlined } from '@ant-design/icons';
import { message } from 'antd';
import * as React from 'react';
import MainLayout from 'src/components/common/LayOut/Layout';
import s from './pricing.module.scss';
export interface PricingProps {}

export default function Pricing(props: PricingProps) {
  const openTab = (cityName) => {
    const x = document.getElementsByClassName('city');
    console.log(x[0]);
    for (let i = 0; i < x.length; i++) {
      x[i].setAttribute('style', 'display:none');
    }
    document.getElementById(cityName).style.display = 'block';
  };

  return (
    <MainLayout disableTab>
      <div className="">
        <div className="mt-20"></div>
        <div className="text-3xl ipad:-mx-8 laptop:mx-0">Our subscriptions</div>
        <div className="hidden desktop:block">
          <div className={s.main}>
            <div className={s.package}>
              <div className={s.bgcl}></div>
              <div className={s.box}>
                <div className={s.title}>Personal</div>
                <div className={s.text_name}>
                  <div className={s.name}>
                    You're creating content or podcasts for your own use.
                  </div>
                  <div className={s.read}>Read more →</div>
                </div>
                <div className={s.footer}>
                  <div className={s.price}>$12/month*</div>
                  <div className={s.text}>
                    * When you pay $144/year upfront for one year. Otherwise $15 monthly.
                  </div>
                  <button
                    onClick={() => {
                      message.success('We have develop this function in next version');
                    }}
                    className={s.btn_free}
                  >
                    Start free trial
                  </button>
                </div>
              </div>
              <div className={s.box}>
                <div className={s.title}>Commercial</div>
                <div className={s.text_name}>
                  <div className={s.name}>
                    You're a freelancer or business creating commercial products.
                  </div>
                  <div className={s.read}>Read more →</div>
                </div>
                <div className={s.footer}>
                  <div className={s.price}>$25/month*</div>
                  <div className={s.text}>
                    * When you pay $299/year upfront for one year. Otherwise $49 monthly.
                  </div>
                  <button
                    className={s.btn_free}
                    onClick={() => {
                      message.success('We have develop this function in next version');
                    }}
                  >
                    Start free trial
                  </button>
                </div>
              </div>
              <div className={s.box}>
                <div className={s.title}>Enterprise</div>
                <div className={s.text_name}>
                  <div className={s.name}>
                    You're a media/publishing company, broadcaster or team in need of a customized
                    solution.
                  </div>
                  <div className={s.read}>Read more →</div>
                </div>
                <div className={s.footer}>
                  <div className={s.price}>$25/month*</div>
                  <div className={s.text}>
                    * When you pay $299/year upfront for one year. Otherwise $49 monthly.
                  </div>
                  <button
                    className={s.btn_free}
                    onClick={() => {
                      message.success('We have develop this function in next version');
                    }}
                  >
                    Contact sales
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.name__card}>35,000 tracks</div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.cardbl}>
            <div className={s.name__cardbl}>90,000 sound effects</div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.name__card}>First month free</div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.cardbl}>
            <div className={s.name__cardbl}>Coverage for your own channels</div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.name__card}>Coverage for your client or business</div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.cardbl}>
            <div className={s.name__cardbl}>
              YouTube, Facebook, Instagram, TikTok, Twitch, and podcasts
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.card}>
            <div className={s.name__card}>All online platforms</div>
            <div className={s.check}>
              <span className={s.span}></span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.check}>
              <span className={s.span}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.cardbl}>
            <div className={s.name__cardbl}>Websites</div>
            <div className={s.checkbl}>
              <span className={s.spanbl}></span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
            <div className={s.checkbl}>
              <span className={s.spanbl}>
                <CheckOutlined style={{ fontSize: '20px' }} />
              </span>
            </div>
          </div>
          <div className={s.footer_end}>
            <div className={s.footer__tit_end}>Want to buy a single track?</div>
            <div className={s.footer__img_end}>
              <img alt="" src="/covers_hi-def.jpg" />
            </div>
          </div>
        </div>
        <div className="my-4 desktop:hidden ipad:-mx-8 laptop:mx-0">
          <div className="grid grid-cols-3">
            <button
              className=" col-span-1 text-xl hover:text-blue-500"
              onClick={() => {
                openTab('Personal');
              }}
            >
              Personal
            </button>
            <button
              className=" col-span-1 text-xl hover:text-blue-500"
              onClick={() => {
                openTab('Commercial');
              }}
            >
              Commercial
            </button>
            <button
              className=" col-span-1 text-xl hover:text-blue-500"
              onClick={() => {
                openTab('Enterprise');
              }}
            >
              Enterprise
            </button>
          </div>
          <div className="my-4">
            <div id="Personal" className="city">
              <h2 className="text-lg text-white">Personals</h2>
              <p className="text-base text-gray-500 leading-5">
                You're creating content or podcasts for your own use.
              </p>
              <button className="text-lg text-blue-500 my-4">Read more </button>
              <ul className="text-base">
                <li className="">35,000 tracks</li>
                <li className="">90,000 sound effects</li>
                <li className="">First month free</li>
                <li className="">Coverage for your own channels</li>
                <li className=" line-through text-gray-500">
                  Coverage for your client or business
                </li>
                <li className="">YouTube, Facebook, Instagram, TikTok, Twitch, and podcasts</li>
                <li className=" line-through text-gray-500">All online platforms</li>
                <li className=" line-through text-gray-500">Commercial streaming and VOD</li>
                <li className=" line-through text-gray-500">Customized music productions</li>
                <li className=" line-through text-gray-500">Customer success manager</li>
              </ul>
              <div className="mt-10 text-2xl">$12/month*</div>
              <p className="text-base text-gray-500">
                * When you pay $144/year upfront for one year. Otherwise $15 monthly.
              </p>
              <button
                className="mt-4 w-full h-14 bg-blue-500 text-2xl"
                onClick={() => {
                  message.success('We have develop this function in next version');
                }}
              >
                Start free trial
              </button>
            </div>
            <div style={{ display: 'none' }} id="Commercial" className="city">
              <h2 className="text-lg text-white">Commercial</h2>
              <p className="text-base text-gray-500 leading-5">
                You're a freelancer or business creating commercial products.
              </p>
              <button className="text-lg text-blue-500 my-4">Read more </button>
              <ul className="text-base">
                <li className="">35,000 tracks</li>
                <li className="">90,000 sound effects</li>
                <li className="">First month free</li>
                <li className="">Coverage for your own channels</li>
                <li className=" line-through text-gray-500">
                  Coverage for your client or business
                </li>
                <li className="">YouTube, Facebook, Instagram, TikTok, Twitch, and podcasts</li>
                <li className="">All online platforms</li>
                <li className="">Websites</li>
                <li className=" line-through text-gray-500">TV shows and TV ads</li>
                <li className=" line-through text-gray-500">Commercial streaming and VOD</li>
                <li className=" line-through text-gray-500">Multiple user accountsD</li>
                <li className=" line-through text-gray-500">Music curation supportD</li>
                <li className=" line-through text-gray-500">Customized music productions</li>
                <li className=" line-through text-gray-500">Customer success manager</li>
              </ul>
              <div className="mt-10 text-2xl">$25/month*</div>
              <p className="text-base text-gray-500">
                * When you pay $299/year upfront for one year. Otherwise $49 monthly.
              </p>
              <button
                className="mt-4 w-full h-14 bg-blue-500 text-2xl"
                onClick={() => {
                  message.success('We have develop this function in next version');
                }}
              >
                Start free trial
              </button>
            </div>
            <div style={{ display: 'none' }} id="Enterprise" className="city">
              <h2 className="text-lg text-white">Commercial</h2>
              <p className="text-base text-gray-500 leading-5">
                You're a media/publishing company, broadcaster or team in need of a customized
                solution.
              </p>
              <button className="text-lg text-blue-500 my-4">Read more </button>
              <ul className="text-base">
                <li className="">35,000 tracks</li>
                <li className="">90,000 sound effects</li>
                <li className="line-through text-gray-500">First month free</li>
                <li className="">Coverage for your own channels</li>
                <li className=" line-through text-gray-500">
                  Coverage for your client or business
                </li>
                <li className="">YouTube, Facebook, Instagram, TikTok, Twitch, and podcasts</li>
                <li className="">All online platforms</li>
                <li className="">Websites</li>
                <li className="">TV shows and TV ads</li>
                <li className="">Commercial streaming and VOD</li>
                <li className="">Multiple user accountsD</li>
                <li className="">Music curation supportD</li>
                <li className="">Customized music productions</li>
                <li className="">Customer success manager</li>
              </ul>
              <div className="mt-10 text-2xl">Request a quote</div>
              <p className="text-base text-gray-500"></p>
              <button
                className="mt-4 w-full h-14 bg-blue-500 text-2xl"
                onClick={() => {
                  message.success('We have develop this function in next version');
                }}
              >
                Start free trial
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=""></div>
    </MainLayout>
  );
}
