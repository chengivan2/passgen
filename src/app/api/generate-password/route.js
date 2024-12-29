export async function POST(request) {
  const { length, options } = await request.json();

  // Generate the password based on the options and length
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
  if (options.lowercase) charset.push("abcdefghijklmnopqrstuvwxyz");
  if (options.uppercase) charset.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (options.digits) charset.push("0123456789");
  if (options.specials) charset.push("!@$#%^");

  const allChars = charset.join("");
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
}
