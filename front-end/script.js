address_dictionary = {
    tokenA : "0x6Ed697c0f1f126562886F8E6b441fF2A9707690E",
    tokenB : "0x8AF5c32624Efd3417AebB128DFa1Eb108E14e524",
    simpleDex : "0x26b5555F00Cfb3eb1DFc8D6523ACC161C22C6a8E"
}

let metamask_connected = false;

const tokenA = 0x6Ed697c0f1f126562886F8E6b441fF2A9707690E;
const tokenB = 0x8AF5c32624Efd3417AebB128DFa1Eb108E14e524;
const simpleDex = 0x26b5555F00Cfb3eb1DFc8D6523ACC161C22C6a8E;
var metamask_address = "Metamask not connected";

const TokenAABI = "./abis/TokenA.json";
const TokenBABI = "./abis/TokenB.json";
const SimpleDEXABI = "./abis/SimpleDEX.json";

async function connectMeta() {
    alert("Estoy conectando");
    if (typeof window.ethereum !== 'undefined') {
        // Solicitar conexión a MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        metamask_address = address;
        metamask_connected = true;

        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

        document.getElementById("metabutton").innerText = shortAddress;
    } else {
        alert('MetaMask no está instalado');
    }
}

async function handleApproveA() { 
    const amount = document.getElementById('approveAmount').value;
    if (amount) { 
        await approveTokenA(amount); 
    } 
    else { 
        console.error('Amount is required'); 
    } 
}

async function handleApproveB() { 
    const amount = document.getElementById('approveAmount').value;
    if (amount) { 
        await approveTokenB(amount); 
    } 
    else { 
        console.error('Amount is required'); 
    } 
}

async function approveTokenA(amount) {
    try {
  
      // Crear instancia del contrato del token
      const tokenContract = new ethers.Contract(tokenA, TokenAABI, metamask_address);
  
      // Llamar a la función approve
      const tx = await tokenContract.approve(simpleDex, ethers.utils.parseUnits(amount.toString(), 18));
      console.log('Transacción enviada:', tx.hash);
  
      // Esperar la confirmación
      await tx.wait();
      console.log('Aprobación completada');
    } catch (error) {
      console.error('Error al realizar approve:', error);
    }
}

async function approveTokenB(amount) {
    try {
  
      // Crear instancia del contrato del token
      const tokenContract = new ethers.Contract(tokenB, tokenBABI, metamask_address);
  
      // Llamar a la función approve
      const tx = await tokenContract.approve(simpleDex, ethers.utils.parseUnits(amount.toString(), 18));
      console.log('Transacción enviada:', tx.hash);
  
      // Esperar la confirmación
      await tx.wait();
      console.log('Aprobación completada');
    } catch (error) {
      console.error('Error al realizar approve:', error);
    }
}

//-------------------------------------------------------------------

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
        .then(() => alert('Text copied to clipboard!'))
        .catch(err => console.error('Error copying text: ', err));
}