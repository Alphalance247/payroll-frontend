import React from "react";

interface CardWalletType {
  color?: string;
}

const CardWallet = ({ color = "#E37915" }: CardWalletType) => {
  return (
    <>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.17435 5.0004V4.99998C2.17435 4.34784 2.68709 3.83331 3.33268 3.83331H16.666C17.3149 3.83331 17.8327 4.35112 17.8327 4.99998V15C17.8327 15.6488 17.3149 16.1666 16.666 16.1666H3.33268C2.68389 16.1666 2.16611 15.6489 2.16602 15.0002C2.16602 15.0001 2.16602 15 2.16602 15L2.17435 5.0004ZM16.666 15.5H17.166V15V9.99998V9.49998H16.666H3.33268H2.83268V9.99998V15V15.5H3.33268H16.666ZM16.666 7.16665H17.166V6.66665V4.99998V4.49998H16.666H3.33268H2.83268V4.99998V6.66665V7.16665H3.33268H16.666Z"
          fill={color}
          stroke={color}
        />
      </svg>
    </>
  );
};

export default CardWallet;
