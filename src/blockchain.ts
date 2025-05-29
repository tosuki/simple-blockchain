import { Block, calculate_hash, create_block } from "./block"

export type Validation = 
    | { is_valid: true }
    | { is_valid: false, message: string }

export const create_blockchain = <T> (data: T, difficulty: number = 4): Block<T>[] => {
    return [create_block("0", data, 0, difficulty)]
}

export const get_latest = <T> (network: Block<T>[]): Block<T> => {
    return network[network.length - 1];
}

export const add_block = <T> (network: Block<T>[], data: T): Block<T>[] => {
    const latest: Block<T> = get_latest(network);

    network.push(create_block(latest.hash, data, network.length, latest.difficulty))

    return network;
}

export const validate_hash = <T> (block: Block<T>): boolean => {
    const regenerated_hash = calculate_hash(block);

    console.log(`Original hash: ${block.hash}, generated_hash: ${regenerated_hash}`)
    return block.hash === regenerated_hash;
}

export const validate_chain = <T> (previous_block: Block<T>, block: Block<T>) => {
    return previous_block.hash === block.previous_hash;
}

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