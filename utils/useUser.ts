import useSWR from "swr"
import axiosInstance from "./axiosInstance"

const fetcher = url => axiosInstance.get(url).then(res => res.data)
export default function useUser (url) {
    const { data, error } = useSWR(url, fetcher)
  
    return {
      user: data,
      isLoading: !error && !data,
      isError: error
    }
  }