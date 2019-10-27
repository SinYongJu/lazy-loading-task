import { API_KEY, API_URL } from "../constants/api";

export const getContentApi = async target => {
  try {
    const data = await fetch("/data.json").then(res => res.json());
    const result = data[target].data;
    const length = result.length;
    const photos = await getPixaApi(length);
    result.map((item, index) => {
      const src = photos[index].largeImageURL;
      const prev = photos[index].previewURL;
      const width = photos[index].webformatWidth;
      const height = photos[index].webformatHeight;
      return Object.assign(item, { src, prev, width, height });
    });
    return result;
  } catch (e) {
    console.log(e);
  }
};
export const getPixaApi = async length => {
  const pageLength = `&per_page=${length}`;
  try {
    const data = await fetch(`${API_URL}${pageLength}`).then(res => res.json());
    console.log(data);
    return data.hits;
  } catch (e) {
    console.log(e);
  }
};
