import { useQuery } from "@tanstack/react-query";
import { IFunc } from "../types";
import axios from "../utils/axios";

const useFunc = () => {
  const { data } = useQuery({
    queryKey: ['func'],
    queryFn: () => axios.get<IFunc[]>('/func'),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const funcs = (data?.data ?? []).sort((a, b) => a.name.localeCompare(b.name));

  return { funcs };
}

export default useFunc;
