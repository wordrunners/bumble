const sleep = (ms = 300) => new Promise(res => setTimeout(res, ms))

export function request<T>({
  method,
  path,
  data,
  headers,
  isFormData,
}: any): Promise<T> {
  if (isFormData) {
    return sleep().then(() =>
      fetch(`${__API_ENDPOINT__}${path}`, {
        method,
        credentials: 'include',
        body: data,
      })
        .then(response => {
          const isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
          return isJson ? response.json() : { reason: 'invalid content type' }
        })
        .then(data => {
          return data as unknown as T
        })
    )
  } else {
    return sleep().then(() =>
      fetch(`${__API_ENDPOINT__}${path}`, {
        method,
        credentials: 'include',
        headers: headers ? headers : { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : null,
      })
        .then(response => {
          const isJson = response.headers
            .get('content-type')
            ?.includes('application/json')
          return isJson ? response.json() : null
        })
        .then(data => {
          return data as unknown as T
        })
    )
  }
}

request.post = <T>(
  path: string,
  data?: any,
  headers?: any,
  isFormData?: boolean
) => request<T>({ method: 'POST', path, data, headers, isFormData })
request.get = <T>(path: string, headers?: any, isFormData?: boolean) =>
  request<T>({ method: 'GET', path, headers, isFormData })
request.put = <T>(
  path: string,
  data?: any,
  headers?: any,
  isFormData?: boolean
) => request<T>({ method: 'PUT', path, data, headers, isFormData })
