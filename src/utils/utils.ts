const utils = {
  formatDate(date: Date) {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newdate = year + "/" + month + "/" + day;
    return newdate;
  },
};

export default utils;
