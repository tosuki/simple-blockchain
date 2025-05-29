import { Block, calculate_hash, create_block } from "./block"

export const create_blockchain = <T> (genesis?: Block<T>): Block<T>[] => {
    if (!genesis) {
        return [];
    }

    const blockchain = []
    blockchain.push(genesis);

    return blockchain
}

export const get_latest = <T> (network: Block<T>[]): Block<T> => {
    return network[network.length - 1];
}

export const add_block = <T> (network: Block<T>[], data: T): Block<T>[] => {
    const latest: Block<T> = get_latest(network);

    network.push(create_block(latest.hash, data, network.length))

    return network;
}

export const validate_hash = <T> (block: Block<T>): boolean => {
    return block.hash === calculate_hash(block);
}

export const validate_chain = <T> (previous_block: Block<T>, block: Block<T>) => {
    return previous_block.hash === block.hash;
}

export const validate_blockchain = <T> (blockchain: Block<T>[]): boolean => {
    if (blockchain.length <= 1) {
        return true;
    }

    for (let i = 1; i < blockchain.length; i++) {
        const current_block = blockchain[i];
        const previous_block = blockchain[i - 1];

        if (!validate_hash(current_block) || !validate_chain(previous_block, current_block)) {
            return false;
        }
    }

    return true;
}