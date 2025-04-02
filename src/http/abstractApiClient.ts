import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios';

export class AbstractApiClient<ModelAttributes> {
  private instance: AxiosInstance;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.instance = axios.create({
      baseURL,
      headers,
    });
  }

  private async request(
    method: Method,
    url: string,
    data?: Partial<ModelAttributes>,
    config?: AxiosRequestConfig
  ) {
    try {
      const response: AxiosResponse<ModelAttributes> =
        await this.instance.request({
          method,
          url,
          data,
          ...config,
        });
      return response.data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw e.response?.data;
      }
      throw new Error((e as Error).message);
    }
  }

  protected get(url: string, config?: AxiosRequestConfig) {
    return this.request('GET', url, undefined, config);
  }

  protected post(
    url: string,
    data?: ModelAttributes,
    config?: AxiosRequestConfig
  ) {
    return this.request('POST', url, data, config);
  }

  protected patch(
    url: string,
    data?: Partial<ModelAttributes>,
    config?: AxiosRequestConfig
  ) {
    return this.request('PATCH', url, data, config);
  }

  protected delete(url: string, config?: AxiosRequestConfig) {
    return this.request('DELETE', url, undefined, config);
  }
}
