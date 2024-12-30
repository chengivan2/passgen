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

function generatePassword(length, options) {
  const charset = [];
  const mandatoryChars = [];

  if (options.lowercase) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    charset.push(lowercase);
    mandatoryChars.push(
      lowercase[Math.floor(Math.random() * lowercase.length)]
    );
  }
  if (options.uppercase) {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charset.push(uppercase);
    mandatoryChars.push(
      uppercase[Math.floor(Math.random() * uppercase.length)]
    );
  }
  if (options.digits) {
    const digits = "0123456789";
    charset.push(digits);
    mandatoryChars.push(digits[Math.floor(Math.random() * digits.length)]);
  }
  if (options.specials) {
    const specials = "!@$#%^(-)_'\"+=\\";
    charset.push(specials);
    mandatoryChars.push(specials[Math.floor(Math.random() * specials.length)]);
  }

  const allChars = charset.join("");
  let password = mandatoryChars.join("");

  for (let i = mandatoryChars.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Shuffling the password to ensure the mandatory characters are not in a predictable order
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
}
