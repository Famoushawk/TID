const apiConfig = {
  appId: "BLJvJPeABAqvYm1193o5WAfaCEpfzvjAuDTLqe2P",
  apiKey: "OJ2uQ7qSFn4eMg3y23jPPOq0wBnD49DEiITknteS",
  apiUrl: "https://parseapi.back4app.com",
};

const headers = {
  "X-Parse-Application-Id": apiConfig.appId,
  "X-Parse-REST-API-Key": apiConfig.apiKey,
  "Content-Type": "application/json",
};

const fetchData = async (endpoint, method = "GET", body = null) => {
  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiConfig.apiUrl}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};

const apiClient = {
  get: (endpoint) => fetchData(endpoint, "GET"),
  post: (endpoint, body) => fetchData(endpoint, "POST", body),
  put: (endpoint, body) => fetchData(endpoint, "PUT", body),
  delete: (endpoint) => fetchData(endpoint, "DELETE"),
};

export default apiClient;
