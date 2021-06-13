export function scrollAction(data) {
  return {
    type: "scroll",
    payload: {
      data: data.photos.photo,
    },
  };
}

export function newQueryAction(query, data) {
  return {
    type: "new_query",
    payload: {
      topic: query,
      data: data.photos.photo,
    },
  };
}
