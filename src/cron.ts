import { createClient } from "urql";
import PricesService from "./services/prices";
import connectDB from "./db";

const blockGraphQL =
  "https://graph.pulsechain.com/subgraphs/name/pulsechain/blocks";
const pulsexGraphQL =
  "https://graph.pulsechain.com/subgraphs/name/pulsechain/pulsex";
const pulsexV2Subgraph =
  "https://graph.pulsechain.com/subgraphs/name/pulsechain/pulsexv2";
const phuxSubgraph = "https://sub4.phatty.io/subgraphs/name/phux/pools-v3";

const blockClient = createClient({ url: blockGraphQL });
const pulsexClient = createClient({ url: pulsexGraphQL });
const pulsexV2Client = createClient({ url: pulsexV2Subgraph });
const phuxClient = createClient({ url: phuxSubgraph });

const pricesService = new PricesService();

// Addresses should be lowercase
const tokensForPulsex = [
  "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39", // pHEX
  "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // pWBTC
  "0x3819f64f282bf135d62168c1e513280daf905e06", // pHDRN
  "0xfc4913214444af5c715cc9f7b52655e788a569ed", // pICSA
  "0x0d86eb9f43c57f6ff3bc9e23d8f9d82503f0e84b", // pMAXI
  "0x2fa878ab3f87cc1c9737fc071108f904c0b0c95d", // INC
  "0x95b303987a60c71504d99aa1b13b4da07b0790ab", // PLSX
  "0xa1077a294dde1b09bb078844df40758a5d0f9a27", // WPLS
  "0x96e035ae0905efac8f733f133462f971cfa45db1", // PHIAT
  "0x02dcdd04e3f455d838cd1249292c58f3b79e3c3c", // wWETH
  "0xefd766ccb38eaf1dfd701853bfce31359239f305", // wDAI
  "0x0cb6f5a34ad42ec934882a05265a7d5f59b51a2f", // wUSDT
  "0x15d38573d2feeb82e7ad5187ab8c1d52810b1f07", // wUSDC
  "0x57fde0a71132198bbec939b98976993d8d89d225", // wHEX
  "0x34f0915a5f15a66eba86f6a58be1a471fb7836a7", // pPLSD
  "0x347a96a5bd06d2e15199b032f46fb724d6c73047", // pASIC
  "0x5ee84583f67d5ecea5420dbb42b462896e7f8d06", // pPLSB
  "0x6b0956258ff7bd7645aa35369b55b61b8e6d6140", // pLUCKY
  "0xf55cd1e399e1cc3d95303048897a680be3313308", // pTRIO
  "0xe9f84d418b008888a992ff8c6d22389c2c3504e0", // pBASE
  "0x6b32022693210cd2cfc466b9ac0085de8fc34ea6", // pDECI
  "0xb17d901469b9208b17d916112988a3fed19b5ca1", // wWBTC
  "0xfd3a511cb1c435d6a6e471392902bf4a83773d9c", // DINO
  "0xfe39fdc0012dcf10c9f674ea7e74889e4d71a226", // wePHIAT
  "0xabf663531fa10ab8116cbf7d5c6229b018a26ff9", // weHDRN
  "0xeda0073b4aa1b1b6f9c718c3036551ab46e5ec32", // BEET
  "0xca35638a3fddd02fec597d8c1681198c06b23f58", // TIME
  "0xbbcf895bfcb57d0f457d050bb806d1499436c0ce", // IM
  "0x9663c2d75ffd5f4017310405fce61720af45b829", // PHUX
  "0xd22e78c22d7e77229d60cc9fc57b0e294f54488e", // HOC
  "0xd7a41be7637813f71aaf23d5ffa5459c4972794d", // TMFINR
  "0x43eaba2e2d2f32f1207a11a18679287dc7700015", // RBC
  "0x600136da8cc6d1ea07449514604dc4ab7098db82", // CST
  "0x2a06a971fe6ffa002fd242d437e3db2b5cc5b433", // PTS
  "0xf8bba8b1b1a05992b18051e4e79415364cbf4539", // PHLP
  "0x8854bc985fb5725f872c8856bea11b917caeb2fe", // PHAME
  "0x6386704cd6f7a584ea9d23ccca66af7eba5a727e", // SPARK
  "0x545998abcbf0633c83ba20cb94f384925be75dd5", // Prime PHUX
];

const tokensForPulsexV2 = [
  "0xc91562626b9a697af683555da9946986278ac9a5", // TYRH
  "0xaec4c07537b03e3e62fc066ec62401aed5fdd361", // TETRAp
  "0x0567ca0de35606e9c260cc2358404b11de21db44", // HELGO
  "0x7901a3569679aec3501dbec59399f327854a70fe", // HOA
  "0xf84b84daace6ac00dbbaed26ca32ff3570aaf66c", // OG
  "0x3981920a82d95a117a8747ecf9a11e105ca38b62", // GDAY
  "0x52ada28f70bc8ebe5dd4381120d3cd76863919a8", // PLD
  "0x207e6b4529840a4fd518f73c68bc9c19b2a15944", // MINT
  "0xb5c4ecef450fd36d0eba1420f6a19dbfbee5292e", // pSSH
  "0xf876bdf9d6403aa7d5bf7f523e8f440a841cc596", // RFX
  "0xf330cb1d41052dbc74d3325376cb82e99454e501", // FIRE
  "0x8b4cfb020af9acad95ad80020ce8f67fbb2c700e", // BBC
  "0x3ca80d83277e721171284667829c686527b8b3c5", // 9INCH
  "0x3823369b02f6885183536d6e426a05fa6a879af2", // SWEET
  "0x9159f1d2a9f51998fc9ab03fbd8f265ab14a1b3b", // LOAN
  "0x0deed1486bc52aa0d3e6f8849cec5add6598a162", // USDL
  "0xdfdc2836fd2e63bba9f0ee07901ad465bff4de71", // WATT
  "0x664e58570e5835b99d281f12dd14d350315d7e2a", // uPX
];

const tokensForPhux = [
  "0x9663c2d75ffd5f4017310405fce61720af45b829", // PHUX
  "0xf8bba8b1b1a05992b18051e4e79415364cbf4539", // PHLP
  "0x8854bc985fb5725f872c8856bea11b917caeb2fe", // PHAME
  "0x2a06a971fe6ffa002fd242d437e3db2b5cc5b433", // PTS
  "0x96e035ae0905efac8f733f133462f971cfa45db1", // PHIAT
  "0xfe39fdc0012dcf10c9f674ea7e74889e4d71a226", // wePHIAT
  "0x3819f64f282bf135d62168c1e513280daf905e06", // pHDRN
  "0xf55cd1e399e1cc3d95303048897a680be3313308", // pTRIO
  "0xe9f84d418b008888a992ff8c6d22389c2c3504e0", // pBASE
  "0x43eaba2e2d2f32f1207a11a18679287dc7700015", // RBC
  "0x600136da8cc6d1ea07449514604dc4ab7098db82", // CST
  "0xca35638a3fddd02fec597d8c1681198c06b23f58", // TIME
  "0x545998abcbf0633c83ba20cb94f384925be75dd5", // Prime PHUX
];

function sleep(time: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

type BlockItem = {
  number: number;
  timestamp: number;
};

async function getLimitTimestamps(minutes: number = 60) {
  let seconds = minutes * 60;
  const nowData = await blockClient
    .query(
      `query {
          blocks(
            first: 1, 
            orderBy: timestamp, 
            orderDirection: desc
          ) {
            number
            timestamp
          }
        }`,
      {}
    )
    .toPromise();
  const now = nowData.data.blocks[0].timestamp;

  // `- 50` for 5 more block data
  const timestampLimit = {
    oneHour: [now - 3600 - 50, now - 3600 + seconds],
    oenDay: [now - 24 * 3600 - 50, now - 24 * 3600 + seconds],
    oneWeek: [now - 7 * 24 * 3600 - 50, now - 7 * 24 * 3600 + seconds],
    oneMonth: [now - 30 * 24 * 3600 - 50, now - 30 * 24 * 3600 + seconds],
    twoMonth: [
      now - 30 * 24 * 3600 * 2 - 50,
      now - 30 * 24 * 3600 * 2 + seconds,
    ],
  };

  let res = [] as BlockItem[];
  for (const [key, value] of Object.entries(timestampLimit)) {
    const [startTime, endTime] = value;
    const {
      data: { blocks },
    } = await blockClient
      .query(
        `query blocks(
            $startTime: BigInt!
            $endTime: BigInt!
          ) {
            blocks(
              first: 500,
              orderBy: timestamp, 
              orderDirection: asc, 
              where: { timestamp_gte: $startTime, timestamp_lte: $endTime }
            ) {
              number,
              timestamp
            }
          }`,
        {
          startTime,
          endTime,
        }
      )
      .toPromise();
    console.log(key);
    console.log(blocks[0]);
    console.log(blocks[blocks.length - 1]);
    res = res.concat(
      blocks.map((block: BlockItem) => {
        return {
          number: Number(block.number),
          timestamp: Number(block.timestamp),
        };
      })
    );
  }
  return res;
}

async function updatePrices(blocks: BlockItem[]) {
  let count = 0;
  const step = 50;
  let requestList = [];
  for (let pos = 0; pos < blocks.length; pos++) {
    const block = blocks[pos];
    const { number, timestamp } = block;
    requestList.push(
      (async () => {
        const price = await pricesService.findPriceByNumber(number);
        if (!price) {
          const prices = await getPriceByBlock(number);
          count++;
          const data = {
            number,
            timestamp,
            prices,
          };
          const tempPrice = await pricesService.findPriceByNumber(number);
          if (!tempPrice) {
            await pricesService.addPrice(data);
          }
        }
      })()
    );
    if (requestList.length >= step) {
      await Promise.all(requestList);
      requestList = [];
      console.log(`Has updated ${count} data...`);
    }
  }
  await Promise.all(requestList);
  requestList = [];
  console.log(`Total update ${count} data`);
}

let isUpdating = false;

export async function updatePricesJob() {
  if (isUpdating) {
    return;
  }
  isUpdating = true;
  await connectDB();
  const blocks = await getLimitTimestamps();
  console.log(`Start delete old data...`);
  let start = Date.now();
  await pricesService.deletePrice(blocks.map((block) => block.timestamp));
  console.log(`Delete old data cost ${(Date.now() - start) / 1000}s.`);
  start = Date.now();
  console.log(`Start update data ...`);
  await updatePrices(blocks);
  console.log(`Update data cost ${(Date.now() - start) / 1000}s.`);
  isUpdating = false;
}

async function queryTokenDataFromPulsex({
  ids,
  block,
}: {
  ids: string[];
  block: number;
}) {
  const {
    data: { tokens = [] },
  } = await pulsexClient
    .query(
      `query tokens(
          $ids: [ID!]!,
          $block: Int,
        ) {
          tokens(
            where: {id_in: $ids}
            block: {number: $block}
          ) {
            id
            derivedPLS
            derivedUSD
          },
        }`,
      {
        ids,
        block,
      }
    )
    .toPromise();

  const res = [];
  for (let i = 0; i < tokens.length; i++) {
    if (!tokens[i]) {
      continue;
    }
    const { __typename, ...others } = tokens[i];
    res.push({
      ...others,
    });
  }
  return res;
}

async function queryTokenDataFromPulsexV2({
  ids,
  block,
}: {
  ids: string[];
  block: number;
}) {
  const {
    data: { tokens = [] },
  } = await pulsexV2Client
    .query(
      `query tokens(
          $ids: [ID!]!,
          $block: Int,
        ) {
          tokens(
            where: {id_in: $ids}
            block: {number: $block}
          ) {
            id
            derivedPLS
            derivedUSD
          },
        }`,
      {
        ids,
        block,
      }
    )
    .toPromise();

  const res = [];
  for (let i = 0; i < tokens.length; i++) {
    if (!tokens[i]) {
      continue;
    }
    const { __typename, ...others } = tokens[i];
    res.push({
      ...others,
    });
  }
  return res;
}

async function queryTokenDataFromPhux({
  ids,
  block,
}: {
  ids: string[];
  block: number;
}) {
  const {
    data: { tokens = [] },
  } = await phuxClient
    .query(
      `query tokens(
          $ids: [ID!]!,
          $block: Int,
        ) {
          tokens(
            where: {id_in: $ids}
            block: {number: $block}
          ) {
            id
            latestUSDPrice
            totalVolumeUSD
          },
        }`,
      {
        ids,
        block,
      }
    )
    .toPromise();

  const res = [];
  for (let i = 0; i < tokens.length; i++) {
    if (!tokens[i]) {
      continue;
    }
    const { __typename, ...others } = tokens[i];
    res.push({
      ...others,
    });
  }
  return res;
}

async function queryTokenDataFromAttempts<Fn extends (...as: any) => any>(
  fn: Fn,
  args: Parameters<Fn>,
  errTip: string,
  maxAttempts = 5
) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      const res = await fn.apply(null, args);
      return res;
    } catch (error) {
      console.log(`${errTip} Attempt ${attempts + 1} failed:`, error);
      attempts++;
      await sleep(10000);
    }
  }
  throw new Error(
    `Max ${errTip} reached, unable to fetch data, args: ${JSON.stringify(args)}`
  );
}

async function getPriceByBlock(block: number): Promise<any> {
  return await Promise.all([
    queryTokenDataFromAttempts(
      queryTokenDataFromPulsex,
      [
        {
          ids: tokensForPulsex,
          block,
        },
      ],
      "queryTokenDataFromPulsex"
    ),
    queryTokenDataFromAttempts(
      queryTokenDataFromPulsexV2,
      [
        {
          ids: tokensForPulsexV2,
          block,
        },
      ],
      "queryTokenDataFromPulsexV2"
    ),
    queryTokenDataFromAttempts(
      queryTokenDataFromPhux,
      [
        {
          ids: tokensForPhux,
          block,
        },
      ],
      "queryTokenDataFromPhux"
    ),
  ]).then(([pulsex, pulsexV2, phux]) => {
    return {
      pulsex,
      pulsexV2,
      phux,
    };
  });
}
