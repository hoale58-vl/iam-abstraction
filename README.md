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

**Goerli**

MyToken1: [0x3c10E354EfA9e703f37f7C4Af940BA7b91dbe49f](https://goerli.basescan.org/address/0x3c10E354EfA9e703f37f7C4Af940BA7b91dbe49f)
MyToken2: [0x8bF7aF79cfb89d7E89cE6f73Af341A81cbD6936b](https://goerli.basescan.org/address/0x8bF7aF79cfb89d7E89cE6f73Af341A81cbD6936b)
MyToken3: [0x9f80aC79BDDe5441296e8Fb19716185610fb668E](https://goerli.basescan.org/address/0x9f80aC79BDDe5441296e8Fb19716185610fb668E)
MerkleProof: [0xb9cbf467afDc49e45214Edd2033E72019751ED66](https://goerli.basescan.org/address/0xb9cbf467afDc49e45214Edd2033E72019751ED66)
IamAbstraction: [0x2696e20AA4A6c5A2F570A7F8e1125D28C8eEd898](https://goerli.basescan.org/address/0x2696e20AA4A6c5A2F570A7F8e1125D28C8eEd898)

## Example workflow

- Take a look at scripts/deploy.ts or run command

```
cp .env.example .env
source .env && npx hardhat run --network goerli scripts/deploy.ts
```