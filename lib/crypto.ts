import crypto from 'crypto';

export function splitPrivateKey(privateKey: string, totalShares: number): Promise<string[]> {
  const shares: string[] = [];
  
  // Create random shares
  for (let i = 0; i < totalShares - 1; i++) {
    shares.push(crypto.randomBytes(32).toString('hex'));
  }
  
  // Create the last share so all shares XORed together equal the original key
  const keyBuffer = Buffer.from(privateKey);
  let lastShareBuffer = Buffer.alloc(keyBuffer.length);
  
  for (let i = 0; i < totalShares - 1; i++) {
    const shareBuffer = Buffer.from(shares[i], 'hex');
    for (let j = 0; j < lastShareBuffer.length; j++) {
      if (j < shareBuffer.length) {
        lastShareBuffer[j] ^= shareBuffer[j];
      }
    }
  }
  
  for (let i = 0; i < lastShareBuffer.length; i++) {
    lastShareBuffer[i] ^= keyBuffer[i];
  }
  
  shares.push(lastShareBuffer.toString('hex'));
  
  return Promise.resolve(shares);
}

export function reconstructPrivateKey(shares: string[]): Promise<string> {
  // XOR all shares together to get the original key
  const buffers = shares.map(share => Buffer.from(share, 'hex'));
  const result = Buffer.alloc(buffers[0].length);
  
  for (let i = 0; i < buffers.length; i++) {
    for (let j = 0; j < result.length; j++) {
      if (j < buffers[i].length) {
        result[j] ^= buffers[i][j];
      }
    }
  }
  
  return Promise.resolve(result.toString());
}