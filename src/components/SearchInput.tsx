import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useGameQueryStore from "../store";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        setSearchText(ref.current!.value);
        navigate("/");
      }}
    >
      <InputGroup>
        <InputLeftElement color="whiteAlpha.600" children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius="full"
          placeholder="Search games..."
          bg="rgba(255, 255, 255, 0.06)"
          borderWidth="1px"
          borderColor="whiteAlpha.200"
          _placeholder={{ color: "whiteAlpha.600" }}
          _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
          _focusVisible={{
            borderColor: "blue.300",
            boxShadow: "0 0 0 1px rgba(147, 197, 253, 0.6)",
          }}
          onChange={(event) => {
            setSearchText(event.currentTarget.value);
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
