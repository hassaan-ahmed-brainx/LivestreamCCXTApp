const ccxt = require('ccxt').pro;
require('dotenv').config(); 

const {symbol,amount,side} = require('./constants/constants')

async function tradeUSDTtoUSDC() {
  const Binance = new ccxt.binance({
    apiKey: process.env.API_KEY,
    secret: process.env.API_SECRET,
    enableRateLimit: true,
    options: {
      defaultType: 'future',
    },
  });

  Binance.set_sandbox_mode(true);

  let balances = await Binance.fetchBalance();
  let usdtBalance = balances.total.USDT;
  let usdcBalance = balances.total.USDC;

  console.log('USDT balance before Trade is: ', usdtBalance);
  console.log('USDC balance before Trade is: ', usdcBalance);


  try {
    const tradeResult = await Binance.createMarketOrder(symbol, side, amount);
    balances = await Binance.fetchBalance();
    usdtBalance = balances.total.USDT;
    usdcBalance = balances.total.USDC;
  
    console.log('Trade Result:', tradeResult);
    console.log('USDT balance after Trade is: ', usdtBalance);
    console.log('USDC balance after Trade is: ', usdcBalance);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
tradeUSDTtoUSDC();

