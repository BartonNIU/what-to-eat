import * as yup from "yup";

const errorMsg = {
  required: "这是必填项",
  match: "密码输入不一致",
  email: "邮箱格式不正确",
  length: "密码至少需要8位长度",
};

export const registerSchema = yup.object().shape({
  email: yup.string().email(errorMsg.email).required(errorMsg.required),
  password: yup.string().required(errorMsg.required).length(8, errorMsg.length),
  confirmPassword: yup
    .string()
    .required(errorMsg.required)
    .test(
      "match",
      errorMsg.match,
      (value, context) => value === context.parent.password
    ),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email(errorMsg.email).required(errorMsg.required),
  password: yup.string().required(errorMsg.required),
});

