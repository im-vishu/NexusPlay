import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../store";

const SortSelector = () => {
  const sortOrders = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release date" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
  const setSortOrder = useGameQueryStore((s) => s.setSordOrder);
  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        bg="rgba(255, 255, 255, 0.06)"
        color="white"
        borderWidth="1px"
        borderColor="whiteAlpha.200"
        borderRadius="full"
        _hover={{ bg: "rgba(255, 255, 255, 0.12)" }}
        _expanded={{ bg: "rgba(255, 255, 255, 0.12)" }}
      >
        Order by: {currentSortOrder?.label || "Relevance"}
      </MenuButton>
      <MenuList
        bg="rgba(12, 20, 32, 0.98)"
        borderColor="whiteAlpha.200"
        boxShadow="0 18px 42px rgba(0, 0, 0, 0.38)"
        color="white"
        minW="230px"
        zIndex={30}
      >
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => setSortOrder(order.value)}
            key={order.value}
            value={order.value}
            bg="transparent"
            _hover={{ bg: "whiteAlpha.200" }}
            _focus={{ bg: "whiteAlpha.200" }}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
