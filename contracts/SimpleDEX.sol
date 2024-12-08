// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract SimpleDEX {

    address public owner;

    IERC20 public tokenA;
    IERC20 public tokenB;

    // Total de liquidez en el pool
    uint256 public totalLiquidity;

    constructor(address _tokenA, address _tokenB) {
        require(_tokenA != address(0) && _tokenB != address(0), "Invalid Address");

        tokenA = ERC20(_tokenA);
        tokenB = ERC20(_tokenB);

        owner = msg.sender;
    }

    event LiquidityAdded(address owner, uint256 amountA, uint256 amountB);
    event LiquidityRemoved(address owner, uint256 amountA, uint256 amountB);
    event Swap(address indexed user, uint256 amountIn, uint256 amountOut);

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not the owner");
        _;
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external  onlyOwner{
        require(amountA > 0 && amountB > 0, "The amount must be > 0");

        // Transferir los tokens A y B desde el owner al contrato
        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Token A transfer failed");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Token B transfer failed");

        // Registrar la liquidez total en el contrato
        totalLiquidity += (amountA + amountB);

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    function removeLiquidity(uint256 amountA, uint256 amountB) external  onlyOwner{
        require(amountA > 0 && amountB > 0, "The amount must be > 0");
        require(amountA <= tokenA.balanceOf(address(this)), "Not enough tokens");
        require(amountB <= tokenB.balanceOf(address(this)), "Not enough tokens");
    
        // Transferir los tokens A y B al propietario
        require(tokenA.transfer(owner, amountA), "Token A transfer failed");
        require(tokenB.transfer(owner, amountB), "Token B transfer failed");
    
        // Actualizar el total de liquidez
        totalLiquidity -= (amountA + amountB);
    
        emit LiquidityRemoved(owner, amountA, amountB);
    }

    function swapAforB(uint256 amountAIn) external payable {
        require(amountAIn > 0, "The amount must be > 0");

        uint256 reserveA = tokenA.balanceOf(address(this)); // Reservas actuales de Token A
        uint256 reserveB = tokenB.balanceOf(address(this)); // Reservas actuales de Token B
    
        uint256 amountBOut = getAmount(amountAIn, reserveA, reserveB);
    
        // Transferir Token A del usuario al contrato
        require(tokenA.transferFrom(msg.sender, address(this), amountAIn), "Transfer failed");
    
        // Transferir Token B del contrato al usuario
        require(tokenB.transfer(msg.sender, amountBOut), "Transfer failed");
    
        emit Swap(msg.sender, amountAIn, amountBOut);
    }

    function swapBforA(uint256 amountBIn) external  payable {
        require(amountBIn > 0, "The amount must be > 0");

        uint256 reserveA = tokenA.balanceOf(address(this)); // Reservas actuales de Token A
        uint256 reserveB = tokenB.balanceOf(address(this)); // Reservas actuales de Token B
    
        uint256 amountAOut = getAmount(amountBIn, reserveB, reserveA);
    
        // Transferir Token A del usuario al contrato
        require(tokenB.transferFrom(msg.sender, address(this), amountBIn), "Transfer failed");
    
        // Transferir Token B del contrato al usuario
        require(tokenA.transfer(msg.sender, amountAOut), "Transfer failed");
    
        emit Swap(msg.sender, amountBIn, amountAOut);
    }

    function getPrice(address _token) public view returns (uint256){
        
        require(_token == address(tokenA) || _token == address(tokenB), "Invalid Token");

        uint256 multiplier = 1e18; // Multiplicador para obtener 18 decimales

        uint256 reserveA = tokenA.balanceOf(address(this)); // Reservas de Token A
        uint256 reserveB = tokenB.balanceOf(address(this)); // Reservas de Token B
    
        if (_token == address(tokenA)) {
            // Precio de 1 Token A en términos de Token B
            return (reserveB * multiplier) / reserveA;
        } else {
            // Precio de 1 Token B en términos de Token A
            return (reserveA * multiplier) / reserveB;
        }
    }

    function getAmount(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) private pure returns (uint256){
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
}


/*
2) Falta documentacion estructurada.
7) Mezcla castellano e ingles dentro del codigo. Debería ser siempre en ingles, pero sino al menos no mezclar.
*/