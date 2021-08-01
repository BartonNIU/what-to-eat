import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/formSchema";
import { useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleClick = () => {
    history.push({
      pathname: "/register",
    });
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='text-2xl font-bold mb-5'>登录</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className='border-b-2 p-3 m-2'
          placeholder='你的邮箱...'
          {...register("email")}
        />
        <div className='text-red-500 text-sm mb-3'>{errors.email?.message}</div>
        <input
          className='border-b-2 p-3 m-2'
          type='password'
          placeholder='登录密码...'
          {...register("password")}
        />
        <div className='text-red-500 text-sm mb-3'>
          {errors.password?.message}
        </div>
        <button className='bg-blue-500 hover:bg-blue-600 text-white px-10 py-3'>
          登录
        </button>
      </form>
      <div
        className='text-sm pt-5 border-b border-gray-500'
        onClick={handleClick}
      >
        还没账号？点此注册
      </div>
    </div>
  );
}

export default Login;
