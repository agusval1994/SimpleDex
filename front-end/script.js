async function connectMeta(){
    alert("Estoy conectado")
    if (typeof window.ethereum !== 'undefined') {
        // Solicitar conexión a MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        greeterContract = new ethers.Contract(greeterAddress, greeterAbi, signer);
        document.getElementById("accountAddress").innerText = `Conectado: ${address}`;
    } else {
        alert('MetaMask no está instalado');
    }
}