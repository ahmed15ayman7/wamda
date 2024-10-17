import React from "react";
import {
  // Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

// مخطط التحقق باستخدام Zod
const registerSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب").nonempty("لا يمكن ترك الاسم فارغاً"),
  email: z.string().email("يجب إدخال بريد إلكتروني صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const router = useRouter();

  // تكامل zod مع react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  // دالة التسجيل
  const handleRegister = async (values: RegisterFormInputs) => {
    const loadingToastId = toast.loading("جارٍ تسجيل المستخدم...");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.update(loadingToastId, {
          render: "تم التسجيل بنجاح! حسابك في انتظار الموافقة.",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        reset(); // إعادة تعيين النموذج
        router.push("/authentication/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    }
    catch (error) {
      toast.update(loadingToastId, {
        render: (error as {message:string})?.message || "فشل التسجيل. يرجى المحاولة مرة أخرى.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleSubmit(handleRegister)}>
        <Stack mb={3}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          {/* استخدام Controller للتحكم في الحقل */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          {/* استخدام Controller للتحكم في الحقل */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          {/* استخدام Controller للتحكم في الحقل */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                type="password"
                variant="outlined"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Sign Up
        </Button>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
