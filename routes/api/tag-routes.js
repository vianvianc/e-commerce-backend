const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "tag not found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const tagById = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  return res.json(tagById);
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    if (!createTag) {
      res.status(404).json({ message: "cannot creat tag" });
      return;
    }
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // create a new tag
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagUpdate = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagUpdate) {
      res.status(404).json({ message: "tag not found" });
      return;
    }
    res.status(200).json(tagUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const tagDelete = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(tagDelete);
  // delete on tag by its `id` value
});

module.exports = router;
