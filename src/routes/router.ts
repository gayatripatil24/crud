const express = require("express");
const router = express.Router();
import { Request, Response } from "express";
import {
  login,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from "../controller/main";
import {
  apiRequest,
  data,
  tokenRequest,
  tokenResponse,
  successMessages,
  errorMessages,
} from "../helpers/constants";
import {
  loginSchema,
  createSchema,
  updateSchema,
} from "../helpers/validations-helper";
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";

router.post("/login", async (req: Request, res: Response) => {
  try {
    //for input validations
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      const body: data = req.body;
      const isExists = await login(body);
      if (isExists) {
        jwt.sign(
          { body },
          secretKey,
          { expiresIn: "30000000s" },
          (err: any, token: string) => {
            return res.json({ token });
          }
        );
      } else {
        res.json({ message: errorMessages.notExist });
      }
    }
  } catch (error) {
    console.error("Error Logging user:", error);
    res.status(500).send(error);
  }
});

router.get("/get/:id", verifyToken, (req: apiRequest, res: Response) => {
  try {
    jwt.verify(req.token, secretKey, async (err: any) => {
      if (err) {
        res.json({ result: errorMessages.tokenExpired });
      } else {
        res.json({ data: await getUser(req.params) });
      }
    });
  } catch (error) {
    console.error("Error Fetching User:", error);
    res.status(500).send(error);
  }
});

router.get("/getAll", verifyToken, (req: apiRequest, res: Response) => {
  try {
    jwt.verify(req.token, secretKey, async (err: any) => {
      if (err) {
        res.json({ result: errorMessages.tokenExpired });
      } else {
        res.json({ data: await listUsers(req.body) });
      }
    });
  } catch (error) {
    console.error("Error Fetching Users:", error);
    res.status(500).send(error);
  }
});

router.post("/create", verifyToken, (req: apiRequest, res: Response) => {
  try {
    //for input validations
    const { error, value } = createSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      jwt.verify(req.token, secretKey, async (err: any) => {
        if (err) {
          res.json({ result: errorMessages.tokenExpired });
        } else {
          if (await createUser(req.body))
            res.json({ message: successMessages.create });
          else res.json({ message: errorMessages.create });
        }
      });
    }
  } catch (error) {
    console.error("Error Creating User:", error);
    res.status(500).send(error);
  }
});

router.put("/update/:id", verifyToken, (req: apiRequest, res: Response) => {
  try {
    //for input validations
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    } else {
      jwt.verify(req.token, secretKey, async (err: any) => {
        if (err) {
          res.json({ result: errorMessages.tokenExpired });
        } else {
          const data = req.body;
          const id = req.params;
          if (await updateUser(data, id))
            res.json({ message: successMessages.update });
          else res.json({ message: errorMessages.update });
        }
      });
    }
  } catch (error) {
    console.error("Error Updating User:", error);
    res.status(500).send(error);
  }
});

router.delete("/delete/:id", verifyToken, (req: apiRequest, res: Response) => {
  try {
    jwt.verify(req.token, secretKey, async (err: any) => {
      if (err) {
        res.json({ result: errorMessages.tokenExpired });
      } else {
        if (await deleteUser(req.params))
          res.json({ success: successMessages.delete });
        else res.json({ error: errorMessages.delete });
      }
    });
  } catch (error) {
    console.error("Error Deleting User:", error);
    res.status(500).send(error);
  }
});

function verifyToken(req: tokenRequest, res: tokenResponse, next: () => void) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: "Token is Invalid",
    });
  }
}

module.exports = router;
