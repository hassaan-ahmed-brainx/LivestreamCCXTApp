const ccxt = require('ccxt').pro;
const {symbol,amount,side,price, apiKey, secret, timeLimit} = require('./constants/constants')

async function tradeUSDTtoUSDC() {
  const Binance = new ccxt.binance({
    apiKey: apiKey,
    secret: secret,
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
  
    console.log('Placing limit order...');

    const order = await Binance.createLimitOrder(
      symbol,
      side,
      amount,
      price
    );

    console.log('Limit Order Result:', order);


    const deadlineTimestamp = Date.now() + timeLimit;
    let orderStatus; 
    while (Date.now() < deadlineTimestamp) {

      orderStatus  = await Binance.fetchOrder(order.id, symbol);

      if (orderStatus.status === 'closed') {
        console.log('Order closed within the deadline.');
        break;
      }

      console.log('Order not closed yet. Checking again...');
      await new Promise(resolve => setTimeout(resolve, 1000)); 
    }


    if (orderStatus.status !== 'closed') {
      console.log('Cancelling order...');
      await Binance.cancelOrder(order.id, symbol);
      console.log('Order cancelled.');
    }

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
