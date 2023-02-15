//Fernet
var fernet = require("./fernet");

var secret = new fernet.Secret("cw_0x689RpI-jtRR7oE8h_eQsKImvJapLeSbXpwF4e4=");

var token = new fernet.Token({
  secret: secret,
  time: Date.parse(1),
  iv: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
});
token.encode("Nikovo sporocilo");

var token = new fernet.Token({
  secret: secret,
  token:
    "gAAAAABSO_yhAAECAwQFBgcICQoLDA0OD1PGoFV6wgWZG6AOBfQqevwJT2qKtCZ0EjKy1_TvyxTseR_3ebIF6Ph-xa2QT_tEvg==",
  ttl: 0,
});
token.decode();

//Branca
const key = crypto.randomBytes(32);
const branca = require("branca")(key);

const json = JSON.stringify({
  uporabnik: "nik@gmail.com",
  scope: ["read", "write", "delete"],
});

const token = branca.encode(json);
const payload = branca.decode(token);

payload = payload * 1;

//PASETO
const paseto = require("paseto");

const { V4 } = paseto;

const {
  V4: { sign },
} = paseto(async () => {
  {
    const token = await sign({ sub: "nikkovacevic" }, privateKey);
  }
})();

const {
  V4: { verify },
} = paseto(async () => {
  {
    const payload = await verify(token, publicKey);
  }
})();
