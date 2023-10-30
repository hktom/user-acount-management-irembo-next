export const passwordSame = (password:string, password_confirmation:string) => {
  if (password === password_confirmation) {
    return true;
  }
  return false;
};

export const passwordCheck = (password: string) => {
  if (password.length < 8) {
    return false;
  }

  // one number
  if (!/\d/.test(password)) {
    return false;
  }

  // one lowercase
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // one uppercase
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }

  return true;
};

export const emailCheck = (email: string) => {
  if (!email) {
    return false;
  }
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
};
