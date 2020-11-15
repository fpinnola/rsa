import { xgcd, gcd } from 'mathjs';

export const generateKeys = (p,q) => {
    const n = p*q;
    const phi = (p-1) * (q-1);
    var e = 0;

    //Can improve searching loop
    var search = true;
    while (search) {
        e = Math.floor(Math.random() * Math.floor(n-1));
        if (gcd(e,phi) == 1) { 
            search = false 
        }
    }


    //ed = 1 mod (phi)
    var d = xgcd(e,phi)._data[1];
    if (d < 0) {
        d += phi;
    }


    return [n, e, d];
}

const modular_pow = (base, exp, modulus) => {
    if (modulus == 1) {
        return 0
    }
    let c = 1
    for (let i = 0; i < exp ; i++) {
        c = (c * base) % modulus;
    }
    return c;
}

export const encrypt = (m, e, n) => {
    return modular_pow(m, e, n);
}

export const decrypt = (c, d, n) => {
    return modular_pow(c,d,n);
}
