import { Block, calculate_hash, create_block } from "./block"

/**
 * Validation structure
 * If the chain is valid, the field is_valid will be true, otherwise it will be false
 * and there will be a message field telling you why it's false
 */
export type Validation = 
    | { is_valid: true }
    | { is_valid: false, message: string }

/**
 * Create a blockchain with a genesis block
 * @param data The data that will be inserted in the chain as the genesis block
 * @param difficulty The difficulty of the chain
 * @returns A list of blocks
 */
export const create_blockchain = <T> (data: T, difficulty: number = 4): Block<T>[] => {
    return [create_block("0", data, 0, difficulty)]
}

/**
 * Get the latest block in the chain
 * @param network The list of blocks
 * @returns The last block in the chain
 */
export const get_latest = <T> (network: Block<T>[]): Block<T> => {
    return network[network.length - 1];
}

/**
 * Add a block to the chain
 * @param network The list of block
 * @param data The data that will be inserted
 * @returns an updates version of the chain
 */
export const add_block = <T> (network: Block<T>[], data: T): Block<T>[] => {
    const latest: Block<T> = get_latest(network);

    network.push(create_block(latest.hash, data, network.length, latest.difficulty))

    return network;
}

/**
 * Validate the hash of the block, hash are deterministic, then if it is valid, the regenerated hash will be the same of the hash inside the block.
 * @param block The block to be validated
 * @returns true if valid, false if not
 */
export const validate_hash = <T> (block: Block<T>): boolean => {
    const regenerated_hash = calculate_hash(block);

    console.log(`Original hash: ${block.hash}, generated_hash: ${regenerated_hash}`)
    return block.hash === regenerated_hash;
}

/**
 * Validate a small piece of the chain
 * @param previous_block the previous block
 * @param block the block to be validated
 * @returns true or false
 */
export const validate_chain = <T> (previous_block: Block<T>, block: Block<T>) => {
    return previous_block.hash === block.previous_hash;
}

/**
 * Validate the entire chain
 * @param blockchain a list of all generated blocks
 * @returns Validation structure
 */
export const validate_blockchain = <T> (blockchain: Block<T>[]): Validation => {
    if (blockchain.length <= 1) {
        return { is_valid: true };
    }

    for (let i = 1; i < blockchain.length; i++) {
        const current_block = blockchain[i];
        const previous_block = blockchain[i - 1];

        if (!validate_hash(current_block)) {
            return {
                is_valid: false,
                message: `The blockchain(i: ${current_block.index})'s hash is invalid!`
            }
        }

        if (!validate_chain(previous_block, current_block)) {
            return {
                is_valid: false,
                message: `The block of index ${current_block.index} is invalid!`
            }
        }
    }

    return { is_valid: true };
}