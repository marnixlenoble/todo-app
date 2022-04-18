import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { IUser } from "shared/types";

import type { RootState, AppDispatch } from "./store";
import { selectCurrentUser, setUserAction } from "./userSlice";
import { getRequest, postRequest } from "./utils";
import { useCallback } from "react";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

function useCurrentUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  function setUser(user: IUser) {
    dispatch(setUserAction(user));
  }

  return { user, setUser };
}

function useRequest() {
  const { user } = useCurrentUser();

  const post = useCallback(
    (endpoint: string, data: any) => {
      const headers = user
        ? ({ username: user.name } as { username: string })
        : {};
      return postRequest(endpoint, data, headers);
    },
    [user]
  );

  const get = useCallback(
    (endpoint: string, queryParams: Record<string, string>) => {
      const headers = user
        ? ({ username: user.name } as { username: string })
        : {};
      return getRequest(endpoint, headers, queryParams);
    },
    [user]
  );

  return { get, post };
}

export { useAppDispatch, useAppSelector, useCurrentUser, useRequest };
