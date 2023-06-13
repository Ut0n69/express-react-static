import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const apiBase = process.env.REACT_APP_API_BASE || "";

type UseFetchParams = {
  body?: BodyInit;
  refetchToken?: string;
};
export const useFetch = <T>(url: string, params?: UseFetchParams) => {
  const { body, refetchToken = "refetchToken" } = params || {};

  const toast = useToast();
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(undefined);
        const uri = `${apiBase}${url}`;
        const response = await fetch(uri, { body });
        const data = await response.json();
        setData(data);
      } catch (error) {
        toast({
          title: "Something went wrong",
          position: "bottom-right",
        });
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [refetchToken]);

  return { data, error, loading };
};

type UsePostParams = {
  [key: string]: unknown;
};
export const usePost = (url: string) => {
  const toast = useToast();
  const [error, setError] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(false);
  const post = async (body: UsePostParams): Promise<void> => {
    const uri = `${apiBase}${url}`;
    try {
      setLoading(true);
      setError(undefined);

      await fetch(uri, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        position: "bottom-right",
      });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { post, error, loading };
};

export const useRefetch = () => {
  const [refetchToken, setRefetchToken] = useState<string>(uuidv4());
  const refetch = () => {
    setRefetchToken(uuidv4());
  };
  return { refetchToken, refetch };
};
