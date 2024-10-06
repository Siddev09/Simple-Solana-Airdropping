const { Keypair, clusterApiUrl, PublicKey, Connection, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const wallet = new Keypair()


const publicKey = new PublicKey(wallet._keypair.publicKey);
const secretKey = wallet._keypair.secretKey

const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`wallet balance is ${walletBalance}`);
    } catch (error) {
        console.log(error);
    }
}
const airDrop = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const fromAirDropSign = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction({
            signature: fromAirDropSign,
            blockhash: (await connection.getLatestBlockhash()).blockhash
        });
    } catch (error) {
        console.log(error);
    }
}
const main = async () => {
    await getWalletBalance();
    await airDrop();
    await getWalletBalance();
};

main();