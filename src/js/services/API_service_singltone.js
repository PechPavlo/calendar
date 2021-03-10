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
        result = await response.json();
      } catch (error) {
        return { error };
      }
      return result;
    };

    create = async (entity, entityBody) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}`;
      let result;

      try {
        const response = await fetch(url, {
          method: 'POST',
          body: entityBody,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        result = await response.json();
      } catch (error) {
        return { error };
      }
      return result;
    };

    change = async (entity, id, entityBody) => {
      const url = `${this.settingsObject.URL}${this.settingsObject.SYSTEM}/${entity}/${id}`;
      let result;

      try {
        const response = await fetch(url, {
          method: 'PUT',
          body: entityBody,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        result = await response.json();
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
