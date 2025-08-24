import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { setLoading } from "@/redux/features/loadingSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUser = () => {
  const { data, isLoading } = useUserInfoQuery(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return data?.data;
};

export default useUser;
