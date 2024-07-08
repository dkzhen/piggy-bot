const { ethers } = require("ethers");
const { maxEthFee, gasLimit } = require("../configs/config");
const callAPI = require("./ClaimWithFee");

async function monitorGasAndExecute(contractAddress, contractABI, privateKey) {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://arbitrum.llamarpc.com"
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  let feeData = await provider.getFeeData();
  let claimApi = await callAPI();
  while (true) {
    try {
      console.log(
        `Current gas price: ${ethers.utils.formatUnits(
          feeData.gasPrice,
          "gwei"
        )}`
      );
      console.log(claimApi);
      const gasPrice = feeData.gasPrice;
      const transactionData = {
        to: contractAddress,
        data: contract.interface.encodeFunctionData("claim", [
          "1370196228",
          "0x86e70C09e3cDd4e63C57DDE359c7e90687360f63",
          claimApi.expire_time,
          claimApi.sign,
        ]),
        gasLimit: gasLimit,
      };

      const gasEstimate = await provider.estimateGas(transactionData);
      const transactionFeeWei = gasPrice.mul(gasEstimate);
      const transactionFeeEth = ethers.utils.formatUnits(
        transactionFeeWei,
        "ether"
      );

      console.log(`Estimated Transaction Fee in Ether: ${transactionFeeEth}`);

      if (parseFloat(transactionFeeEth) < maxEthFee) {
        const tx = await contract.claim(
          "1370196228",
          "0x86e70C09e3cDd4e63C57DDE359c7e90687360f63",
          claimApi.expire_time,
          claimApi.sign,
          {
            gasPrice: gasPrice,
            gasLimit: gasLimit,
          }
        );
        await tx.wait();
        console.log("Transaction executed", tx.hash);

        // Delay execution retry by 2 hours
        await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 60 * 1000));
      } else {
        console.log("Gas price too high, waiting...");
        // Wait for 30 minutes before retry
        await new Promise((resolve) => setTimeout(resolve, 30 * 60 * 1000));
      }
      feeData = await provider.getFeeData();
      claimApi = await callAPI();
    } catch (error) {
      console.error(`Error in claim: ${error}`);
      // Delay retry on error by 2 hours
      await new Promise((resolve) => setTimeout(resolve, 2 * 60 * 60 * 1000));
      feeData = await provider.getFeeData();
      claimApi = await callAPI();
    }
  }
}

module.exports = monitorGasAndExecute;
