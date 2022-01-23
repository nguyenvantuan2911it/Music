import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Loading from 'src/components/common/Loading/Loading';
import { getStoreLocal } from 'src/features/auth/AuthSlice';
import { getListCart, selectCart } from 'src/features/cart/CartSlice';
import Licensing from '.';
import { useAppSelector } from '../../app/hooks';

export interface CheckoutProps {}

export default function Checkout(props: CheckoutProps) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [valueDiscount, setValueDiscount] = useState(undefined);
  const { listCart, loadingCart } = useAppSelector(selectCart);
  const dispatch = useDispatch();
  useEffect(() => {
    const id = getStoreLocal('id');
    if (!id) return;
    (async () => {
      try {
        dispatch(getListCart(id));
      } catch (error) {}
    })();
  }, []);

  console.log(listCart);
  const handleChangeDiscount = (e) => {
    const { value } = e.target;
    setValueDiscount(value);
  };
  const handleShowDiscount = (e) => {
    const { value } = e.target;
    if (!value) {
      setShowDiscount(false);
    }
  };

  return (
    <Licensing>
      {loadingCart ? (
        <Loading />
      ) : (
        <div className="my-16 py-20 w-188 mx-auto">
          <form className="mx-10">
            <div className="text-5xl">Check out</div>
            <div className=" my-12 relative">
              <div className="flex justify-between items-center text-2xl">
                <div className="">Call Another Time</div>
                <div className="pr-6">$99.00</div>
              </div>
              <div className="flex justify-between items-center text-base">
                <div className="">Ingrid Hägglund</div>
                <div className="pr-6">Standard license</div>
              </div>
              <div className="absolute -top-2 right-1 font-bold cursor-pointer">X</div>
              <div className="w-full my-4 border-b-2 border-gray-500"></div>
            </div>
            <div className="my-6 flex justify-between items-center text-2xl">
              <div className="">Subtotal USD</div>
              <div className="">$99.00</div>
            </div>

            {!showDiscount && (
              <div
                onClick={() => setShowDiscount(true)}
                className="text-lg text-blue-500 cursor-pointer"
              >
                Apply Discount Code
              </div>
            )}
            {showDiscount && (
              <input
                type="text"
                autoFocus
                onChange={handleChangeDiscount}
                onBlur={handleShowDiscount}
                placeholder="Discount code"
                className="px-4 text-lg w-full my-4 h-16 bg-transparent border-2 border-gray-500 hover:border-gray-300"
              />
            )}

            <div className="my-4">
              <input
                type="text"
                placeholder="Production name *"
                className="px-4 text-lg w-full my-4 h-16 bg-transparent border-2 border-gray-500 hover:border-gray-300"
              />
              <div className="flex justify-center items-center -mx-2 ">
                <input
                  type="text"
                  placeholder="Contact person"
                  className="px-4 text-lg border-2 border-gray-500 bg-transparent w-full mx-2 h-16 hover:border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Company name *"
                  className="px-4 text-lg border-2 border-gray-500 bg-transparent w-full mx-2 h-16 hover:border-gray-300"
                />
              </div>
              <div className="my-8 flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-8 h-8 text-transparent bg-transparent "
                />
                <div className="mx-4 text-lg">Save payment method after purchase</div>
              </div>
              <div className="w-full border-2 border-gray-500">
                <div className="mx-8 my-4 flex justify-between items-center text-lg">
                  <div className="">Card</div>
                  <div className="">Img</div>
                </div>
                <div className="mx-8 my-4 flex justify-between items-center text-lg">
                  <div className="">PayPal</div>
                  <div className="">Img</div>
                </div>
              </div>
              <div className="my-8 flex items-center">
                <input type="checkbox" className="w-8 h-8 text-transparent bg-transparent" />
                <div className="mx-4 text-lg">I have read and agreed to the Music License</div>
              </div>
            </div>
            <button className="px-4 py-2 text-xl bg-blue-500 float-right">Purchase</button>
          </form>
        </div>
      )}
    </Licensing>
  );
}
