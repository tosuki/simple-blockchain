import "make-promises-safe"
import { create_block, Block } from "./block"

const my_block: Block<string> = create_block("0", "bloco genesis", 0);

console.log(my_block);