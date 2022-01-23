import {
  FacebookOutlined,
  GoogleCircleFilled,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import app from 'src/config/firebase-config';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginAsync, selectUser, socialLoginAsync } from '../features/auth/AuthSlice';
import { LoginParams } from '../interface/user/login';
import styles from '../styles/Login.module.scss';

function login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, isSuccess, isError } = useAppSelector(selectUser);

  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess]);

  const onFinish = async (values: any) => {
    const user: LoginParams = {
      credentials: {
        email: values.username,
        password: values.password,
      },
    };
    dispatch(loginAsync(user));
  };

  const handleSocialLoginOnClick = (provider: any) => {
    signInWithPopup(getAuth(app), provider)
      .then(async (res) => {
        var userLogin: LoginParams = {
          credentials: {
            email: res.user.email,
            password: res.user.email,
          },
        };
        await dispatch(socialLoginAsync(userLogin));
        return res.user;
      })
      .catch((err) => {
        return err;
      });
  };
  return (
    <div className="flex bg-black flex-col-reverse  laptop:flex-row">
      <div className="w-full px-4 py-40 ipad:py-48 laptop:py-96 laptop:fixed -top-12 left-10 right-0 desktop:left-20">
        <div className="-mt-20 laptop:-mt-80 ">
          <div className="text-white hidden max-w-lg mx-auto laptop:mx-0 laptop:block laptops:my-0 ">
            <div className=" text-xl my-5">SGM music</div>
            <div className=" text-5xl my-10 font-semibold laptop:text-4xl desktop:text-5xl">
              Login to SGM MUSIC
            </div>
          </div>
          <div className="max-w-lg mx-auto laptop:mx-0 laptops:my-0 pt-10 laptop:w-104 desktop:w-188">
            <div className={styles.auth_form}>
              <Form
                name="normal_login"
                className={styles.login_form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                size={'large'}
              >
                {isError && (
                  <Form.Item className="error">
                    <p className="text-red-500">Please check Email or Password</p>
                  </Form.Item>
                )}

                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    style={{ fontSize: 25 }}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className={styles.site_form_item_icon} />}
                    type="password"
                    placeholder="Password"
                    style={{ fontSize: 25 }}
                  />
                </Form.Item>

                <Form.Item className="flex ">
                  <div className="flex flex-row justify-between">
                    <Checkbox className="text-white" checked>
                      Remember me
                    </Checkbox>

                    <a className=" text-white" href="/forgot">
                      Forgot password
                    </a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button className="bg-sky-400 text-white" loading={isLoading} htmlType="submit">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
              <div className={styles.creatacc}>
                <Link href="/login-partner">
                  <a>Login for Partner</a>
                </Link>
                <Link href="/register">
                  <a> Create Account</a>
                </Link>
              </div>
              <div className=" mb-10 flex flex-col gap-3 desktop:flex-row desktop:justify-between">
                <Button
                  type="primary"
                  className={styles.social_login_button + ' w-full desktop:w-[200px]'}
                  onClick={() => {
                    handleSocialLoginOnClick(new FacebookAuthProvider());
                  }}
                  size="large"
                >
                  <FacebookOutlined className={styles.icon} />
                  <span>Login with Facebook</span>
                </Button>

                <Button
                  type="primary"
                  danger
                  className={styles.social_login_button + ' w-full desktop:w-[200px]'}
                  onClick={() => {
                    handleSocialLoginOnClick(new GoogleAuthProvider());
                  }}
                  size="large"
                >
                  <GoogleCircleFilled className={styles.icon} />
                  <span>Login with Google</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden laptop:block w-1/2"></div>
      <div className="w-full h-60 relative laptop:h-full laptop:w-1/2">
        <div className="text-white max-w-lg absolute laptop:hidden top-8 left-8 laptop: mx-auto laptops:my-0">
          <div className="my-4 text-xl">SGM music</div>
          <div className=" text-4xl font-semibold leading-10">Login to SGM MUSIC</div>
        </div>
        <img className="w-full h-full object-cover" src="/imagelogin.jpg" alt="" />
      </div>
    </div>
  );
}

export default login;
1;
