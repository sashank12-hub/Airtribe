const {verifyToken,isTokenValid} = require("./verifyToken");
const jwt =require('jsonwebtoken');

describe("test the token", () => {
  let res, next, req;
  beforeEach(() => {
    next = jest.fn();
    res = {};
    req = {
      body: {},
    };
    // jest.mock(jwt);
  });
  test("should test for missing header", async () => {
    verifyToken(req, res, next);
    expect(req.body.email).toEqual(undefined);
    expect(req.body.message).toEqual("pls sign in");
    expect(next).toBeCalledTimes(1);
  });
  test("should123 test for missing header", async () => {
    req={...req,
        headers:{
            authorization: 'JWT token'
        }
    }
    // jwt.verify('token',process.env.SECRET).mockImplementation((err,data)=>)
    // jest.spyOn(jwt, 'verify').mockImplementation(
    //     jest.fn((req.headers.authorization.split(' ')[1], process.env.SECRET, callback)  => callback(null, {email: 'cool@dude.com',exp:100}))
    // ); 

    jest.mock('jsonwebtoken', () => ({
        ...jest.requireActual('jsonwebtoken'),
        verify: jest.fn((token, secretOrPublicKey, options, callback) => {
          return callback(null, {email: 'cool@dude.com',exp:100});
        })
      }));
    verifyToken(req, res, next);
   expect(isTokenValid).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(1);
   
  });
});