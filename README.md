# Java SAM + React Native (Cognito Auth)

This repository is a starter template that provisions an AWS Cognito User Pool and a protected HTTP API using AWS SAM (with a Java 17 Lambda), plus a React Native (Expo) mobile app pre-wired to authenticate users with Cognito (sign up, sign in, sign out) using Amplify.

## Structure

- `backend/` — SAM application in Java 17
  - Provisions Cognito User Pool + App Client
  - Exposes a protected `GET /hello` endpoint (JWT authorizer)
  - Simple Lambda returns user info from the JWT
- `mobile/` — React Native app (Expo) using Amplify Auth + Amplify UI RN
  - Provides full sign-in/sign-up UI
  - Calls the protected backend route using the user’s ID token

---

## Prerequisites

- AWS account with permissions to deploy SAM stacks
- Java 17 + Maven
- AWS SAM CLI
- Node.js 18+
- (Mobile) `npm` or `yarn`, and Expo CLI (`npx expo` works without global install)

---

## Backend: Build & Deploy

1) Build

- From `backend/hello`, build the Lambda layer:

```
cd backend/hello
mvn -q -DskipTests package
```

2) Deploy via SAM

- From `backend/`, run:

```
cd backend
sam build
sam deploy --guided
```

During guided deploy, accept defaults or provide:
- Stack name: `java-sam-rn-cognito`
- Region: your preferred region

Outputs will include:
- `UserPoolId`
- `UserPoolClientId`
- `HttpApiEndpoint`

Record these for the mobile app.

---

## Mobile: Configure & Run (Expo)

1) Configure Amplify

- Copy the outputs from the backend deploy into `mobile/src/amplifyConfig.ts`:
  - `region`
  - `userPoolId`
  - `userPoolWebClientId`
  - `endpoint` (backend `HttpApiEndpoint`)

2) Install dependencies and start

```
cd mobile
npm install
npx expo start
```

- Use the QR code to run on a device (Expo Go) or press `i`/`a` for iOS/Android emulator.

3) Try it out

- Use “Create Account” to register and confirm via email/SMS (depending on your pool settings)
- Sign in; the app will show a button to call the secured `/hello` endpoint and display the response

---

## Notes / Next Steps

- To enable social sign-in or Hosted UI, add a `UserPoolDomain` and OAuth settings to the SAM template, then update the mobile configuration accordingly.
- For production, review password policies, MFA, app client settings, and token lifetimes.
- Add CI/CD and environment-based configs if needed.

