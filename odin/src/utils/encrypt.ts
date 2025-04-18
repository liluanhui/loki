import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 生成RSA公私钥
 * @param env
 * @param outputPath
 */
export function generateRSAKeys(
  env: string = 'dev',
  outputPath: string = 'src/pem',
) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  const envPath = path.join(outputPath, env);
  if (!fs.existsSync(envPath)) {
    fs.mkdirSync(envPath, { recursive: true });
  }

  fs.writeFileSync(path.join(envPath, 'rsa_public_key.pem'), publicKey);
  fs.writeFileSync(path.join(envPath, 'rsa_private_key.pem'), privateKey);
}

// RSA加密
export function rsaEncrypt(data: string, env: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    fs.readFile(
      `src/pem/${env}/rsa_public_key.pem`,
      'utf-8',
      function (err, pem) {
        try {
          const buffer = Buffer.from(data, 'utf8');
          const encrypted = crypto.publicEncrypt(pem, buffer);
          resolve(encrypted.toString('base64'));
        } catch (error) {
          reject(error);
        }
      },
    );
  });
}

// RSA解密
export function rsaDecrypt(
  encryptedData: string,
  env: string,
): Promise<string> {
  return new Promise(function (resolve, reject) {
    fs.readFile(
      `src/pem/${env}/rsa_private_key.pem`,
      'utf-8',
      function (err, pem) {
        try {
          const buffer = Buffer.from(encryptedData, 'base64');
          const decrypted = crypto.privateDecrypt(
            {
              key: pem,
              padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            buffer,
          );
          resolve(decrypted.toString('utf8'));
        } catch (error) {
          reject(error);
        }
      },
    );
  });
}

// MD5加密
export function md5Encrypt(data: string): string {
  return crypto.createHash('md5').update(data).digest('hex').toUpperCase();
}

// AES加密
export function aesEncrypt(data: string, key: string): string {
  const cipher = crypto.createCipheriv(
    'aes-128-ecb',
    Buffer.from(key, 'utf8'),
    null,
  );
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// AES解密
export function aesDecrypt(encryptedData: string, key: string): string {
  const decipher = crypto.createDecipheriv(
    'aes-128-ecb',
    Buffer.from(key, 'utf8'),
    null,
  );
  let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function aesDecryptHex(encryptedData: string, key: string): string {
  const decipher = crypto.createDecipheriv(
    'aes-128-ecb',
    Buffer.from(key, 'utf8'),
    null,
  );
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

/**
 * 响应数据加密
 * @param params 待加密的参数
 * @returns 包含加密密钥和加密数据的对象
 */
export function responseEncrypt(params: any): { key: string; data: string } {
  // 将参数对象转换为JSON字符串后进行Base64编码
  const dataText = Buffer.from(JSON.stringify(params), 'utf8').toString(
    'base64',
  );

  // 截取Base64编码后的前16个字符作为密钥
  let key = dataText.substr(0, 16);

  // 如果密钥长度不足16位，用字符'a'补齐
  if (key.length < 16) {
    key = key.padEnd(16, 'a');
  }

  // 使用AES加密数据
  const data = aesEncrypt(JSON.stringify(params), key);

  // 返回加密密钥和加密后的数据
  return { key, data };
}

/**
 * 替换指定长度内的文本
 * @param {*} text 待处理文本
 * @param {*} preLen 前置长度
 * @param {*} nextLen 后置长度
 * @param {*} str 替换文本
 */
export const decryptString = (
  text: string,
  startLen: number,
  preLen = 3,
  nextLen = 3,
  str = '*',
) => {
  if (!text) return '';

  let textLength = String(text).length; // 待处理文本长度
  let undecryptTotalLength = Number(preLen + nextLen); // 需要明文显示的总长度
  let encryptLen = startLen || textLength - undecryptTotalLength;

  // 无替换文本情况
  if (undecryptTotalLength >= textLength) {
    // eslint-disable-next-line no-new-array
    return new Array(textLength).fill(str).join('');
  }

  let lastStr = [
    text.substr(0, preLen),
    // eslint-disable-next-line no-new-array
    new Array(encryptLen).fill(str).join(''),
    text.substr(-nextLen, nextLen),
  ];

  return lastStr.join('');
};

/**
 * 隐藏邮箱地址
 * @param {String} email
 * @returns {String}
 */
export const hideEmail = (email: string) => {
  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (!reg.test(email)) return email;

  const [localPart, domain] = email.split('@');
  const hiddenLocalPart = localPart.replace(/./g, '*');
  return `${hiddenLocalPart}@${domain}`;
};
