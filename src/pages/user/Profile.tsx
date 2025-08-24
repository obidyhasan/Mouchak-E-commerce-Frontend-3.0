/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { divisions } from "@/constants/divisions";
import {
  useUpdateUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { setLoading } from "@/redux/features/loadingSlice";
import type { IErrorResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";

const userSchema = z.object({
  name: z
    .string("Name field required")
    .min(1, { message: "Name must be at least 1 characters" }),
  phone: z
    .string("Phone number must be string")
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh, Format: +8801XXXXXXXXX",
    }),
  division: z
    .string("Division field required")
    .min(2, { message: "Division field required" }),
  address: z
    .string("Address field required")
    .min(5, { message: "Address must be at least 5 characters" }),
});

const Profile = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [open, setOpen] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      phone: "",
      division: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user?.name,
        phone: user?.phone,
        division: user?.division,
        address: user?.address,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Updating user info...");
    setButtonDisable(true);
    try {
      const res = await updateUser({
        userInfo: data,
        id: user?._id,
      }).unwrap();
      if (res.success) {
        toast.success("User info updated successfully", { id: toastId });
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message ||
          (err as IErrorResponse).message ||
          "Something went wrong"
      );
    } finally {
      setButtonDisable(false);
    }
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-10">
        <div>
          <h1 className="font-medium text-lg md:text-xl text-center">
            Profile
          </h1>

          <div className="border p-4 rounded-md mt-6 space-y-3 max-w-2xl mx-auto">
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Name</p>
              <h2>{user?.name}</h2>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Email</p>
              <h2>{user?.email}</h2>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Phone Number</p>
              <h2>{user?.phone}</h2>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm mb-1 text-muted-foreground">Division</p>
              <h2>{user?.division}</h2>
            </div>
            <div className="">
              <p className="text-sm mb-1 text-muted-foreground">Address</p>
              <h2>{user?.address}</h2>
            </div>
          </div>

          {/* Dialog */}
          <div className="max-w-2xl mx-auto text-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <form>
                <DialogTrigger asChild>
                  <Button className="mt-5">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <Form {...form}>
                      <form
                        id="user-edit-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="pb-1">Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Jon Deo"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="sr-only">
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="pb-1">
                                Phone Number
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="01XXX-XXXXXX"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="sr-only">
                                This is your public display email.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="division"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="pb-1">Division</FormLabel>
                              <FormControl className="">
                                <Select
                                  defaultValue={user?.division}
                                  onValueChange={field.onChange}
                                  {...field.onBlur}
                                  {...field.onChange}
                                >
                                  <FormControl className="w-full">
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your Division" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {divisions.map((division, idx) => (
                                      <SelectItem key={idx} value={division}>
                                        {division}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormDescription className="sr-only">
                                This is your public display email.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="pb-1">Address</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Delivery address"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="sr-only">
                                This is your public display email.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      disabled={buttonDisable}
                      form="user-edit-form"
                      type="submit"
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
