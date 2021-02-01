import React, { Component } from "react";
import MyToken from "./contracts/EXTToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json"
import KYC from "./contracts/KYCContract.json"
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {loaded: false, KYCAddress: "0x123...", tokenSaleAddress: null, userTokens: 0};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();
      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );

      this.KYCInstance = new this.web3.eth.Contract(
        KYC.abi,
        KYC.networks[this.networkId] && KYC.networks[this.networkId].address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded: true, tokenSaleAddress: MyTokenSale.networks[this.networkId].address}, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
      let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
      this.setState({userTokens: userTokens});
  }

  handleBuyTokens = async () => {
    await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1", "wei")});
  }

  listenToTokenTransfer = async () => {
      await this.tokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens)
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKYCWhitelisting = async () => {
      await this.KYCInstance.methods.setKYCCompleted(this.state.KYCAddress).send({from: this.accounts[0]});
      alert("KYC for " + this.state.KYCAddress + " is completed");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Example token sale</h1>
        <p>Get your token today</p>
        <h2>KYC whitelisting</h2>
        Address to allow: <input type='text' name='KYCAddress' value={this.state.KYCAddress} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handleKYCWhitelisting}>Add to whitelist</button>
        <h2>Buy tokens</h2>
        <p>If you want to buy tokens send Wei to this address: {this.state.tokenSaleAddress}</p>
        <p>You currently have: {this.state.userTokens} EXT tokens</p>
        <button type="button" onClick={this.handleBuyTokens}>Buy more tokens</button>
      </div>
    );
  }
}

export default App;
