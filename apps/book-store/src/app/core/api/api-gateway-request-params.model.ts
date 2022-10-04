export interface ApiGatewayRequestParams {
  url: string;
  body?: object;
  params?: {
    [param: string]:
      | string
      | number
      | boolean
      | ReadonlyArray<string | number | boolean>;
  };
}
