const assert = require("node:assert/strict");
const test = require("node:test");

process.env.NODE_ENV = "production";
process.env.DEMO_MODE = "true";

const app = require("./server");

const withServer = async (run) => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;

  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
};

test("downloads endpoint returns five official website links", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/nexusplay/downloads/101`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.deepEqual(
      body.downloads.map((download) => download.website.name),
      ["Steam", "Epic Games", "GOG", "Microsoft", "Xbox"]
    );
  });
});

test("trailers endpoint returns a playable trailer", async () => {
  await withServer(async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/nexusplay/trailers/101`);
    assert.equal(response.status, 200);

    const body = await response.json();
    assert.equal(body.results.length, 1);
    assert.match(body.results[0].data.max, /^https?:\/\//);
  });
});

test("unknown slug gets fallback downloads and trailer", async () => {
  await withServer(async (baseUrl) => {
    const [downloadsResponse, trailerResponse] = await Promise.all([
      fetch(`${baseUrl}/api/nexusplay/downloads/left-4-dead-2`),
      fetch(`${baseUrl}/api/nexusplay/trailers/left-4-dead-2`),
    ]);

    assert.equal(downloadsResponse.status, 200);
    assert.equal(trailerResponse.status, 200);

    const downloads = await downloadsResponse.json();
    const trailer = await trailerResponse.json();

    assert.equal(downloads.downloads.length, 5);
    assert.equal(trailer.results.length, 1);
    assert.match(trailer.results[0].data.max, /^https?:\/\//);
  });
});
