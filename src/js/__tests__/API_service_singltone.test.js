import service from '../services/API_service_singltone';

const respondUsers = [{"id":"a6a136dc-fd2b-4073-a1ae-214589cc73e6","data":"{\"isAdmin\":false,\"name\":\"Maria\",\"password\":\"\"}"}];
// const requestURL = "http://158.101.166.74:8080/api/data/pavlo_pechenevskyi/users";


describe(`Service: test `, () => {
    const entity = 'users';
    beforeEach(() => {
      fetch.resetMocks();
    });
    test(`Service: 'GET'. Should return`, async () => {
      fetch.mockResponseOnce(respondUsers);
      const res = await service.get(entity);
      console.log(res);
      expect(res).toEqual(respondUsers);
    });
});