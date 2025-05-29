import * as crypto from "crypto"

export type Block <T> = {
    hash?: string
    data: T
    index: number
    timestamp: number
    difficulty: number
    nonce: number
    previous_hash: string
}

export const calculate_hash = <T> (block: Block<T>): string => {
    const input = `${block.index}${block.timestamp}${block.data}${block.previous_hash}${block.nonce}`;

    return crypto.createHash("sha256").update(input).digest("hex");
}

/**
 * Validate the block to be part of the blockchain
 * @param The last block of the chain 
 * @returns the new block hash
 */
export const mine_block = <T> (block: Block<T>): string => {
    const target = "0".repeat(block.difficulty);
    let hash = calculate_hash(block);
    
    while(!hash.startsWith(target)) {
        block.nonce++;
        hash = calculate_hash(block);
    }

    return hash;
}

export const create_block = <T> (previous_hash: string, data: T, index: number, difficulty: number = 4): Block<T> => {
    const block: Block<T> = {
        data,
        index,
        previous_hash,
        difficulty,
        timestamp: Date.now(),
        nonce: 0
    }

    block.hash = mine_block(block);

    return block;
}
