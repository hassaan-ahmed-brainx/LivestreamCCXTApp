const ccxt = require('ccxt').pro;
const {symbol,amount,side,price} = require('./constants/constants')
require('dotenv').config(); 


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

  try {

    let balances = await Binance.fetchBalance();
    let usdtBalance = balances.total.USDT;
    let usdcBalance = balances.total.USDC;
  
    console.log('USDT balance before Trade is: ', usdtBalance);
    console.log('USDC balance before Trade is: ', usdcBalance);

    

    const order = await Binance.createLimitOrder(
      symbol,
      side,
      amount,
      price
    );

    console.log('Limit Order Result:', order);

    balances = await Binance.fetchBalance();
    usdtBalance = balances.total.USDT;
    usdcBalance = balances.total.USDC;

    console.log('USDT balance after Trade is: ', usdtBalance);
    console.log('USDC balance after Trade is: ', usdcBalance);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

tradeUSDTtoUSDC();
