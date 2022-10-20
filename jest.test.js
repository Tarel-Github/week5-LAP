test('1+1은 2, 테스트용 코드', () =>{
    expect(1+1).toEqual(2)
})


const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

describe('isLoggedIn', () => {
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();
  
    test('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => true),
      };
      isLoggedIn(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  
    test('로그인 되어있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => false),
      };
      isLoggedIn(req, res, next);
      expect(res.status).toBeCalledWith(403);
      expect(res.send).toBeCalledWith('로그인 필요');
    });
  });
