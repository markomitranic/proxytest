// @ts-ignore

const vercel = "31.935ms, 46.285ms, 37.243ms, 46.505ms, 60.307ms, 327.528ms, 786.985ms";
const redirectionio = "58.731ms, 71.77ms, 66.885ms, 77.817ms, 84.8ms, 143.091ms, 727.626ms";

const vercelArr = vercel.split(',').map((item) => parseFloat(item));
const redirectionioArr = redirectionio.split(',').map((item) => parseFloat(item));

const diffArr = vercelArr.map((item, index) => {
    return ((redirectionioArr[index] - item)).toFixed(2);
    }
);

const sign = (item) => item > 0 ? "🔺 +" : "🩲";

console.log(`| # | Vercel | Redirect | Diff |`);
console.log(`| --- | --- | --- | --- |`);
console.log(`| min | ${vercelArr[0]} | ${redirectionioArr[0]} | ${sign(diffArr[0])}${diffArr[0]}ms |`);
console.log(`| mean | ${vercelArr[1]} | ${redirectionioArr[1]} | ${sign(diffArr[1])}${diffArr[1]}ms |`);
console.log(`| 50 | ${vercelArr[2]} | ${redirectionioArr[2]} | ${sign(diffArr[2])}${diffArr[2]}ms |`);
console.log(`| 90 | ${vercelArr[3]} | ${redirectionioArr[3]} | ${sign(diffArr[3])}${diffArr[3]}ms |`);
console.log(`| 95 | ${vercelArr[4]} | ${redirectionioArr[4]} | ${sign(diffArr[4])}${diffArr[4]}ms |`);
console.log(`| 99 | ${vercelArr[5]} | ${redirectionioArr[5]} | ${sign(diffArr[5])}${diffArr[5]}ms |`);
console.log(`| max | ${vercelArr[6]} | ${redirectionioArr[6]} | ${sign(diffArr[6])}${diffArr[6]}ms |`);


