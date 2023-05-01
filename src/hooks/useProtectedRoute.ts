import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useAppSelector } from "./useReduxStore";

export const useProtectedRoute = () => {
  const [redirectTo, setRedirectTo] = useState<string>('');
  const router = useRouter();
  const { isAuth, loading: loadingAuth, token } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!isAuth && !loadingAuth) {
      setRedirectTo('/');
    }
  }, [isAuth, loadingAuth]);

  useEffect(() => {
    if (redirectTo && !token) {
      router.push(redirectTo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectTo, token]);
}