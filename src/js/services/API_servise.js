const URL = 'http://158.101.166.74:8080/api/data/';
const SYSTEM = 'pavlo_pechenevskyi';

export const createNewEntity = async (entity, entityBody) => {
  const url = `${URL}${SYSTEM}/${entity}`;
  const data = `{"data":"${JSON.stringify(entityBody).replaceAll('"', '\\"')}"}`;
  const result = {};

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    result.id = json.id;
    result.data = JSON.parse(json.data.replaceAll('\\"', '"'));
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

export const changeEntity = async (entity, id, entityBody) => {
  const url = `${URL}${SYSTEM}/${entity}/${id}`;
  const data = `{"data":"${JSON.stringify(entityBody).replaceAll('"', '\\"')}"}`;
  const result = {};

  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    result.id = json.id;
    result.data = JSON.parse(json.data.replaceAll('\\"', '"'));
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

export const getEntities = async (entity) => {
  const url = `${URL}${SYSTEM}/${entity}`;
  let result;

  try {
    const response = await fetch(url, {
      method: 'get',
    });
    const json = await response.json();
    result = json?.map((elem) => ({ id: elem.id, data: JSON.parse(elem.data.replaceAll('\\"', '"')) })) || null;
  } catch (error) {
    console.error('Error:', error);
  }
  return result;
};

export const deleteEntity = async (entity, id) => {
  const url = `${URL}${SYSTEM}/${entity}/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    console.log('Success:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};
