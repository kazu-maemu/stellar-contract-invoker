import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { IContract } from "../types";
import axios from "../utils/axios";

const useContract = () => {
  const { setContract } = useContext(AppContext);

  const { data } = useQuery({
    queryKey: ['contract'],
    queryFn: () => axios.get<IContract[]>('/contract'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const contracts = (data?.data ?? []).sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (contracts.length > 0) {
      setContract?.(contracts.find(c => c.contract_id == localStorage.getItem('contract'))!);
    }
  }, [contracts]);

  return { contracts };
}

export default useContract;