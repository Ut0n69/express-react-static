import { useEffect } from "react";
import {
  Button,
  CircularProgress,
  useColorMode,
  useColorModePreference,
} from "@chakra-ui/react";
import { useRefetch, useFetch } from "./customHooks";

type Book = { id: number; name: string };

function App() {
  const { setColorMode } = useColorMode();
  const systemColorMode = useColorModePreference();
  useEffect(() => {
    if (systemColorMode) {
      setColorMode(systemColorMode);
    }
  }, [systemColorMode]);

  const { refetchToken, refetch } = useRefetch();
  const { data: books, loading: getBooksLoading } = useFetch<Book[]>("/books", {
    refetchToken,
  });

  const handleClick = async () => {
    refetch();
  };

  return (
    <div className="App">
      <main>
        <Button colorScheme="blue" onClick={handleClick}>
          Button
        </Button>
        {getBooksLoading ? (
          <CircularProgress />
        ) : (
          books?.map(({ id, name }: Book) => <div key={id}>{name}</div>)
        )}
      </main>
    </div>
  );
}

export default App;
