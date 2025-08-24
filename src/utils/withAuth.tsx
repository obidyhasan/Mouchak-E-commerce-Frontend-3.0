import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { setLoading } from "@/redux/features/loadingSlice";
import { useEffect, type ComponentType } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";

export const withAuth = (
  Component: ComponentType,
  ...requiredRole: string[]
) => {
  return function AuthRapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to={"/login"} />;
    }

    if (
      requiredRole.length > 0 &&
      !isLoading &&
      !requiredRole.includes(data?.data?.role)
    ) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };
};
