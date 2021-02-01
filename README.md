# Token example with truffle

Project was made as an investigation in cryptocurrency sphere.

# Description

There is an ERC20 token which can be sold using MyTokenSale contract. 

There is also know your customer verification (KYC) and simple react UI.

# Configure project
Firstly you should install truffle using this command:
```
$ npm install -g truffle
```
Use `npm install` in client folder to install dependencies.

# Run
`truffle develop` will open local blockchain, you also can specify network by `--network network_name`

In client folder you can start react server by `npm start`

# Migrations
After connecting to any kind of blockchain you need to migrate contracts to that net, so use:
```
$ truffle migrate
```

# Testing

To run tests use `truffle test` or just `test` after `truffle develop`
