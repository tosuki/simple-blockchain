import { Block, create_block } from "./block"

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

export const validate_blockchain = <T> (blockchain: Block<T>[]): boolean => {
    blockchain.forEach((block, index) => {
        // to do
    })

    return false;
}