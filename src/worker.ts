export interface Env {
  MONGODB_URI: string;
}

const worker = {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    await fetchUpdateData();
    return new Response(`Hello World from ${request.method}!`);
  },
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: EventContext<Env, any, any>
  ) {
    fetchUpdateData();
    ctx.waitUntil(fetchUpdateData());
  },
};

async function fetchUpdateData() {
  let response = await fetch(
    `https://phatty-prices.vercel.app/api/prices?timestamp=1707338225`
  ).then(data=>data.json()).then(data=>console.log(data));
  console.log("response: ", response);
}

export default worker;
