const express = require("express");
const User = require("../models/user");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/:id/follow", isLoggedIn, async (req, res, next) => {
  try {
    // 사용자 정보를 찾음.
    const exUser = await User.findOne({ where: { id: req.user.id } });
    if (exUser) {
      // 내가 팔로우한 아이디 등록
      // Int형이라서 형변환 해줌
      await exUser.addFollowings(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("No find user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id/Unfollow", isLoggedIn, async (req, res, next) => {
  try {
    // 내 정보를 찾음.
    const exUser = await User.findOne({ where: { id: req.user.id } });
    if (exUser) {
      // 내가 팔로우한 아이디 등록
      await exUser.removeFollowings(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("No find user");
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
