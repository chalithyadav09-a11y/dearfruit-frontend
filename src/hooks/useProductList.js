import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../utils/api-client";

const useProductsList = (query) => {
  const fetchFunction = ({ pageParm = 1 }) =>
    apiClient
      .get("/products", {params: { ...query, page: pageParm }})
      .then((res) => res.data);
  return useInfiniteQuery({
    queryKey: ["products", query],
    queryFn: fetchFunction,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : null;
    },
  });
};

export default useProductsList;
