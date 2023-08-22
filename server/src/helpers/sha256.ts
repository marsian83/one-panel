export function sha256(b: string): string {
  const c = (a: number, b: number): number => (a >>> b) | (a << (32 - b));
  const f = Math.pow;
  const g = f(2, 32);
  const h = "length";
  let i = "";
  const j: number[] = [];
  const k: number[] = [];
  const l: number[] = (sha256 as any).h || [];
  const m: number[] = (sha256 as any).k || [];
  let n = m[h];
  const o: { [key: number]: number } = {};
  let p = 2;

  for (; 64 > n; p++) {
    if (!o[p]) {
      for (let d = 0; 313 > d; d += p) {
        o[d] = p;
      }
      l[n] = (f(p, 0.5) * g) | 0;
      m[n++] = (f(p, 1 / 3) * g) | 0;
    }
  }

  b += "\x80";

  while ((b[h] % 64) - 56) {
    b += "\x00";
  }

  for (let d = 0; d < b[h]; d++) {
    const e = b.charCodeAt(d);
    if (e >> 8) return "";
    j[d >> 2] |= e << (((3 - d) % 4) * 8);
  }

  j[j[h]] = (k.length / g) | 0;
  j[j[h]] = k.length;

  for (let e = 0; e < j[h]; ) {
    const q = j.slice(e, (e += 16));
    let r = l;
    l.length = 8;

    for (let d = 0; 64 > d; d++) {
      const s = q[d - 15];
      const t = q[d - 2];
      const u = l[0];
      const v = l[4];
      const w =
        l[7] +
        (c(v, 6) ^ c(v, 11) ^ c(v, 25)) +
        ((v & l[5]) ^ (~v & l[6])) +
        m[d] +
        (q[d] =
          16 > d
            ? q[d]
            : (q[d - 16] +
                (c(s, 7) ^ c(s, 18) ^ (s >>> 3)) +
                q[d - 7] +
                (c(t, 17) ^ c(t, 19) ^ (t >>> 10))) |
              0);
      const x =
        (c(u, 2) ^ c(u, 13) ^ c(u, 22)) +
        ((u & l[1]) ^ (u & l[2]) ^ (l[1] & l[2]));
      l.unshift((w + x) | 0);
      l[4] = (l[4] + w) | 0;
    }

    for (let d = 0; 8 > d; d++) {
      l[d] = (l[d] + r[d]) | 0;
    }
  }

  for (let d = 0; 8 > d; d++) {
    for (let e = 3; e + 1; e--) {
      const y = (l[d] >> (8 * e)) & 255;
      i += (16 > y ? 0 : "") + y.toString(16);
    }
  }

  return i;
}
