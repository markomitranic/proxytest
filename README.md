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

# Warm up the server...
curl http://proxytest.com
# Run 10reqps for 60 seconds...
echo "GET http://proxytest.com" | vegeta attack -insecure -rate=10 -duration=60s | tee results.bin && \
echo "" && echo "" &&  \
cat results.bin | vegeta report -type=text
```

Take a look at the latencies of the printed result report.

First, raw vercel:
```none
Requests      [total, rate, throughput]         600, 10.02, 10.01
Duration      [total, attack, wait]             59.934s, 59.9s, 34.339ms
Latencies     [min, mean, 50, 90, 95, 99, max]  31.935ms, 46.285ms, 37.243ms, 46.505ms, 60.307ms, 327.528ms, 786.985ms
Bytes In      [total, mean]                     25200, 42.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:600  
Error Set:
```

Now, with reverse proxy:
```none
Requests      [total, rate, throughput]         600, 10.02, 10.00
Duration      [total, attack, wait]             59.971s, 59.9s, 70.521ms
Latencies     [min, mean, 50, 90, 95, 99, max]  58.731ms, 71.77ms, 66.885ms, 77.817ms, 84.8ms, 143.091ms, 727.626ms
Bytes In      [total, mean]                     25200, 42.00
Bytes Out     [total, mean]                     0, 0.00
Success       [ratio]                           100.00%
Status Codes  [code:count]                      200:600  
Error Set:
```

## Results: 

🏁 When ran against Vercel's edge or middleware, which runs on Cloudflare's edge network:

| #    | Vercel  | Redirection | Difference    |
| ---- | ------- | ----------- | ------------- |
| min  | 32.319  | 43.57       | 🔺 +8.596 ms   |
| mean | 48.92   | 56.373      | 🔺 +1.022 ms   |
| 50   | 39.661  | 48.506      | 🔺 +5.964 ms   |
| 90   | 51.771  | 57.556      | 🔺 +1.050 ms   |
| 95   | 64.88   | 70.424      | 🩲 -5.247 ms   |
| 99   | 310.978 | 342.633     | 🩲 -171.110 ms |
| max  | 710.852 | 578.766     | 🩲 -265.857 ms |

🏁 When ran against Vercel's nodejs runtime which runs on Frankfurt 1:

| #    | Vercel  | Redirect | Diff        |
| ---- | ------- | -------- | ----------- |
| min  | 31.935  | 58.731   | 🔺 +26.80 ms |
| mean | 46.285  | 71.77    | 🔺 +25.48 ms |
| 50   | 37.243  | 66.885   | 🔺 +29.64 ms |
| 90   | 46.505  | 77.817   | 🔺 +31.31 ms |
| 95   | 60.307  | 84.8     | 🔺 +24.49 ms |
| 99   | 327.528 | 143.091  | 🩲-184.44 ms |
| max  | 786.985 | 727.626  | 🩲-59.36 ms  |

**⚠️ We can safely ignore anything above the 95 percentile mark, as unreliability rises, as we often hit Vercel's unpredictable DDoS firewall or cold start times for parallel middleware functions.**

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
