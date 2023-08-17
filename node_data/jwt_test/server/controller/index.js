const userDatabase = require("../Database");
const jwt = require("jsonwebtoken");

// 구현 모듈 5개 입력
const login = (req, res, next) => {
  const { email, password } = req.body;

  const userInfo = userDatabase.filter((item) => {
    return item.email == email;
  })[0];

  console.log(userInfo);

  if (!userInfo) {
    res.status(403).json("Not Authorities");
  } else {
    try {
      //add token
      const accessToken = jwt.sign(
        {
          id: userInfo.id,
          userInfo: userInfo.username,
          email: userInfo.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: "1m",
          issuer: "About Tech",
        }
      );

      const refreshToken = jwt.sign(
        {
          id: userInfo.id,
          username: userInfo.username,
          email: userInfo.email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: "24h",
          issuer: "About Tech",
        }
      );

      res.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
      });

      res.status(200).json("login success");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  next();
};

const accessToken = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter((item) => {
      return item.email == data.email;
    })[0];

    const { password, ...others } = userData;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
};
const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRESH_SECRET);
    const userData = userDatabase.filter((item) => {
      return item.email === data.email;
    })[0];

    const accessToken = jwt.sign(
      {
        id: userData.id,
        username: userData.username,
        email: userData.email,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "1m",
        issuer: "About Tech",
      }
    );

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });

    res.status(200).json("Access Token Recreated");
  } catch (error) {
    res.status(500).json(error);
  }
};
const loginSuccess = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const userData = userDatabase.filter((item) => {
      return item.email === data.email;
    })[0];

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
};

const logout = (req, res) => {
  try {
    res.cookie("accessToken", "");
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  login,
  accessToken,
  refreshToken,
  loginSuccess,
  logout,
};
