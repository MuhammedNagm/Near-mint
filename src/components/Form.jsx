import React from "react";
import PropTypes from "prop-types";
import Big from "big.js";

export default function Form({ onSubmit, currentUser }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Sign NEAR MINT, {currentUser.accountId}!</p>
        <p className="highlight">
          <label htmlFor="message">NFT Name:</label>
          <input autoComplete="off" autoFocus id="message" required />
        </p>
        <p className="highlight">
          <label htmlFor="NFTLINK">NFT Link:</label>
          <input autoComplete="off" autoFocus id="NFTLINK" required />
        </p>
        <button type="submit">Mint</button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
};
