
export const  generateVerificationCode = () => {
  // Verification code composition library
  var arrays = new Array(
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z'
  );
  // Re-initialize the verification code
  let code = '';
  // Get four random elements from the array to form a captcha
  for (var i = 0; i < 4; i++) {
    // Gets a random index of an array
    var r = parseInt(Math.random() * arrays.length);
    code += arrays[r];
  }
  // The verification code is added to the input
  return code;
}