package com.example.hello;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;

import java.util.HashMap;
import java.util.Map;

public class HelloHandler implements RequestHandler<APIGatewayV2HTTPEvent, APIGatewayV2HTTPResponse> {
	@Override
	public APIGatewayV2HTTPResponse handleRequest(APIGatewayV2HTTPEvent event, Context context) {
		LambdaLogger logger = context.getLogger();

		try {
			Map<String, String> claims = null;
			if (event.getRequestContext() != null &&
					event.getRequestContext().getAuthorizer() != null &&
					event.getRequestContext().getAuthorizer().getJwt() != null) {
				claims = event.getRequestContext().getAuthorizer().getJwt().getClaims();
			}

			String sub = claims != null && claims.get("sub") != null ? claims.get("sub").toString() : "unknown";
			String username = claims != null && claims.get("cognito:username") != null
					? claims.get("cognito:username").toString()
					: "unknown";

			String body = String.format("{\"message\":\"Hello from Java Lambda!\",\"sub\":\"%s\",\"username\":\"%s\"}",
					sub, username);

			Map<String, String> headers = new HashMap<>();
			headers.put("Content-Type", "application/json");
			headers.put("Access-Control-Allow-Origin", "*");

			return APIGatewayV2HTTPResponse.builder()
					.withStatusCode(200)
					.withHeaders(headers)
					.withBody(body)
					.build();
		} catch (Exception e) {
			logger.log("Error: " + e.getMessage());
			Map<String, String> headers = new HashMap<>();
			headers.put("Content-Type", "application/json");
			headers.put("Access-Control-Allow-Origin", "*");
			return APIGatewayV2HTTPResponse.builder()
					.withStatusCode(500)
					.withHeaders(headers)
					.withBody("{\"message\":\"Internal server error\"}")
					.build();
		}
	}
}
