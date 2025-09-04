/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import logo from "@/assets/icons/logo-icon.svg";
import { Dot } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your otp must be 6 character.",
  }),
});

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [verifyOtp] = useVerifyOtpMutation();
  const [buttonDisable, setButtonDisable] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  // check if user have validate route
  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setButtonDisable(true);
    const toastId = toast.loading("Verifying OTP...");
    const userInfo = {
      email,
      otp: data.pin,
    };

    try {
      const res = await verifyOtp(userInfo).unwrap();
      if (res.success) {
        setButtonDisable(false);
        toast.success("OTP verified", { id: toastId });
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error(err);
      setButtonDisable(false);
      toast.error(
        (err?.data as IErrorResponse).message || "Something went wrong",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card>
        <CardHeader className="space-y-1">
          <Link replace to={"/"}>
            <img src={logo} className="mx-auto mb-2 w-20" />
          </Link>
          <CardTitle className="text-xl text-center">Verify Email </CardTitle>
          <CardDescription className="text-center text-sm">
            Please enter the 6-digit code we sent to <br />{" "}
            <span className="font-medium text-primary">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="otp-form"
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <Dot />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                        </InputOTPGroup>
                        <InputOTPGroup>
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button form="otp-form" disabled={buttonDisable} type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
