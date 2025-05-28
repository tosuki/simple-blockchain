import { Block } from "./block"

export const create_blockchain = <T> (genesis?: Block<T>): Block<T>[] => {
    if (!genesis) {
        return [];
    }

    const blockchain = []
    blockchain.push(genesis);

    return blockchain
}

export const validate_blockchain = <T> (blockchain: Block<T>[]) => {
    
}