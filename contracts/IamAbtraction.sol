// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {MerkleProof} from "./MerkleProof.sol";
import {IGnosisSafe} from "./IGnosisSafe.sol";

/// @title Iam Abtraction
/// @author lvhoa58
contract IamAbstraction {
    bytes32 public immutable merkleRoot;
    address public immutable safe;

    constructor(address safe_, bytes32 merkleRoot_) {
        merkleRoot = merkleRoot_;
        safe = safe_;
    }

    /**
     * @notice Executes with permission proof
     * @dev This method will check if the signer has the permission to execute this call
     * @param to Destination address.
     * @param value Ether value.
     * @param merkleProof Data payload.
     * @param data Data payload.
     */
    function exec_with_permission_proof(
        address to,
        uint256 value,
        bytes32[] calldata merkleProof,
        bytes calldata data
    ) external {
        address from = msg.sender;
        bytes4 selector = bytes4(data[:4]);
        bytes32 node = keccak256(
            abi.encodePacked(from, to, selector)
        );
        bool isValidProof = MerkleProof.verifyCalldata(
            merkleProof,
            merkleRoot,
            node
        );
        require(isValidProof, 'Invalid proof.');

        require(
            IGnosisSafe(safe).execTransactionFromModule(
                to,
                value,
                data,
                IGnosisSafe.Operation.Call
            ),
            "Transaction reverted"
        );
    }
    
}