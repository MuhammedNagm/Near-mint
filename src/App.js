import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import Form from "./components/Form";
import SignIn from "./components/SignIn";

const SUGGESTED_DONATION = "0";
const BOATLOAD_OF_GAS = Big(3)
  .times(10 ** 13)
  .toFixed();

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const [setMessages] = useState([]);

  useEffect(() => {
    // TODO: don't just fetch once; subscribe!
    // contract.getMessages().then(setMessages);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const { fieldset, message, donation } = e.target.elements;

    fieldset.disabled = true;

    // TODO: optimistically update page with new message,
    // update blockchain data in background
    // add uuid to each message, so we know which one is already known
    contract
      .nft_mint(
        {
          token_id: parseInt(Math.random() * 1000).toString(),
          receiver_id: currentUser.accountId,
          metadata: {
            title: message.value,
            description: message.value,
            media: NFTLINK.value,
            copies: 5,
          },
        },
        BOATLOAD_OF_GAS,
        Big("0.5")
          .times(10 ** 24)
          .toFixed()
      )
      .then((res) => {
        console.log(res);
        message.value = "";
        NFTLINK.value = "";
        donation.value = SUGGESTED_DONATION;
        fieldset.disabled = false;
        message.focus();
      });
  };

  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR MINT");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  return (
    <main>
      <header>
        <h1>NEAR MINT</h1>
        {currentUser ? (
          <button onClick={signOut}>Log out</button>
        ) : (
          <button onClick={signIn}>Log in</button>
        )}
      </header>
      {currentUser ? (
        <Form onSubmit={onSubmit} currentUser={currentUser} />
      ) : (
        <SignIn />
      )}
    </main>
  );
};

App.propTypes = {
  contract: PropTypes.shape({
    nft_mint: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }),
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
