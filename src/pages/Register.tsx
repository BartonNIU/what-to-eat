import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/formSchema";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleClick = () => {
    history.push({
      pathname: "/login",
    });
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='text-2xl font-bold'>注册</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='border-b-2 p-3 m-5'
          placeholder='你的邮箱...'
          {...register("email")}
        />
        <p className='text-red-500'>{errors.email?.message}</p>
        <input
          className='border-b-2 p-3 m-5'
          type='password'
          placeholder='设置密码...'
          {...register("password")}
        />
        <p className='text-red-500 '>{errors.password?.message}</p>
        <input
          className='border-b-2 p-3 m-5'
          type='password'
          placeholder='再次输入密码...'
          {...register("confirmPassword")}
        />
        <p className='text-red-500 mb-5'>{errors.confirmPassword?.message}</p>
        <button className='bg-blue-500 hover:bg-blue-600 text-white px-10 py-3'>
          注册
        </button>
      </form>
      <div className='pt-5 border-b border-gray-500' onClick={handleClick}>
        已注册？点此登录
      </div>
    </div>
  );
}

export default Register;
