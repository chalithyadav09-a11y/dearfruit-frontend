import apiClient from "../utils/api-client";
import { useQuery } from "@tanstack/react-query";

// Using useQuery hook
const useData = (
  endPoint,
  customConfig = {},
  queryKey,
  staleTime = 300_300
) => {
  const fetchFunction = () =>
    apiClient.get(endPoint, customConfig).then((res) => res.data);

  return useQuery({
    queryKey,
    queryFn: fetchFunction,
    staleTime,
  });
};

// 1st Approach
// const useData = (endPoint, customConfig, deps) => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(
//     () => {
//       setIsLoading(true);
//       apiClient
//         .get(endPoint, customConfig)
//         .then((res) => {
//           if (
//             endPoint === "/products" &&
//             data &&
//             data.products &&
//             customConfig.params.page !== 1
//           ) {
//             setData((prev) => ({
//               ...prev,
//               products: [...prev.products, ...res.data.products],
//             }));
//           } else {
//             setData(res.data);
//           }
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setIsLoading(false);
//         });
//     },
//     deps ? deps : []
//   );

//   return { data, error, isLoading };
// };

export default useData;
