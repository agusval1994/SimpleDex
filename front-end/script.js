async function connectMeta() {
    alert("Estoy conectando");
    if (typeof window.ethereum !== 'undefined') {
        // Solicitar conexión a MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

        document.getElementById("metabutton").innerText = shortAddress;
    } else {
        alert('MetaMask no está instalado');
    }
}