import React, { useState } from 'react';
export interface ModalProps {
  onHideModal: any;
  onAddToCart: any;
}
const Modal = (props: ModalProps) => {
  const { onHideModal, onAddToCart } = props;
  const [formValue, setFormValue] = useState({
    isVatRemoved: true,
  });
  const handleHideModal = () => {
    onHideModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: Boolean(value) });
  };
  const hadleSubmitForm = (e) => {
    e.preventDefault();
    onAddToCart(formValue);
    handleHideModal();
  };
  return (
    <div className="fixed top-0 left-0 right-0 z-50 text-black tablet:overflow-y-auto">
      <form onSubmit={hadleSubmitForm} className="w-full bg-white ipad:w-160 my-20 mx-auto">
        <div className="border-b-2 border-gray-200 text-xl font-bold py-6 px-4">
          CHOSSE YOUR LICENSE
        </div>
        <div className=" overflow-y-auto h-96 tablet:overflow-y-visible">
          <div className="px-8 py-8 text-black">
            <div className="text-2xl font-bold uppercase">Floating through Clouds</div>
            <div className="pt-5 text-lg">Magnus Ringblom</div>
          </div>
          <div className="mx-8 ipad:-my-8">
            <div className="flex my-8">
              <input
                type="radio"
                value="true"
                onChange={handleChange}
                name="isVatRemoved"
                defaultChecked
                className="h-6 w-6 mt-4 tablet:w-8 tablet:h-8"
              />
              <div className="flex flex-col mx-2 w-48 tablet:w-full">
                <span className="text-base font-semibold  tablet:text-xl">Standard</span>
                <span className="text-sm tablet:text-base">
                  All productions without marketing spend
                </span>
              </div>
              <div className="flex flex-col flex-grow tablet:w-44">
                <span className="text-base font-semibold tablet:text-xl">$99</span>
                <span className="text-sm tablet:text-base">per production</span>
              </div>
            </div>
            <div className="flex my-8">
              <input
                type="radio"
                value="true"
                onChange={handleChange}
                name="isVatRemoved"
                className="h-6 w-6 mt-4 tablet:w-8 tablet:h-8"
              />
              <div className="flex flex-col mx-2 w-48 tablet:w-full">
                <span className="text-base font-semibold tablet:text-xl">Social Media</span>
                <span className="text-sm tablet:text-base">Boosted posts on social media</span>
              </div>
              <div className="flex flex-col flex-grow tablet:w-44">
                <span className="text-base font-semibold tablet:text-xl">$149</span>
                <span className="text-sm tablet:text-base">per production</span>
              </div>
            </div>
            <div className="flex my-8">
              <input
                type="radio"
                value="true"
                onChange={handleChange}
                name="isVatRemoved"
                className="h-6 w-6 mt-4 tablet:w-8 tablet:h-8"
              />
              <div className="flex flex-col mx-2 w-48 tablet:w-full">
                <span className="text-base font-semibold tablet:text-xl">
                  Online Advertisements, National
                </span>
                <span className="text-sm tablet:text-base">
                  National advertisements distributed online
                </span>
              </div>
              <div className="flex flex-col flex-grow tablet:w-44">
                <span className="text-base font-semibold tablet:text-xl">$229</span>
                <span className="text-sm tablet:text-base">per production</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center justify-between pb-12 px-4 my-8 border-t-2 border-gray-200 tablet:flex-row tablet:my-16 ipad:my-2">
          <div className="text-lg">
            <button onClick={handleHideModal}>Close</button>
          </div>
          <div className="w-full bg-blue-500 py-2 my-8 tablet:w-32">
            <button type="submit" className="w-full">
              <div className="text-lg font-semibold text-center">Add to cart</div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
