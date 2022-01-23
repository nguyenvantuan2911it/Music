import { Button, Checkbox, Form, Input, message as $message, message, Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { registerAsync, selectUser } from '../features/auth/AuthSlice';
import { SignupParams } from '../interface/user/login';
import styles from '../styles/Register.module.scss';

const { Option } = Select;

function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isLoading, isSuccess, isError, errorMessage } = useAppSelector(selectUser);

  useEffect(() => {
    if (isError) {
      $message.error(errorMessage);
    }
    if (isSuccess) {
      message.success('Thành công!');
      router.push('/');
    }
  }, [isError, isSuccess, isLoading]);

  const onFinish = async (values: any) => {
    if (values.password !== values.rePassword) {
      message.error('Password not match!');
      return;
    }
    const user: SignupParams = {
      data: {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName,
        businessTypeString: businessTypeChoose,
      },
    };
    await dispatch(registerAsync(user));
  };

  const [businessTypeChoose, setBusinessTypeChoose] = useState<string>();
  const businessType = [
    {
      type: 'Broadcaster',
    },
    {
      type: 'Radio Channel',
    },
    {
      type: 'Media Company',
    },
    {
      type: 'Production Company',
    },
    {
      type: 'Post Production Company',
    },
    {
      type: 'Freelancer',
    },
    {
      type: 'Advertising/Communication Agency',
    },
    {
      type: 'Game Developer',
    },
    {
      type: 'Corporate Company',
    },
    {
      type: 'Online Platform (e.g YouTube or similar)',
    },
    {
      type: 'Charity Organisation',
    },
    {
      type: 'School',
    },
    {
      type: 'Restaurant/Hotel/Store',
    },
    {
      type: 'Other',
    },
  ];

  const [enableSignUp, setEnableSignUp] = useState<number[]>([0, 0, 0, 0, 0]);

  return (
    <div className="flex bg-black flex-col-reverse laptop:flex-row">
      <div className="w-full px-4">
        <div className="text-white hidden laptop:block desktop:mx-32">
          <div className="my-4 text-xl">SGM music</div>
          <div className=" text-4xl">Create account</div>
        </div>
        <div className={styles.login_left_part2 + ' flex justify-center'}>
          <div className={styles.auth_form}>
            <Form
              name="normal_login"
              className={styles.login_form}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              size={'large'}
            >
              <Form.Item className="error">{errorMessage}</Form.Item>

              <Form.Item name="firstName">
                <Input placeholder="First name" />
              </Form.Item>

              <Form.Item name="lastName">
                <Input placeholder="Last name" />
              </Form.Item>

              <Form.Item name="companyName">
                <Input placeholder="Company name" />
              </Form.Item>
              <Form.Item>
                <Select
                  onChange={(value) => {
                    //@ts-ignore
                    setBusinessTypeChoose(value);
                  }}
                  placeholder="Type of business"
                  className={styles.select}
                >
                  <Option value="">{'<< >>'}</Option>
                  {businessType.map((type, index) => (
                    <Option key={index} value={type.type}>
                      {type.type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input
                  onChange={(e) => {
                    setEnableSignUp(
                      e.target.value === ''
                        ? enableSignUp.map((check, ind) => (ind === 0 ? 0 : check))
                        : enableSignUp.map((check, ind) => (ind === 0 ? 1 : check))
                    );
                  }}
                  placeholder="Email Address"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    onChange={(e) =>
                      setEnableSignUp(
                        e.target.value === ''
                          ? enableSignUp.map((check, ind) => (ind === 1 ? 0 : check))
                          : enableSignUp.map((check, ind) => (ind === 1 ? 1 : check))
                      )
                    }
                  />
                </Form.Item>
                <small style={{ color: 'white' }}>
                  Your password should be a minimum of 8 characters with 1 special character
                  (!?&.@#~*()+,_-‘'‘) and 1 number.
                </small>
              </Form.Item>

              <Form.Item
                rules={[{ required: true, message: 'Please confirm password!' }]}
                name="rePassword"
              >
                <Input.Password
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setEnableSignUp(
                      e.target.value === ''
                        ? enableSignUp.map((check, ind) => (ind === 2 ? 0 : check))
                        : enableSignUp.map((check, ind) => (ind === 2 ? 1 : check))
                    )
                  }
                />
              </Form.Item>

              <Form.Item name="privacy" noStyle>
                <Checkbox
                  className="text-white mb-3"
                  onChange={(e) => {
                    setEnableSignUp(
                      e.target.checked
                        ? enableSignUp.map((check, ind) => (ind === 3 ? 1 : check))
                        : enableSignUp.map((check, ind) => (ind === 3 ? 0 : check))
                    );
                  }}
                >
                  I agree to the End user agreement and have read the Privacy policy.
                </Checkbox>
              </Form.Item>

              <Form.Item name="yearold" noStyle>
                <Checkbox
                  className="text-white"
                  style={{ marginLeft: '0px' }}
                  onChange={(e) => {
                    setEnableSignUp(
                      e.target.checked
                        ? enableSignUp.map((check, ind) => (ind === 4 ? 1 : check))
                        : enableSignUp.map((check, ind) => (ind === 4 ? 0 : check))
                    );
                  }}
                >
                  I am over 16 years old.
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  loading={isLoading}
                  type="primary"
                  htmlType="submit"
                  className={styles.regist_form_button + ' mt-5'}
                  disabled={
                    enableSignUp.reduce((enable, check) => {
                      return enable * check;
                    }, 1) === 1
                      ? false
                      : true
                  }
                >
                  Create account
                </Button>
              </Form.Item>
            </Form>
            <div className={styles.creatacc}>
              <Link href="/login">
                <a>Partner / MCN sign up</a>
              </Link>
              <Link href="/register">
                <a> Sign up for a subscription</a>
              </Link>
            </div>
            <div className={styles.creatacc}>
              <Link href="/login">
                <a>Have an account? Log in</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-60 relative laptop:h-full">
        <div className="text-white absolute block laptop:hidden top-8 left-8">
          <div className="my-4 text-xl">SGM music</div>
          <div className=" text-5xl">Create account</div>
        </div>
        <img className="w-full h-full object-cover" src="/imagelogin.jpg" alt="" />
      </div>
    </div>
  );
}

export default Register;
