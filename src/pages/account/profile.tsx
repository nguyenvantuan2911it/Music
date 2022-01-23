import { unwrapResult } from '@reduxjs/toolkit';
import { message, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Account, AccountApiFp } from 'src/api/api';
import { useAppSelector } from 'src/app/hooks';
import Loading from 'src/components/common/Loading/Loading';
import { getProfile, selectProfile, Profile } from 'src/features/account/profileSlice';
import { authorization, getStoreLocal } from 'src/features/auth/AuthSlice';
import AccountInfo from '.';
export interface ProfileProps {}

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [profileState, setProfileState] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    businessTypeString: 'school',
    address: '',
    country: '',
    email: '',
  });
  const [passForm, setPassForm] = useState({
    newpassword: '',
    currentpassword: '',
    confirmpassword: '',
  });
  const [profileForm, setProfileForm] = useState({});
  const { profile } = useAppSelector(selectProfile);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = getStoreLocal('id');
    if (!id) return;
    (async () => {
      try {
        setLoading(false);
        const res: any = await dispatch(getProfile(id));
        const data = unwrapResult(res);
        setProfileState(data);
      } catch (error) {}
      setLoading(false);
    })();
  }, [profileState]);

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setPassForm({ ...passForm, [name]: value });
  };
  const openNotificationWithIcon = (noti) => {
    notification[noti.type]({
      message: noti.message,
      description: noti.description,
    });
  };
  const handleSubmitPass = async (e) => {
    e.preventDefault();
    const { newpassword, confirmpassword, currentpassword } = passForm;
    if (newpassword !== confirmpassword) {
      openNotificationWithIcon({
        type: 'error',
        message: 'Error',
        description: 'Not match password',
      });
    } else {
      try {
        await AccountApiFp.accountChangePassword(
          { oldPassword: currentpassword, newPassword: newpassword },
          authorization()
        )();
        message.success('Success!');
      } catch (error) {
        message.error('Wrong password!');
      }
    }
  };

  const handleChangeProfile = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };
  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    if (!profile) return;
    setProfileState({ ...profileState, ...profileForm });

    try {
      setLoading(true);
      const res: Profile = await AccountApiFp.accountPrototypePatchAttributes(
        {
          id: profile.id,
          data: {
            id: profile.id,
            ...profileState,
            ...profileForm,
          },
        },
        authorization()
      )();
      setProfileState({ ...profileState, ...res });
    } catch (error) {}
    setLoading(false);
  };

  return (
    <AccountInfo>
      {loading && <Loading />}
      {profileState && (
        <>
          <form onSubmit={handleSubmitPass} className="w-full mt-0 laptop:-mt-10">
            <div className="text-2xl">Change Password</div>
            <input
              onChange={handleChangePass}
              type="password"
              placeholder="Current password"
              className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
              name="currentpassword"
              defaultValue=""
            />
            <input
              onChange={handleChangePass}
              type="password"
              placeholder="New password"
              className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
              name="newpassword"
              defaultValue=""
            />
            <input
              onChange={handleChangePass}
              type="password"
              placeholder="Confirm new password"
              className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
              name="confirmpassword"
              defaultValue=""
            />
            <button
              type="submit"
              className="bg-blue-500 w-full h-12 text-lg laptop:float-right laptop:w-44"
            >
              Change password
            </button>
          </form>
          <form className="my-20 laptop:mt-40" onSubmit={handleSubmitProfile}>
            <div className="text-2xl">Personal / Company information</div>
            <div className="w-full desktop:grid grid-cols-2 gap-5">
              <input
                onChange={handleChangeProfile}
                defaultValue={profileState.firstName}
                type="text"
                placeholder="First-name"
                className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
                name="firstName"
              />
              <input
                onChange={handleChangeProfile}
                defaultValue={profileState.lastName}
                type="text"
                placeholder="Last-name"
                className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
                name="lastName"
              />
            </div>
            <div className="w-full desktop:grid grid-cols-2 gap-5">
              <input
                onChange={handleChangeProfile}
                defaultValue={profileState.companyName}
                type="text"
                placeholder="companyName"
                className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
                name="companyName"
              />
              <select
                name="businessTypeString"
                onChange={handleChangeProfile}
                defaultValue={profileState.businessTypeString}
                className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
              >
                <option value="school" className="text-xl text-black">
                  School
                </option>
                <option value="channel" className="text-xl text-black">
                  Radio Channel
                </option>
                <option value="game" className="text-xl text-black">
                  Game Developer
                </option>
                <option value="ohter" className="text-xl text-black">
                  Other
                </option>
              </select>
            </div>
            <div className="w-full desktop:grid grid-cols-2 gap-5">
              <input
                onChange={handleChangeProfile}
                defaultValue={profileState.address}
                type="text"
                placeholder="Address"
                className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
                name="address"
              />
              <input
                onChange={handleChangeProfile}
                defaultValue={profileState.country}
                type="text"
                placeholder="City"
                className="w-full my-6 h-16 block px-2 text-white border-gray-500 outline-none bg-transparent text-xl border-2"
                name="country"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 w-full h-12 text-lg laptop:float-right laptop:w-44"
            >
              Change profile
            </button>
          </form>
        </>
      )}
    </AccountInfo>
  );
}
