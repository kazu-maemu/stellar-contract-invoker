import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { IKeyPair } from "../types";
import axios from "../utils/axios";

const useKeyPair = () => {
  const { setAccount } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ['key-pair'],
    queryFn: () => axios.get<IKeyPair[]>('/key-pair'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const keyPairs = (data?.data ?? []).sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (keyPairs.length > 0) {
      setAccount?.(keyPairs.find(k => k.pub_key == localStorage.getItem('account'))!);
    }
  }, [keyPairs]);

  return { keyPairs };
}

export default useKeyPair;