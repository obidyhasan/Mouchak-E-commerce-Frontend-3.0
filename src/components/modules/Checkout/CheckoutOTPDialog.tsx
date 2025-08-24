/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { authApi, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import type { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

interface CheckoutOTPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onConfirm: (toastId: any) => void;
}

const formSchema = z.object({
  pin: z.string().min(6, {
    message: "Your otp must be 6 character.",
  }),
});

export function CheckoutOTPDialog({
  open,
  onOpenChange,
  email,
  onConfirm,
}: CheckoutOTPDialogProps) {
  const [verifyOtp] = useVerifyOtpMutation();
  const [buttonDisable, setButtonDisable] = useState(false);
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

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
        onOpenChange(false);
        dispatch(authApi.util.resetApiState());
        const orderId = toast.loading("Your Order is processing...");
        onConfirm(orderId);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">Verify Email</DialogTitle>
            <DialogDescription className="text-center mt-3">
              Please enter the 6-digit code we sent to <br />
              <span className="font-medium text-primary">{email}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="mx-auto my-3">
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
          </div>
          <DialogFooter>
            <Button
              className="mx-auto"
              form="otp-form"
              disabled={buttonDisable}
              type="submit"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
