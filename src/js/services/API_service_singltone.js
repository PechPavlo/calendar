class ServiceAPISingltone {
  constructor() {
    if (ServiceAPISingltone.instance instanceof ServiceAPISingltone) {
      return ServiceAPISingltone.instance;
    }

    this.settingsObject = {
      URL: 'http://158.101.166.74:8080/api/data/',
      SYSTEM: 'pavlo_pechenevskyi',
    };
    Object.freeze(this.settingsObject);
    Object.freeze(this);
    ServiceAPISingltone.instance = this;
  }

    get = async (entity) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}`;
      let result;

      try {
        const response = await fetch(url, {
          method: 'get',
        });
        const json = await response.json();
        result = json?.map((elem) => ({ id: elem.id, data: JSON.parse(elem.data.replaceAll('\\"', '"')) })) || null;
      } catch (error) {
        return { error };
      }
      return result;
    };

    create = async (entity, entityBody) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}`;
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
      } catch (error) {
        return { error };
      }
      return result;
    };

    change = async (entity, id, entityBody) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}/${id}`;
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
      } catch (error) {
        return { error };
      }
      return result;
    };

    delete = async (entity, id) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}/${id}`;

      try {
        const { status } = await fetch(url, {
          method: 'DELETE',
        });
        return status;
      } catch (error) {
        return { error };
      }
    };
}

const ServiceAPI = new ServiceAPISingltone();

export default ServiceAPI;
