const SendFormData = (object) => {
  let dt = new FormData();

  for (let key in object) {
    if (Array.isArray(object[key])) {
      dt.append(`${key}`, JSON.stringify(object[key]));
    } else if (object[key]?.type){
      dt.append(`${key}`, object[key], object[key].name);
    } 
    else {
      dt.append(key, object[key]);
    }
  }

  return dt;
};

export default SendFormData;
