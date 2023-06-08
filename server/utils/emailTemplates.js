exports.emailUserNou = (parola) => {
  return {
    subiect: "Utilizator creat",
    text: `Felicitari, noul tau cont a fost creat cu succes. Parola ta este: ${parola}`,
  };
};

exports.schimbareParola = {
  subiect: "Parola schimbata",
  text: "Felicitari, parola ta a fost schimbata cu succes.",
};

exports.resetareParola = (token) => {
  return {
    subiect: "Resetare parola pentru aplicatia Spider",
    text: `Bună,
    \nAi cerut resetarea parolei pentru contul tău. Te rugăm să dai click pe link-ul următor pentru a-ți reseta parola:
    \nhttps://nice-plant-08c8cad03.3.azurestaticapps.net/reset/${token}
    \nÎn cazul în care nu ai cerut tu resetarea parolei, te rugăm să ignori acest mesaj.
    \nO zi bună în continuare!`,
  };
};
