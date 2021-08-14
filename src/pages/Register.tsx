import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../utils/formSchema";
import { useHistory } from "react-router-dom";
import { registerRequest } from "../apis/auth";
import Header from "../components/Header";

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

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log(data);
    setIsLoading(true);
    try {
      const result = await registerRequest(data.email, data.password);
      console.log(result);
      history.replace("/login");
    } catch (error) {
      console.error(error.message, error.response);
      setError(error.response?.data.msg || error.message);
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    history.replace({
      pathname: "/login",
    });
  };

  return (
    <>
      <Header />
      <div className=' h-screen flex flex-col justify-center items-center'>
        <div className='dark:text-white text-2xl font-bold mb-5'>注册</div>
        <div className='text-red-500 mb-3'>{error}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='border-b-2 p-3 m-2'
            placeholder='你的邮箱...'
            {...register("email")}
          />
          <div className='text-red-500 text-sm mb-3'>
            {errors.email?.message}
          </div>
          <input
            className='border-b-2 p-3 m-2'
            type='password'
            placeholder='设置密码...'
            {...register("password")}
          />
          <div className='text-red-500 text-sm mb-3'>
            {errors.password?.message}
          </div>
          <input
            className='border-b-2 p-3 m-2'
            type='password'
            placeholder='再次输入密码...'
            {...register("confirmPassword")}
          />
          <div className='text-red-500 text-sm mb-3'>
            {errors.confirmPassword?.message}
          </div>
          <button className='bg-blue-500 hover:bg-blue-600 text-white shadow-lg px-10 py-3'>
            {isLoading ? "注册中..." : "注册"}
          </button>
        </form>
        <div
          className='dark:text-white text-sm pt-5 border-b border-gray-500'
          onClick={handleClick}
        >
          已注册？点此登录
        </div>
      </div>
    </>
  );
}

export default Register;
