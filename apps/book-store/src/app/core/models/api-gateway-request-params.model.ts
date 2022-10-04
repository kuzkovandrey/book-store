export interface ApiGatewayRequestParams {
  url: string;
  body?: object;
  params: { [param: string]: string | boolean | number };
}
