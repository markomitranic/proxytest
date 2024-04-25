// @ts-ignore

const values = [
    {vercel: 32.319  , redir: 40.915},
    {vercel: 48.92  , redir: 49.942},
    {vercel: 39.661  , redir: 45.625},
    {vercel: 51.771   , redir: 52.821},
    {vercel: 64.88  , redir: 59.633},
    {vercel: 310.978 , redir: 139.868},
    {vercel: 710.852 , redir: 444.995},
];


values.map((v) => (v.redir - v.vercel).toFixed(3)).map((v) => console.log(`${v} |`));
