import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import Web3 from "web3";

type UserPermission = {
  userAddr: string;
  destinationAddr: string;
  selectorId: string;
};

export function getMerkleTreeProof(
  userAddresses: string[],
  tokenAddresses: string[]
) {
  const web3 = new Web3();
  const userPermissions: UserPermission[] = userAddresses.map((_, index) => {
    return {
      userAddr: userAddresses[index],
      destinationAddr: tokenAddresses[index],
      selectorId: web3.utils.sha3("transfer(address,uint256)")!.slice(0, 10),
    };
  });

  console.log("---------");
  console.log("List user permissions");
  console.log("---------");
  console.log(userPermissions);

  const leafNodes = userPermissions.map((userPermission) =>
    keccak256(
      Buffer.concat([
        Buffer.from(userPermission.userAddr.replace("0x", ""), "hex"),
        Buffer.from(userPermission.destinationAddr.replace("0x", ""), "hex"),
        Buffer.from(userPermission.selectorId.replace("0x", ""), "hex"),
      ])
    )
  );

  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  console.log("---------");
  console.log("Merke Tree");
  console.log("---------");
  console.log(merkleTree.toString());
  console.log("---------");
  console.log("Merkle Root: " + merkleTree.getHexRoot());

  leafNodes.forEach((leafNode, index) => {
    console.log(`Proof ${index}:  + ${merkleTree.getHexProof(leafNode)}`);
  });

  return merkleTree.getHexRoot();
}
