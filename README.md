# Proxytest

This project has a singular goal of measuring the wall time of the requests going to the middleware and back.

## Usage

When deployed to vercel, we get a URL like `https://proxytest-8xvy1b4c6-wineandbarrels.vercel.app/` which we can add to our `/etc/hosts` aliased to `76.76.21.21     proxytest.com`.

Install and then run vegeta against the deployment:
```bash
brew update && brew install vegeta

# Run 50reqps for 10 seconds...
echo "GET https://proxytest.com" | vegeta attack -rate=50 -duration=10s | tee results.bin && \
echo "" && echo "" &&  \
cat results.bin | vegeta report -type=text
```

Take a look at the latencies of the printed result report.
```none
Requests      [total, rate, throughput]         1500, 50.03, 0.00
Duration      [total, attack, wait]             30.023s, 29.98s, 43.595ms
Latencies     [min, mean, 50, 90, 95, 99, max]  33.959ms, 47.716ms, 42.148ms, 52.888ms, 61.597ms, 168.143ms, 1.048s
Bytes In      [total, mean]                     0, 0.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           0.00%
Status Codes  [code:count]                      0:1500  
Error Set:
```

Original readme below:

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
