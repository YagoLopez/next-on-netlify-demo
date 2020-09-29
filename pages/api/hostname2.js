import absoluteUrl from 'next-absolute-url'

export default (req, res) => {
  const { protocol, host, origin } = absoluteUrl(req)
  const apiURL = `${protocol}//${host}/.netlify/functions/graphql`
  res.status(200);
  // console.log("RESPONSE", protocol, host)
  res.json({protocol, host, apiURL, origin});
};
