export async function POST(request) {
  const { length, options } = await request.json();

  const password = generatePassword(length, options);

  return new Response(JSON.stringify({ password }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

import { randomBytes } from 'crypto';

function generatePassword(length, options) {
  const charset = [];
  const mandatoryChars = [];

  // Use crypto for better randomness
  const getSecureRandomIndex = (max) => {
    const randomBuffer = randomBytes(1);
    return randomBuffer[0] % max;
  };

  if (options.lowercase) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    charset.push(lowercase);
    mandatoryChars.push(
      lowercase[getSecureRandomIndex(lowercase.length)]
    );
  }
  if (options.uppercase) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charset.push(uppercase);
    mandatoryChars.push(
      uppercase[getSecureRandomIndex(uppercase.length)]
    );
  }
  if (options.digits) {
    const digits = "0123456789";
    charset.push(digits);
    mandatoryChars.push(digits[getSecureRandomIndex(digits.length)]);
  }
  if (options.specials) {
    const specials = "!@$#%^(-)_'\"+=\\";
    charset.push(specials);
    mandatoryChars.push(specials[getSecureRandomIndex(specials.length)]);
  }

  const allChars = charset.join("");
  let password = mandatoryChars.join("");

  // Generate remaining characters
  for (let i = mandatoryChars.length; i < length; i++) {
    const randomIndex = getSecureRandomIndex(allChars.length);
    password += allChars[randomIndex];
  }

  // Secure shuffling using Fisher-Yates algorithm with crypto random
  const passwordArray = password.split("");
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = getSecureRandomIndex(i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
}
