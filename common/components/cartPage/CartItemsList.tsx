import {
  Box,
  Paper,
  Table,
  TableBody,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItemCard from "./CartItemCard";
import { RootState } from "../../../store/types";
import { CartItem } from "../../types/@appTypes";

const CartItemsList = () => {
  const shoppingCart = useSelector(
    (state: RootState) => state.products.shoppingCart
  );
  const dispatch = useDispatch<any>();
  const remove = (item: CartItem) => {
    dispatch({ type: "REMOVE_FROM_SHOPPING_CART", payload: item });
  };

  //
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const rows = [
    () => 1,
    () => 2,
    () => 3,
    () => 4,
    () => 5,
    () => 6,
    () => 7,
    () => 8,
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //
  return (
    <Box>
      {shoppingCart.length !== 0 ? (
        <Table
          component={Paper}
          elevation={1}
          stickyHeader
          aria-label="sticky table"
        >
          <TableBody sx={{ height: 500 }}>
            {shoppingCart
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <CartItemCard
                  key={item._id}
                  product={item as CartItem}
                  remove={remove}
                />
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[2, 3, 5, 7, 10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
      ) : (
        <Typography variant="h6" sx={{ p: 12, mb: 60 }}>
          Cart Is empty.
        </Typography>
      )}
    </Box>
  );
};

export default CartItemsList;
