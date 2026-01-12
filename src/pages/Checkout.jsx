import React from "react";
import CheckoutComponent from "../components/checkoutcomponents/CheckoutComponent";
import { useCheckout } from "../features/checkout/hooks/useCheckout";

const CheckoutView = () => {
  const { book, handleBuy } = useCheckout();

  return (
    <div>
      <CheckoutComponent onSubmit={handleBuy} book={book} />
    </div>
  );
};

export default CheckoutView;
