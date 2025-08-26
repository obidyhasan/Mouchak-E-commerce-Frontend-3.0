import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import logo from "@/assets/icons/logo-icon.svg";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import type { IErrorResponse } from "@/types";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email("Invalid Email."),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId = toast.loading("Sending otp...");
    setButtonDisable(true);
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        setButtonDisable(false);
        toast.success(res.message, { id: toastId });
        navigate("/verify", { state: data.email, replace: true });
      }
    } catch (err: unknown) {
      console.error(err);
      setButtonDisable(false);
      toast.error((err as IErrorResponse).message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 max-w-sm mx-auto">
        <CardContent className="p-0">
          <div className="p-6 md:p-8">
            <Link replace to={"/"}>
              <img src={logo} className="mx-auto mb-3" />
            </Link>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-semibold mt-2">Welcome Back</h1>
                <p className="text-muted-foreground text-[13px] mt-1">
                  Enter your email and we'll send you a verification code
                </p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mb-1">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={buttonDisable}
                    className="w-full"
                  >
                    Continue
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="/">Terms of Service</Link> and{" "}
        <Link to="/">Privacy Policy</Link>.
      </div>
    </div>
  );
}
