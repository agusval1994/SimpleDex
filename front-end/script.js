///////////////////////////////////////////////
//////     CONTRACTS INFORMARION     //////////
///////////////////////////////////////////////

address_dictionary = {
    tokenA : "0x6Ed697c0f1f126562886F8E6b441fF2A9707690E",
    tokenB : "0x8AF5c32624Efd3417AebB128DFa1Eb108E14e524",
    simpleDex : "0x26b5555F00Cfb3eb1DFc8D6523ACC161C22C6a8E"
}

let metamask_connected = false;
let metamask_address = "Metamask not connected";

const TokenAABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const TokenBABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SimpleDEXABI = [{"inputs":[{"internalType":"address","name":"_tokenA","type":"address"},{"internalType":"address","name":"_tokenB","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"LiquidityAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"LiquidityRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountIn","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountOut","type":"uint256"}],"name":"Swap","type":"event"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"addLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"removeLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountAIn","type":"uint256"}],"name":"swapAforB","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountBIn","type":"uint256"}],"name":"swapBforA","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"tokenA","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenB","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

///////////////////////////////////////////
//////     CONNECT METAMASK     ///////////
///////////////////////////////////////////

async function connectMeta() {
    if (typeof window.ethereum !== 'undefined') {
        // Request connection to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        metamask_address = address;
        metamask_connected = true;

        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

        document.getElementById("metabutton").innerText = shortAddress;
    } else {
        alert('MetaMask not installed');
    }
}

//////////////////////////////////////////////
//////     TOKENS APPROVE-MINT     ///////////
//////////////////////////////////////////////

async function handleApproveA() { 
    const amount = document.getElementById('approveAmountA').value;
    if (amount) { 
        await approveTokenA(amount); 
    } 
    else { 
        console.error('Amount is required'); 
    } 
}

async function handleApproveB() { 
    const amount = document.getElementById('approveAmountB').value;
    if (amount) { 
        await approveTokenB(amount); 
    } 
    else { 
        console.error('Amount is required'); 
    } 
}

async function approveTokenA(amount) {
    try {
  
      // Instantiate token contract
      const tokenA = address_dictionary.tokenA;
      const simpleDex = address_dictionary.simpleDex;
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenA, TokenAABI, signer);
  
      // Call approve function
      const tx = await tokenContract.approve(simpleDex, ethers.utils.parseUnits(amount.toString(), 18));
      console.log('Transaction sent:', tx.hash);
  
      // Wait confirmation
      await tx.wait();
      console.log('Approval completed');
      alert("Successful Minting TokenA");
    } catch (error) {
      console.error('Error while approving:', error);
    }
}

async function approveTokenB(amount) {
    try {
  
      // Instantiate token contract
      const tokenB = address_dictionary.tokenB;
      const simpleDex = address_dictionary.simpleDex;
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(tokenB, TokenBABI, signer);
  
      // Call approve function
      const tx = await tokenContract.approve(simpleDex, ethers.utils.parseUnits(amount.toString(), 18));
      console.log('Transaction sent:', tx.hash);
  
      // Wait confirmation
      await tx.wait();
      console.log('Approval completed');
      alert("Successful Minting TokenB");
    } catch (error) {
      console.error('Error while approving:', error);
    }
}


///////////////////////////////////////////////
//////     ADD-REMOVE LIQUIDITY     ///////////
///////////////////////////////////////////////

async function addLiquidity() {
    try {
        // Get the input values
        const tokenAAmount = document.getElementById("tokenAInput").value;
        const tokenBAmount = document.getElementById("tokenBInput").value;

        // Check the input amount
        if (!tokenAAmount || !tokenBAmount || isNaN(tokenAAmount) || isNaN(tokenBAmount)) {
            alert("Please enter valid amounts for both tokens.");
            return;
        }

        // Convert the values
        const tokenAAmountParsed = ethers.utils.parseUnits(tokenAAmount.toString(), 18);
        const tokenBAmountParsed = ethers.utils.parseUnits(tokenBAmount.toString(), 18);

        const simpleDex = address_dictionary.simpleDex;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(simpleDex, SimpleDEXABI, signer);

        // Call the addLiquidity function
        const tx = await dexContract.addLiquidity(tokenAAmountParsed, tokenBAmountParsed);

        // Wait transaction confirmation
        await tx.wait();

        alert("Successfully Added Liquidity.");
    } catch (error) {
        console.error("Error adding liquidity:", error);
        alert("An error occurred while trying to add liquidity.");
    }
}

async function removeLiquidity() {
    try {
        // Get the input values
        const tokenAAmount = document.getElementById("tokenAInput").value;
        const tokenBAmount = document.getElementById("tokenBInput").value;

        // Check the input amount
        if (!tokenAAmount || !tokenBAmount || isNaN(tokenAAmount) || isNaN(tokenBAmount)) {
            alert("Please enter valid amounts for both tokens.");
            return;
        }

        const tokenAAmountParsed = ethers.utils.parseUnits(tokenAAmount.toString(), 18);
        const tokenBAmountParsed = ethers.utils.parseUnits(tokenBAmount.toString(), 18);

        const simpleDex = address_dictionary.simpleDex;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(simpleDex, SimpleDEXABI, signer);

        // Call the addLiquidity function
        const tx = await dexContract.removeLiquidity(tokenAAmountParsed, tokenBAmountParsed);

        // Wait transaction confirmation
        await tx.wait();

        alert("Successfully removed Liquidity.");
    } catch (error) {
        console.error("Error removing liquidity:", error);
        alert("An error occurred while trying to remove liquidity.");
    }
}

/////////////////////////////////////////////////////////////////
//////     SWAP TOKEN A FOR B - AND TOKEN B FOR A     ///////////
/////////////////////////////////////////////////////////////////

async function swapTokenAForTokenB() {
    try {
        // Get the input values
        const tokenAAmount = document.getElementById("tokenAInput").value;

        // Check the input amount
        if (!tokenAAmount || isNaN(tokenAAmount) || Number(tokenAAmount) <= 0) {
            alert("Please enter a valid amount for Token A.");
            return;
        }

        const tokenAAmountParsed = ethers.utils.parseUnits(tokenAAmount.toString(), 18);

        const simpleDex = address_dictionary.simpleDex;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(simpleDex, SimpleDEXABI, signer);


        // Call the swapAforB function
        const tx = await dexContract.swapAforB(tokenAAmountParsed);

        // Wait transaction confirmation
        await tx.wait();

        alert("Swap completed successfully.");
    } catch (error) {
        console.error("Error when making the swap:", error);
        alert("An error occurred while trying to make the swap.");
    }
}

async function swapTokenBForTokenA() {
    try {
        // Get the input values
        const tokenBAmount = document.getElementById("tokenBInput").value;

        // Check the input amount
        if (!tokenBAmount || isNaN(tokenBAmount) || Number(tokenBAmount) <= 0) {
            alert("Please enter a valid amount for Token B.");
            return;
        }

        const tokenBAmountParsed = ethers.utils.parseUnits(tokenBAmount.toString(), 18);

        const simpleDex = address_dictionary.simpleDex;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(simpleDex, SimpleDEXABI, signer);


        // Call the swapBforA function
        const tx = await dexContract.swapBforA(tokenBAmountParsed);

        // Wait transaction confirmation
        await tx.wait();

        alert("Swap completed successfully.");
    } catch (error) {
        console.error("Error when making the swap:", error);
        alert("An error occurred while trying to make the swap.");
    }
}


/////////////////////////////////////
//////     GET PRICE     ///////////
////////////////////////////////////

async function getPrice() {
    try {
        // Get the input address
        const tokenAddress = document.getElementById("tokenAddressInput").value;

        // Validate the input address
        if (!tokenAddress || !ethers.utils.isAddress(tokenAddress)) {
            alert("Please enter a valid address.");
            return;
        }

        const simpleDex = address_dictionary.simpleDex;

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const dexContract = new ethers.Contract(simpleDex, SimpleDEXABI, signer);

        // Call the getPrice function
        const price = await dexContract.getPrice(tokenAddress);

        // Convert the price amount to display to the user
        const formattedPrice = ethers.utils.formatUnits(price, 18);

        alert("Price: " + formattedPrice);
    } catch (error) {
        console.error("Error getting price:", error);
        alert("An error occurred while trying to obtain the price.");
    }
}

/////////////////////////////////////////
//////     SHOW ADDRESSES     ///////////
/////////////////////////////////////////

function showDynamicText(buttonId, outputId) {

    var text;

    if(buttonId == "metamask"){
        text = metamask_address;
    }
    else{
        text = address_dictionary[buttonId] || "No text found for this button!";
    }

    const outputContainer = document.getElementById(outputId);

    // Crear contenido dinámico
    outputContainer.innerHTML = `
        <span>${text}</span>
        <img src="images/copyIcon.png" alt="Copy Icon" class="copy-icon" onclick="copyToClipboard('${text}')">
    `;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
}