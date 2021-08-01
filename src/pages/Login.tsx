import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/formSchema";

function Login() {
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

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='text-2xl font-bold'>登录</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} />
        <p>{errors.email?.message}</p>
        <input {...register("password")} />
        <p>{errors.password?.message}</p>
        <button>登录</button>
      </form>
    </div>
  );
}

export default Login;
