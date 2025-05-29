import "make-promises-safe"
import * as blockchain from "./blockchain"

const transactions = blockchain.create_blockchain(0);// 0 -> genesis block

blockchain.add_block(transactions, 5000);
console.log(transactions)//all transactions
console.log('Is transactions chain valid?', blockchain.validate_blockchain(transactions))