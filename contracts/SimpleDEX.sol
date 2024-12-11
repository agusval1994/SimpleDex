// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Simple Decentralized Exchange (DEX)
/// @notice This contract facilitates token swaps and liquidity management.
/// @dev Uses a constant product formula for swaps.

contract SimpleDEX {

    /// @notice Address of the contract owner.
    address public owner;

    /// @notice The first token supported by this DEX.
    IERC20 public tokenA;
    /// @notice The second token supported by this DEX.
    IERC20 public tokenB;


    /// @notice Emitted when liquidity is added to the pool.
    /// @param owner The address adding the liquidity.
    /// @param amountA The amount of token A added.
    /// @param amountB The amount of token B added.
    event LiquidityAdded(address owner, uint256 amountA, uint256 amountB);

    /// @notice Emitted when liquidity is removed from the pool.
    /// @param owner The address removing the liquidity.
    /// @param amountA The amount of token A removed.
    /// @param amountB The amount of token B removed.
    event LiquidityRemoved(address owner, uint256 amountA, uint256 amountB);

    /// @notice Emitted when a token swap occurs.
    /// @param user The address performing the swap.
    /// @param amountIn The amount of input token swapped.
    /// @param amountOut The amount of output token received.
    event Swap(address indexed user, uint256 amountIn, uint256 amountOut);

    /// @dev Modifier to restrict access to the contract owner.
    modifier onlyOwner() {
        require(owner == msg.sender, "You are not the owner");
        _;
    }

    /// @notice Initializes the DEX with two tokens.
    /// @param _tokenA Address of token A.
    /// @param _tokenB Address of token B.
    constructor(address _tokenA, address _tokenB) {
        require(_tokenA != address(0) && _tokenB != address(0), "Invalid Address");

        tokenA = ERC20(_tokenA);
        tokenB = ERC20(_tokenB);

        owner = msg.sender;
    }

    /// @notice Adds liquidity to the pool.
    /// @param amountA The amount of token A to add.
    /// @param amountB The amount of token B to add.
    function addLiquidity(uint256 amountA, uint256 amountB) external  onlyOwner{
        require(amountA > 0 && amountB > 0, "The amount must be > 0");

        require(tokenA.transferFrom(msg.sender, address(this), amountA), "Token A transfer failed");
        require(tokenB.transferFrom(msg.sender, address(this), amountB), "Token B transfer failed");

        emit LiquidityAdded(msg.sender, amountA, amountB);
    }

    /// @notice Removes liquidity from the pool.
    /// @param amountA The amount of token A to remove.
    /// @param amountB The amount of token B to remove.
    function removeLiquidity(uint256 amountA, uint256 amountB) external  onlyOwner{
        require(amountA > 0 && amountB > 0, "The amount must be > 0");
        require(amountA <= tokenA.balanceOf(address(this)), "Not enough tokens");
        require(amountB <= tokenB.balanceOf(address(this)), "Not enough tokens");
    
        require(tokenA.transfer(owner, amountA), "Token A transfer failed");
        require(tokenB.transfer(owner, amountB), "Token B transfer failed");
    
        emit LiquidityRemoved(owner, amountA, amountB);
    }

    /// @notice Swaps token A for token B.
    /// @param amountAIn The amount of token A to swap.
    function swapAforB(uint256 amountAIn) external payable {
        require(amountAIn > 0, "The amount must be > 0");

        uint256 reserveA = tokenA.balanceOf(address(this)); // Reservas actuales de Token A
        uint256 reserveB = tokenB.balanceOf(address(this)); // Reservas actuales de Token B
    
        uint256 amountBOut = getAmount(amountAIn, reserveA, reserveB);
    
        require(tokenA.transferFrom(msg.sender, address(this), amountAIn), "Transfer failed");

        require(tokenB.transfer(msg.sender, amountBOut), "Transfer failed");
    
        emit Swap(msg.sender, amountAIn, amountBOut);
    }

    /// @notice Swaps token B for token A.
    /// @param amountBIn The amount of token B to swap.
    function swapBforA(uint256 amountBIn) external  payable {
        require(amountBIn > 0, "The amount must be > 0");

        uint256 reserveA = tokenA.balanceOf(address(this)); // Reservas actuales de Token A
        uint256 reserveB = tokenB.balanceOf(address(this)); // Reservas actuales de Token B
    
        uint256 amountAOut = getAmount(amountBIn, reserveB, reserveA);

        require(tokenB.transferFrom(msg.sender, address(this), amountBIn), "Transfer failed");

        require(tokenA.transfer(msg.sender, amountAOut), "Transfer failed");
    
        emit Swap(msg.sender, amountBIn, amountAOut);
    }


    /// @notice Gets the price of a token relative to the other.
    /// @param _token The token whose price to query.
    /// @return The price of the token in terms of the other token.
    function getPrice(address _token) public view returns (uint256){
        
        require(_token == address(tokenA) || _token == address(tokenB), "Invalid Token");

        uint256 multiplier = 1e18;

        uint256 reserveA = tokenA.balanceOf(address(this));
        uint256 reserveB = tokenB.balanceOf(address(this));
    
        if (_token == address(tokenA)) {
            return (reserveB * multiplier) / reserveA;
        } else {
            return (reserveA * multiplier) / reserveB;
        }
    }

    
    /// @notice Calculates the output amount based on the input amount and reserves.
    /// @param amountIn The input amount.
    /// @param reserveIn The reserve of the input token.
    /// @param reserveOut The reserve of the output token.
    /// @return The output amount.
    function getAmount(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) private pure returns (uint256){
        return (amountIn * reserveOut) / (reserveIn + amountIn);
    }
}