# IAM Abstraction

**Secure access to your organization by Web3**

## What
The main idea is that all the employees in an organization would able to interact with the blockchain without paying any fee by using an abstract account (In this demo, we are using Safe).

## How it works

**Register merkle tree**

1. The org defines the list of employees (user address) and permissions (destination address + method selector id).
2. Grant permission to each user 1-by-1
3. The data will become node leaf in merkle tree
5. This hash tree (proofs) will be saved off-chain while the top-hash (root proofs) will stored on-chain

**User verify permission to do something cool onchain**

The user interact with the contract account by submit

1. The action payload
2. The required permission (destination address + method selector id)

*E.g*: User A want to transfer ERC20 to somebody
- Action Payload = Transfer Selector + Receiver + Token Amount
- Permission = ERC20 Address + Selector ID (ERC20.transfer)

## Deployed contracts

Goerli: [0xb9Cd1dd44799f508769040156962E01ADf97e330](https://goerli.basescan.org/address/0xb9Cd1dd44799f508769040156962E01ADf97e330)


## Example workflow

- Take a look at scripts/deploy.ts or run command

```
cp .env.example .env
source .env && npx hardhat run --network goerli scripts/deploy.ts
```