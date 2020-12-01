import Axios from 'axios';
import { verify } from 'jsonwebtoken'
import {JwtPayload} from '../models/doc/JwtDoc';
import {admin} from './../resources/Admin';
import {AdminDoc} from './../models/doc/AdminDoc';

interface JWK {
    alg:string,
    kty:string,
    use:string,
    n:string,
    e:string,
    kid:string,
    x5t:string,
    x5c:string[]
}

function cert2PEM(cert) {
    return `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`
}

export function decodeToken(token:string, jwks:JWK):JwtPayload{
    const signingKey = cert2PEM(jwks.x5c[0]);

    return verify(token, signingKey,  { algorithms: ['RS256'] })
}

export function getToken(authHeader:string):string{
    return authHeader.split(' ')[1]
}

export async function getJwks():Promise<JWK>{
    const jwksResponse = await Axios.get(process.env.JWTS_URL);
    const jwks = jwksResponse.data;
    return jwks.keys[0] as JWK;
}

export async function getSubject(authorizationToken:string):Promise<string>{
    const token = getToken(authorizationToken);
    const jwk = await getJwks();
    return decodeToken(token, jwk).sub;
}

/*
var jwksClient = require('jwks-rsa')
let client = jwksClient({jwksUri:URL})

var jwks;

var jsonwebtoken = require('jsonwebtoken');
var axios = require('axios');

const URL = 'https://dev-ckdxh0zt.us.auth0.com/.well-known/jwks.json';

axios.get(URL).then(res=>jwks=res.data);

const cert = jwks.keys[0].x5c[0];

var pem = `-----BEGIN CERTIFICATE-----
${cert}
-----END CERTIFICATE-----
`;

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNoN2Q5Q0ZUWEJzSmcwLXN4Qkk1eSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ja2R4aDB6dC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDk0OTE3MzQ5NzI2OTU5NjQzNzkiLCJhdWQiOlsiaHR0cHM6Ly9leHByZXNzLnNhbXBsZSIsImh0dHBzOi8vZGV2LWNrZHhoMHp0LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MDQ2ODA0MDksImV4cCI6MTYwNDc2NjgwOSwiYXpwIjoiNXRtZHZzQnl4N1kwdmxldlZhSDJpaU41U01KNEt5S1QiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.fiYKj9oaYFHTJBJhw5KVa_b13CJve0TT8HS57oyw7EhlwSlwZFhHhLCQaa9E9jHtyir744xZ84GpZfeCuI5BTM_UZCAs-jTv5gtReORTV9OYoYTGAh8MEY_W-g3go4ahVV5_M-2_mytuE_zHBQ2xyrkCu7_BUyQIRVh4SquB-Lfd2vKaMTCI-iVsC4mCtTTUJQ4bxodpBXghenikb_DKEcj1cLT-uLxJrRLhV97xx7H_I76ceCZIWBZHE_khP-fQBbHZaef4CEeNz0wOhkUcUTjvvHMAR49JTi1MbgMKYKu0A07NHe7rXXUUFBvyTQP116cnl9bLS45diMAOCtUr3Q`

const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNoN2Q5Q0ZUWEJzSmcwLXN4Qkk1eSJ9.eyJpc3MiOiJodHRwczovL2Rldi1ja2R4aDB6dC51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDk0OTE3MzQ5NzI2OTU5NjQzNzkiLCJhdWQiOlsiaHR0cHM6Ly9leHByZXNzLnNhbXBsZSIsImh0dHBzOi8vZGV2LWNrZHhoMHp0LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MDQ4MDUzNTQsImV4cCI6MTYwNDg5MTc1NCwiYXpwIjoiNXRtZHZzQnl4N1kwdmxldlZhSDJpaU41U01KNEt5S1QiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.LF2zVsUOG1c2PPbajWEXG16HqJTnKhRRLAK7j1oMsM77iC6vD8iaNIlsFS2afY96DERtG8QkOiv3nlMoI_vmBjPA-bPcjjMcf_1pROHvnSEBSFZ2mJRIUFmY772Eyu8pojbk8IalaUlTfKFZbn7CJNC6wc-Gy_U3CeFe8B1jS85Gr4o9y3XcaK_slFBw5rfOpgcVX8QP0-8FTctn4AIR3pasPO6ulvCA4L-Ll8IR_DgifMCSoQuXmQduCTNghfluL9S7FTB98TR821ccW_0WLT2Xe2_7jiD66ihzNZ_-Vw6UZ35DgBpHwhgPNjmiYzKIbAFOh1RNQ-L8S1uRmRXcRA`
jsonwebtoken.verify(token, pem, { algorithms: ['RS256'] })

const sercet = `gQqr6DY_r9W_MzGq93swCP_5EZ8BjrPWjhUe34Gw-HEl-SpHlAQ7KMVyTxE3KVis`
pem = `-----BEGIN CERTIFICATE-----
${sercet}
-----END CERTIFICATE-----
`

//const privateKey = 'privateKey'
var dummyToken
var payload = {data:'hi there'}
jsonwebtoken.sign(payload, privateKey, function(err, token){
    dummyToken = token
})
*/