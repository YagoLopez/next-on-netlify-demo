exports.handler = function(event, context, callback) {
  // console.log(`{\ncontext: ${JSON.stringify(context,null,2)},\nevent: ${JSON.stringify(event,null,2)}\n}`)
  console.log('context', JSON.stringify(context,null,2))
  console.log('event', JSON.stringify(event,null,2))
  callback(null, {
    statusCode: 200,
    body: `Your IP address ${event.headers.host}`
  });
}