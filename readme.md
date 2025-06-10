##
To install from scratch, first make a blank sentio project. The `sentio.yaml` file must match the new project information. For example if you want to make a new project called `xyz` then the yaml project name should also be called `xyz`.


### add contract
Next the contract can get added like this. This will add the contract to the `sentio.yaml` file. 
```yarn sentio add --chain sui_mainnet 0xc9ba51116d85cfbb401043f5e0710ab582c4b9b04a139b7df223f8f06bb66fa --name bluefin_perp```

Additionally simply copy paste this into `sentio.yaml` to get the same result:
```
project: bluefin_perps
contracts:
  - chain: sui_mainnet
    address: "0xcb4e1ee2a3d6323c70e7b06a8638de6736982cbdc08317d33e6f098747e2b438"
    name: bluefin_perp
```

### install sentio
1. Create API Key and Login
If you haven't done this before, Create and login with your API key.
Generate a new API Key
`npx @sentio/cli login --api-key <api-key>`

2. Create your Processor via CLI
`npx @sentio/cli create test`

3. Build and Upload your Processor
### build
Build the bindings with `yarn sentio build`.

### upload
Upload to sentio via `yarn sentio upload`





### Data Types
-- Order filled - `0xc9ba51116d85cfbb401043f5e0710ab582c4b9b04a139b7df223f8f06bb66fa5::order::OrderFillV2`
-- perp market creation - `0xc9ba51116d85cfbb401043f5e0710ab582c4b9b04a139b7df223f8f06bb66fa5::perpetual::PerpetualCreationEvent`
-- account position running balance - `0xcb4e1ee2a3d6323c70e7b06a8638de6736982cbdc08317d33e6f098747e2b438::position::AccountPositionUpdateEventV2`

-- account deposit - `0xcb4e1ee2a3d6323c70e7b06a8638de6736982cbdc08317d33e6f098747e2b438::margin_bank::BankBalanceUpdateV2`





misc:
<!-- -- perpetual v2 markets package? 0xcb4e1ee2a3d6323c70e7b06a8638de6736982cbdc08317d33e6f098747e2b438 -->