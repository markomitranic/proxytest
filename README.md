# Proxytest

This project has a singular goal of measuring the wall time of the requests going to the middleware and back.

- [Proxytest](#proxytest)
  - [Usage](#usage)
  - [Results:](#results)
- [Create T3 App](#create-t3-app)
  - [What's next? How do I make an app with this?](#whats-next-how-do-i-make-an-app-with-this)
  - [Learn More](#learn-more)
  - [How do I deploy this?](#how-do-i-deploy-this)

## Usage

When deployed to vercel, we get a URL like `https://proxytest-8xvy1b4c6-wineandbarrels.vercel.app/` which we can add to our `/etc/hosts` aliased to `76.76.21.21     proxytest.com`.

Install and then run vegeta against the deployment:
```bash
brew update && brew install vegeta

# Run 50reqps for 30 seconds...
echo "GET http://proxytest.com" | vegeta attack -insecure -rate=50 -duration=30s | tee results.bin && \
echo "" && echo "" &&  \
cat results.bin | vegeta report -type=text
```

Take a look at the latencies of the printed result report.

First, raw vercel:
```none
Requests      [total, rate, throughput]         1500, 50.03, 49.97
Duration      [total, attack, wait]             30.016s, 29.979s, 36.798ms
Latencies     [min, mean, 50, 90, 95, 99, max]  32.319ms, 48.92ms, 39.661ms, 51.771ms, 64.88ms, 310.978ms, 710.852ms
Bytes In      [total, mean]                     63000, 42.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:1500  
Error Set:
```

Now, with reverse proxy:
```none
Requests      [total, rate, throughput]         1500, 50.03, 49.96
Duration      [total, attack, wait]             30.025s, 29.98s, 44.895ms
Latencies     [min, mean, 50, 90, 95, 99, max]  40.915ms, 49.942ms, 45.625ms, 52.821ms, 59.633ms, 139.868ms, 444.995ms
Bytes In      [total, mean]                     63000, 42.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:1500  
Error Set:
```

## Results: 

🏁 That makes it:

| #    | Vercel  | Redirection | Difference |
| ---- | ------- | ----------- | ---------- |
| min  | 32.319  | 40.915      | +8.596     |
| mean | 48.92   | 49.942      | +1.022     |
| 50   | 39.661  | 45.625      | +5.964     |
| 90   | 51.771  | 52.821      | +1.050     |
| 95   | 64.88   | 59.633      | -5.247     |
| 99   | 310.978 | 139.868     | -171.110   |
| max  | 710.852 | 444.995     | -265.857   |

We can safely ignore anything above the 95 percentile mark, as uncertainty rises, as we often hit Vercel's DDoS firewall or cold start times for parallel middleware functions.

---

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
