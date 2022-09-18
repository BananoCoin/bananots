import * as index from './index';
import * as crypto from 'crypto';
import * as httpsRateLimit from 'https-rate-limit';

const bananodeUrl = 'https://kaliumapi.appditto.com/api';

const run = async () => {
  httpsRateLimit.setUrl(bananodeUrl);
  const seed: string = crypto.randomBytes(32).toString('hex');
  console.log('seed', seed);
  const privateKey: string = index.getPrivateKeyFromSeed(seed, 0);
  console.log('privateKey', privateKey);
  const publicKey: string = await index.getPublicKeyFromPrivateKey(privateKey);
  console.log('publicKey', publicKey);
  const account: string = index.getAccountFromPublicKey(publicKey);
  console.log('account', account);
  const accountInfoReq = {
    action: 'account_info',
    account: account,
    count: 1,
  };
  console.log(accountInfoReq);
  const accountInfoResp = await httpsRateLimit.sendRequest(accountInfoReq);
  console.log(accountInfoResp);
};
run();
