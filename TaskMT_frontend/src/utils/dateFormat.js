const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return date.toLocaleDateString("en-US", options)
}

export {
  formatDate
}