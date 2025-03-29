const insertLogRecord = async (logRecord) =>
  await Deno.writeTextFile("./logRequest.txt", logRecord, { append: true });

const logRequest = (request) => {
  const date = new Date();
  const timeString = date.toTimeString().split(" ").at(0);
  const dateString = date.toDateString();
  const userAgent = request.headers.get("user-agent");

  const logRecord = [
    dateString,
    timeString,
    request.method,
    request.url,
    userAgent,
  ]
    .join(" ")
    .concat("\n");

  insertLogRecord(logRecord);
  console.log(logRecord);
};

const handler = (request) => {
  logRequest(request);

  return new Response("ok");
};

export { handler };
