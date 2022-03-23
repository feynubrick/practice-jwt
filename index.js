import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.SECRET;

const token = jwt.sign(
  {
    data: 'foobar',
  },
  SECRET,
  { expiresIn: '1s' }
);

console.log('token: ', token);

const getEpochTimeInSeconds = function (dateObj) {
  if (!dateObj) {
    dateObj = new Date();
  }
  const epochTimeInSeconds = Math.floor(dateObj.getTime() / 1000);
  return epochTimeInSeconds;
};

const decode = function (token) {
  console.log('** decode function **');
  try {
    const decoded = jwt.verify(token, SECRET);
    console.log(decoded);
    const epochTimeInSeconds = getEpochTimeInSeconds();
    console.log('epochTimeInSeconds: ', epochTimeInSeconds);
    console.log('expired? ', epochTimeInSeconds > decoded.exp);
  } catch (error) {
    console.log('decode function\n', error);
  }
};

const decodeIgnoreExpiration = function (token) {
  console.log('** decodeIgnoreExpiration function **');
  try {
    const decoded = jwt.verify(token, SECRET, { ignoreExpiration: true });
    console.log(decoded);
    const epochTimeInSeconds = getEpochTimeInSeconds();
    console.log('epochTimeInSeconds: ', epochTimeInSeconds);
    console.log('expired? ', epochTimeInSeconds > decoded.exp);
  } catch (error) {
    console.log('decodeIgnoreExpiration function\n', error);
  }
};

const ms = 2000;
setTimeout(decode, ms, token); // 만료시킴
setTimeout(decodeIgnoreExpiration, ms, token); // 만료시킴
