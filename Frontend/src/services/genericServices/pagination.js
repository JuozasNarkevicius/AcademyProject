const getElementsByPage = (elements, pageNumber, pageSize) => {
  if (pageNumber === 1) {
    return elements.slice(0, pageSize);
  }
  return elements.slice(pageNumber * pageSize - pageSize, pageNumber * pageSize);
};

const getPageCount = (elements, pageSize) => {
  if (elements.length <= pageSize) {
    return 1;
  }
  return Math.ceil(elements.length / pageSize);
};

const paginationService = {
  getElementsByPage,
  getPageCount,
};

export default paginationService;
