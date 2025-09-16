// Fill these with outputs from the SAM deploy
// region: AWS region where you deployed the stack (e.g., "us-east-1")
// userPoolId: Cognito User Pool ID (e.g., "us-east-1_abc123")
// userPoolWebClientId: Cognito App Client ID (no secret)
// backend.endpoint: HttpApiEndpoint output from the stack (e.g., "https://abc123.execute-api.us-east-1.amazonaws.com")

const amplifyConfig = {
  Auth: {
    region: 'YOUR_AWS_REGION',
    userPoolId: 'YOUR_USER_POOL_ID',
    userPoolWebClientId: 'YOUR_USER_POOL_CLIENT_ID'
  },
  // Not used by Amplify APIs directly in this starter; referenced manually in fetch()
  backend: {
    endpoint: 'YOUR_HTTP_API_ENDPOINT'
  }
};

export default amplifyConfig;

