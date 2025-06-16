import express from "express";
import {
  createTag,
  getTags1,
  getTags2,
  getTags3,
} from "./controller.js";

const router = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get Response
 *     responses:
 *       200:
 *         description: Server is okay
 */
router.get("/", (req, res) => {
  res.send("Respone send");
});

/**
 * Create Tag Test : Never use this
 */

router.post("/create-tag", createTag);
/**
 * @swagger
 * /get-tags1/:
 *   get:
 *     summary: Get All Tags
 *     responses:
 *       200:
 *         description: Tags Information
 */
router.get("/get-tags1", getTags1);

/**
 * @swagger
 * /get-tags2/:
 *   get:
 *     summary: Get All Tags
 *     responses:
 *       200:
 *         description: Tags Information
 */
router.get("/get-tags2", getTags2);
/**
 * @swagger
 * /get-tags3/:
 *   get:
 *     summary: Get All Tags
 *     responses:
 *       200:
 *         description: Tags Information
 */
router.get("/get-tags3", getTags3);

export default router;
