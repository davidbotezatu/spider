const Authenticate = () => {
  const cookies = document.cookie.split(";");
  console.log(cookies);

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    // Check if the cookie name matches the one you're looking for
    if (cookie.startsWith("yourCookieName=")) {
      return true; // Cookie exists
    }
  }

  return false; // Cookie does not exist
};

export default Authenticate;
